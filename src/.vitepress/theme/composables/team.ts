export interface Student {
    name: string
    type: string
    date: string
    avatar: string
    homepage?: string
    publication?: string
    intern?: string
    degree?: string
    title?: string
}

export interface ProcessedStudent extends Student {
    grade: string
}