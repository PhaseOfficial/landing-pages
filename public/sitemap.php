<?php
header("Content-Type: application/xml; charset=utf-8");

// 1. Env Parser (Same as blog)
function getEnvValue($key, $default = "") {
    $path = __DIR__ . '/.env';
    if (!file_exists($path)) return $default;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($name, $value) = explode('=', $line, 2);
        if (trim($name) == $key) return trim($value);
    }
    return $default;
}

$supabase_url = "https://ucffelaujmgjbfhfkuzx.supabase.co";
$supabase_key = getEnvValue('VITE_SUPABASE_ANON_KEY', '');

// 2. Fetch all published slugs
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "$supabase_url/rest/v1/blog_posts?status=eq.published&select=slug,updated_at");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["apikey: $supabase_key", "Authorization: Bearer $supabase_key"]);
$response = curl_exec($ch);
curl_close($ch);

$posts = json_decode($response, true) ?? [];

echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages -->
    <url>
        <loc>https://www.redcupseries.co.zw/</loc>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.redcupseries.co.zw/Store</loc>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://www.redcupseries.co.zw/blog</loc>
        <priority>0.9</priority>
    </url>

    <!-- Dynamic Blog Posts -->
    <?php foreach ($posts as $post): ?>
    <url>
        <loc>https://www.redcupseries.co.zw/blog/<?php echo htmlspecialchars($post['slug']); ?></loc>
        <lastmod><?php echo date('Y-m-d', strtotime($post['updated_at'])); ?></lastmod>
        <priority>0.7</priority>
    </url>
    <?php endforeach; ?>
</urlset>
