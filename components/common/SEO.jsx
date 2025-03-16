"use client";
import { Helmet } from 'react-helmet-async'

const SEO = ({
    title,
    description,
    image,
    url,
    type = 'website',
    twitterCard = 'summary_large_image',
    children
}) => {
    const siteTitle = 'Your Portfolio Name'
    const defaultDescription = 'Professional portfolio showcasing our team\'s work and expertise'
    const siteUrl = 'https://yourwebsite.com'

    const seoTitle = title ? `${title} | ${siteTitle}` : siteTitle
    const seoDescription = description || defaultDescription
    const seoImage = image || `${siteUrl}/default-og-image.jpg`
    const seoUrl = url || siteUrl

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <link rel="canonical" href={seoUrl} />

            {/* Open Graph */}
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:type" content={type} />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />

            {/* Additional Meta Tags */}
            {children}
        </Helmet>
    )
}

export default SEO