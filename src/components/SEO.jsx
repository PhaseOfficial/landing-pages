import React from 'react';
import { Helmet } from 'react-helmet';
import defaultImage from '../assets/weblogo.png'; // Fallback for local dev
const buildAssetImage = '/assets/weblogo-CCEv4uPZ.png';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = "Red Cup Series";
    const defaultDescription = "Red Cup Series Zimbabwe - Where mindset is everything. We are a premier creative agency delivering excellence in software engineering, AI solutions, premium apparel, and digital marketing.";
    const defaultKeywords = "Red Cup Series, Zimbabwe creative agency, software engineering Harare, AI solutions Zimbabwe, premium apparel Zimbabwe, digital marketing, web design, gaming tournaments";
    const siteUrl = "https://www.redcupseries.co.zw";
    
    // Construct absolute image URL if it's a relative path/import
    const metaImage = image || buildAssetImage;
    const isAbsoluteUrl = (path) => path?.startsWith('http');
    const imageUrl = isAbsoluteUrl(metaImage) ? metaImage : `${siteUrl}${metaImage}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={url || window.location.href} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || window.location.href} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={imageUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url || window.location.href} />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default SEO;
