<?php
/**
 * Red Cup Series - PHP Blog Bridge
 * 
 * Fetches blog data from Supabase and renders a high-performance, 
 * SEO-optimized, JavaScript-free HTML document.
 */

// --- CONFIGURATION & ENV PARSER ---
function getEnvValue($key, $default = "") {
    // Look for .env in the parent directory (root of public_html)
    $path = dirname(__DIR__) . '/.env';
    if (!file_exists($path)) return $default;

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue; // Skip comments
        if (strpos($line, '=') === false) continue;
        list($name, $value) = explode('=', $line, 2);
        if (trim($name) == $key) {
            return trim($value);
        }
    }
    return $default;
}

$supabase_url = "https://ucffelaujmgjbfhfkuzx.supabase.co";
$supabase_key = getEnvValue('VITE_SUPABASE_ANON_KEY', 'YOUR_FALLBACK_KEY_HERE');
$slug = $_GET['id'] ?? ''; // We use 'id' as the key from .htaccess, but it now contains the slug

// --- 1. DATA FETCHING ---
function fetchSupabase($url, $key) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: " . $key,
        "Authorization: Bearer " . $key
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) return null;
    return json_decode($response, true);
}

$post = null;
$all_posts = [];
$related_posts = [];

if ($slug) {
    // Fetch SINGLE post by SLUG (Must be published)
    $api_endpoint = "$supabase_url/rest/v1/blog_posts?slug=eq.$slug&status=eq.published&select=*";
    $res = fetchSupabase($api_endpoint, $supabase_key);
    $post = $res[0] ?? null;

    if ($post) {
        // Fetch RELATED posts (3 most recent excluding current)
        $related_endpoint = "$supabase_url/rest/v1/blog_posts?status=eq.published&slug=neq.$slug&select=slug,title,featured_image,created_at&order=created_at.desc&limit=3";
        $related_posts = fetchSupabase($related_endpoint, $supabase_key) ?? [];
    }
} else {
    // Fetch ALL published posts for the list view
    $api_endpoint = "$supabase_url/rest/v1/blog_posts?status=eq.published&select=slug,title,featured_image,author,created_at,seo_description&order=created_at.desc";
    $all_posts = fetchSupabase($api_endpoint, $supabase_key) ?? [];
}

// --- 2. IMPROVED MARKDOWN PARSER ---
function parseMarkdown($text) {
    // 1. Protect Images & Links before escaping
    $text = preg_replace('/\!\[(.*?)\]\((.*?)\)/', '___IMG_START___$2___ALT___$1___IMG_END___', $text);
    $text = preg_replace('/\[(.*?)\]\((.*?)\)/', '___LINK_START___$2___TEXT___$1___LINK_END___', $text);

    // 2. Escape HTML
    $text = htmlspecialchars($text);
    
    // 3. Restore Images & Links
    $text = preg_replace('/___IMG_START___(.*?)___ALT___(.*?)___IMG_END___/', '<img src="$1" alt="$2" class="embedded-image">', $text);
    $text = preg_replace('/___LINK_START___(.*?)___TEXT___(.*?)___LINK_END___/', '<a href="$1" class="content-link">$2</a>', $text);

    // 4. Formatting
    $text = preg_replace('/^# (.*)$/m', '<h1 class="content-h1">$1</h1>', $text);
    $text = preg_replace('/^## (.*)$/m', '<h2 class="content-h2">$1</h2>', $text);
    $text = preg_replace('/^### (.*)$/m', '<h3 class="content-h3">$1</h3>', $text);
    $text = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $text);
    $text = preg_replace('/\*(.*?)\*/', '<em>$1</em>', $text);
    $text = preg_replace('/^\* (.*)$/m', '<li>$1</li>', $text);
    
    // 5. Structure
    $text = preg_replace('/\n\n/', '</p><p>', $text);
    $text = preg_replace('/\n/', '<br>', $text);
    
    return "<p>" . $text . "</p>";
}

