import type { DefaultTheme } from "vitepress";

export namespace APTheme {
    export interface APConfig extends DefaultTheme.Config {
        /**
         * 基础设置
         */
        srcDir?: string
        author?: string
        recommend?: false
        blog?: false

        introLayout?: string
        /**
         * 首页news最大数量
         * @default 5
         */
        indexNewsTopK?: number
        indexWorksTopK?: number

        /**
         * 启用 news模块
         * @default false
         */
        news?: boolean
        newsLayout?: string
        /**
         * 教育和科研经历中item最大数量
         * @default 3
         */
        itemNum?: number
        /**
         * 设置解析 frontmatter 里 date 的时区
         * @default new Date().getTimezoneOffset() / -60
         * @example 8 => 'UTC+8'
         */
        timeZone?: number
        sidebarCard?: Sidebar
    }

    export interface PageMeta {
        /**
         * 基本信息
         */
        title: string
        date: string
        layout?: string
        tags?: string[]
        description?: string
        cover?: string
        sticky?: number
        author?: string
        hidden?: boolean
        // old
        categories: string[]
        /**
         * 文章首页置顶
         */
        top?: number
        /**
         * 手动控制相关文章列表的顺序
         */
        recommend?: number | false | string | string[] | [...string[], number]
        // 是否发布
        publish?: boolean
        /**
         * 文章作者，标签等信息插入位置
         * @default 'h1'
         */
        docMetaInsertSelector?: string
        /**
         * 文章作者，标签等信息插入位置
         * @default 'after'
         */
        docMetaInsertPosition?: 'before' | 'after'
    }

    export interface Sidebar {
        text: string
        avatar: string
        tags?: string[]
        linkGroup?: SidebarLinkGroup[]
    }
    export interface SidebarLinkGroup {
        text: string
        link?: string
        icon?: string
    }
}
