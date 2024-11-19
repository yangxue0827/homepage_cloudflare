import { createContentLoader } from 'vitepress'
import fs from 'fs'

export interface PostPage {
    frontmatter: Record <string, any>
    url: string
    date: {
        time: number
        string: string
    }
}

declare const data: PostPage[]
export { data }

export default createContentLoader('publication/papers/*.md', {
    includeSrc: false,
    render: false,
    excerpt: false,
    transform(rawData): PostPage[] {
        return rawData
        .map(({ url, frontmatter }) => ({
            url,
            frontmatter,
            date: formatDate(frontmatter.date)
        }))
        .sort((a, b) => b.date.time - a.date.time)
    }
})


function formatDate(rawDate: string ): PostPage['date'] {
    let date: Date;

    if (rawDate) {
        date = new Date(rawDate);
    } 

    date.setUTCHours(12);
    return {
        time: +date,
        string: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
}