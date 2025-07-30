import { categories } from "@/lib/mappings"

export default function sitemap() {
    const categories_links = []
    Object.keys(categories).forEach(value => categories_links.push({
        url: `https://inkquest.in/category/${value}`,
        lastModified: new Date(),
        priority: 0.80,
    },))
    return [
        {
            url: 'https://inkquest.in',
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 1,
        },
        {
            url: 'https://inkquest.in/privacy-policy',
            lastModified: new Date(),
            priority: 0.80,
        },
        {
            url: 'https://inkquest.in/about-us',
            lastModified: new Date(),
            priority: 0.80,
        },
        {
            url: 'https://inkquest.in/category/Sports',
            lastModified: new Date(),
            priority: 0.80,
        },
        ...categories_links
    ]
}