import { createContentLoader } from 'vitepress'
import { Student } from '../composables/team'


declare const data: Student[]
export { data }

export default createContentLoader('team/*.md', {
    includeSrc: false,
    render: false,
    excerpt: false,
    transform(rawData): Student[] {
        return rawData
        .map(({ frontmatter }) => ({
            name: frontmatter.name,
            type: frontmatter.type,
            homepage: frontmatter.homepage || undefined,
            avatar: frontmatter.avatar,
            date: frontmatter.date,
            publication: frontmatter.publication || undefined,
            intern: frontmatter.intern || undefined,
            degree: frontmatter.degree || undefined,
            title: frontmatter.title || undefined
        }))
    }
})