// --- 3. PAGE LOGIC ---
$title = $post ? ($post['seo_title'] ?: $post['title']) : "Our Blog | Red Cup Series";
$description = $post ? ($post['seo_description'] ?: "Insights from the edge of AI & Tech - Red Cup Series.") : "Our Blog - Insights from the edge of AI & Tech.";
$image = $post ? $post['featured_image'] : "https://www.redcupseries.co.zw/assets/weblogo-CCEv4uPZ.png";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="/assets/weblogo-CCEv4uPZ.png">
    <title><?php echo htmlspecialchars($title); ?> | Mindset is Everything</title>
    <meta name="description" content="<?php echo htmlspecialchars($description); ?>">
    
    <!-- Open Graph (Facebook/WhatsApp) -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="<?php echo htmlspecialchars($title); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($description); ?>">
    <meta property="og:image" content="<?php echo htmlspecialchars($image); ?>">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($title); ?>">
    <meta name="twitter:image" content="<?php echo htmlspecialchars($image); ?>">

    <!-- JSON-LD Structured Data -->
    <?php if ($post): ?>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "<?php echo htmlspecialchars($post['title']); ?>",
      "image": "<?php echo htmlspecialchars($image); ?>",
      "author": {
        "@type": "Organization",
        "name": "Red Cup Series"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Red Cup Series",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.redcupseries.co.zw/assets/weblogo-CCEv4uPZ.png"
        }
      },
      "datePublished": "<?php echo date('c', strtotime($post['created_at'])); ?>",
      "dateModified": "<?php echo date('c', strtotime($post['updated_at'])); ?>",
      "description": "<?php echo htmlspecialchars($description); ?>"
    }
    </script>
    <?php endif; ?>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        
        body {
            font-family: 'Montserrat', -apple-system, sans-serif;
            margin: 0; padding: 0;
            background: #dfe0db;
            color: #1a1a1a;
            line-height: 1.8;
            -webkit-font-smoothing: antialiased;
        }

        /* Glassmorphism Navbar - Matches React App */
        .navbar-wrapper {
            position: fixed; top: 0; left: 0; right: 0;
            display: flex; flex-direction: column; align-items: center;
            padding-top: 20px; z-index: 1000;
            pointer-events: none;
        }

        .navbar {
            pointer-events: auto;
            width: 90%; max-width: 1000px;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(24px) saturate(150%);
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border-radius: 20px;
            height: 64px; display: flex; align-items: center; justify-content: space-between;
            padding: 0 24px;
        }

        .navbar .logo-img { height: 40px; width: auto; opacity: 0.9; transition: opacity 0.3s; }
        .navbar .logo-img:hover { opacity: 1; }

        .navbar .links { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 768px) { .navbar .links { display: none; } }
        
        .navbar .links a { 
            text-decoration: none; color: #374151; font-size: 0.85rem; font-weight: 600; 
            padding: 8px 16px; border-radius: 50px;
            transition: all 0.3s;
        }
        .navbar .links a:hover { background: rgba(255, 255, 255, 0.4); color: #000; }

        .mobile-btn {
            display: block; background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50px; padding: 8px; cursor: pointer; color: #374151;
        }
        @media (min-width: 768px) { .mobile-btn { display: none; } }

        /* Mobile Menu */
        #mobile-menu {
            display: none; position: fixed; top: 85px; left: 5%; right: 5%;
            background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(24px);
            border-radius: 20px; padding: 15px; box-shadow: 0 20px 50px rgba(0,0,0,0.1);
            border: 1px solid rgba(255, 255, 255, 0.3); z-index: 999;
        }
        #mobile-menu a {
            display: block; padding: 12px 20px; text-decoration: none; color: #111;
            font-weight: 600; border-radius: 12px; transition: background 0.3s;
        }
        #mobile-menu a:hover { background: rgba(0,0,0,0.05); }

        .header-spacer { height: 120px; }

        .container { max-width: 800px; margin: 0 auto; padding: 0 24px; }

        .featured-image {
            width: 100%; border-radius: 40px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.1);
            margin-bottom: 50px;
        }

        .embedded-image {
            width: 100%; border-radius: 24px;
            margin: 40px 0; display: block;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .post-title {
            font-size: 3.5rem; font-weight: 900; line-height: 1.1;
            margin-bottom: 25px; letter-spacing: -0.04em; color: #111;
        }
        @media (max-width: 768px) { .post-title { font-size: 2.5rem; } }

        .meta {
            display: flex; gap: 20px; color: #9ca3af; font-size: 0.8rem;
            font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
            margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #f3f4f6;
        }

        .content { font-size: 1.25rem; color: #374151; font-weight: 400; }
        .content-h1 { font-size: 2.5rem; font-weight: 900; margin-top: 60px; margin-bottom: 30px; }
        .content-h2 { font-size: 2rem; font-weight: 800; margin-top: 50px; margin-bottom: 25px; }
        .content-h3 { font-size: 1.5rem; font-weight: 700; margin-top: 40px; margin-bottom: 20px; }
        .content p { margin-bottom: 28px; }
        .content-link { color: #dc2626; text-decoration: none; font-weight: 700; border-bottom: 2px solid rgba(220,38,38,0.1); transition: border-color 0.3s; }
        .content-link:hover { border-bottom-color: #dc2626; }

        footer {
            margin-top: 100px; padding: 100px 0; background: #fafafa;
            border-top: 1px solid #f3f4f6; text-align: center; color: #aaa; font-size: 0.85rem;
        }

        /* Blog Grid List */
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px; }
        .blog-card {
            background: #fff; border-radius: 32px; overflow: hidden;
            border: 1px solid #f3f4f6; transition: transform 0.3s, box-shadow 0.3s;
            text-decoration: none; color: inherit; display: flex; flex-direction: column; height: 100%;
        }
        .blog-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .blog-card img { width: 100%; height: 200px; object-fit: cover; }
        .blog-card-body { padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
        .blog-card-tag { font-size: 0.7rem; font-weight: 800; color: #dc2626; text-transform: uppercase; margin-bottom: 12px; }
        .blog-card-title { font-size: 1.5rem; font-weight: 800; margin: 0 0 12px 0; line-height: 1.2; }
        .blog-card-excerpt { font-size: 0.95rem; color: #6b7280; line-height: 1.6; margin-bottom: 24px; flex-grow: 1; }
        .blog-card-more { font-weight: 900; font-size: 0.8rem; color: #dc2626; text-transform: uppercase; }

    </style>
</head>
<body>

    <div class="navbar-wrapper">
        <nav class="navbar">
            <a href="/">
                <img src="/assets/weblogo-CCEv4uPZ.png" class="logo-img" alt="Red Cup Series">
            </a>
            <div class="links">
                <a href="/">Home</a>
                <a href="/Store">Shop</a>
                <a href="/Services">Services</a>
                <a href="/blog" style="color: #dc2626;">Blog</a>
                <a href="/About">About</a>
                <a href="/Contact">Contact</a>
                <a href="/Games">Games</a>
            </div>
            <button class="mobile-btn" onclick="toggleMenu()">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h14M3 6h14M3 18h14"/></svg>
            </button>
        </nav>
    </div>

    <div id="mobile-menu">
        <a href="/">Home</a>
        <a href="/Store">Shop</a>
        <a href="/Services">Services</a>
        <a href="/blog" style="color: #dc2626;">Blog</a>
        <a href="/About">About</a>
        <a href="/Contact">Contact</a>
        <a href="/Games">Games</a>
    </div>

    <div class="header-spacer"></div>

    <main class="container">
        <?php if ($post): ?>
            <!-- SINGLE POST VIEW -->
            <img src="<?php echo $post['featured_image'] ?: '/assets/weblogo-CCEv4uPZ.png'; ?>" class="featured-image" alt="Article Cover">
            
            <h1 class="post-title"><?php echo htmlspecialchars($post['title']); ?></h1>
            
            <div class="meta">
                <span>By <?php echo htmlspecialchars($post['author'] ?: 'RCS Team'); ?></span>
                <span><?php echo date('M j, Y', strtotime($post['created_at'])); ?></span>
            </div>

            <article class="content">
                <?php echo parseMarkdown($post['content']); ?>
            </article>

            <!-- RELATED POSTS SECTION -->
            <?php if (!empty($related_posts)): ?>
                <div style="margin-top: 100px; padding-top: 60px; border-top: 1px solid rgba(0,0,0,0.05);">
                    <h3 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 40px; color: #111; text-transform: uppercase; letter-spacing: 0.05em;">Related Stories</h3>
                    <div class="blog-grid" style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));">
                        <?php foreach ($related_posts as $rp): ?>
                            <a href="/blog/<?php echo $rp['slug']; ?>" class="blog-card" style="border-radius: 1.5rem;">
                                <img src="<?php echo $rp['featured_image'] ?: '/assets/weblogo-CCEv4uPZ.png'; ?>" style="height: 160px;" alt="Cover">
                                <div class="blog-card-body" style="padding: 1.25rem;">
                                    <h4 style="margin: 0; font-size: 1.1rem; font-weight: 800; line-height: 1.3;"><?php echo htmlspecialchars($rp['title']); ?></h4>
                                    <div style="margin-top: 10px; font-size: 0.7rem; font-weight: 700; color: #dc2626; text-transform: uppercase;">Read More &rarr;</div>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>

        <?php elseif (!$slug && !empty($all_posts)): ?>
            <!-- BLOG LIST VIEW -->
            <div style="text-align: center; margin-bottom: 4rem;">
                <h1 class="post-title" style="margin-bottom: 0.5rem;">Our Blog</h1>
                <p style="color: #6b7280; font-size: 1.25rem; font-weight: 500;">Insights from the edge of AI & Tech</p>
            </div>
            
            <div class="blog-grid">
                <?php foreach ($all_posts as $p): ?>
                    <a href="/blog/<?php echo $p['slug']; ?>" class="blog-card">
                        <img src="<?php echo $p['featured_image'] ?: '/assets/weblogo-CCEv4uPZ.png'; ?>" alt="Cover">
                        <div class="blog-card-body">
                            <div class="blog-card-tag"><?php echo date('M d, Y', strtotime($p['created_at'])); ?></div>
                            <h3 class="blog-card-title"><?php echo htmlspecialchars($p['title']); ?></h3>
                            <p class="blog-card-excerpt"><?php echo htmlspecialchars(mb_strimwidth($p['seo_description'], 0, 90, "...")); ?></p>
                            <div class="blog-card-more">Read Article &rarr;</div>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>

        <?php else: ?>
            <div style="text-align:center; padding: 100px 0;">
                <h1 class="post-title"><?php echo $slug ? "Post Not Found" : "No Stories Yet"; ?></h1>
                <p style="color: #6b7280; font-size: 1.1rem;">Check back later for more updates.</p>
                <a href="/blog" style="color: #dc2626; font-weight: 900; text-decoration: none; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; border-bottom: 2px solid #dc2626;">Return to Blog</a>
            </div>
        <?php endif; ?>
    </main>

    <footer>
        <p>&copy; <?php echo date('Y'); ?> Red Cup Series Zimbabwe. All Rights Reserved.</p>
    </footer>

    <script>
        function toggleMenu() {
            var m = document.getElementById('mobile-menu');
            m.style.display = (m.style.display === 'block') ? 'none' : 'block';
        }
    </script>
</body>
</html>
