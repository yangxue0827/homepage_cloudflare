interface EduExpItem {
    affiliation?: string
    icon?: string
    text?: string
    startTime?: string
    endTime?: string
    advisor?: string
}
export interface EduExpData {
    text?: string
    items?: EduExpItem[]
}