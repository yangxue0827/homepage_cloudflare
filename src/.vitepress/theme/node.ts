import { APTheme } from "./types";

export function getThemeConfig(cfg: Partial<APTheme.APConfig> = {}) {
    // checkConfig(cfg)

    // 文章数据
    const extraVPConfig: any = {
        vite: {}
    }

    // 获取要加载的vite插件,注册Vite插件
    //const vitePlugins = getVitePlugins(cfg)
    //registerVitePlugins(extraVPConfig, vitePlugins)

    // 获取要加载的markdown插件,注册markdown插件
    //const markdownPlugin = getMarkdownPlugins(cfg)
    //registerMdPlugins(extraVPConfig, markdownPlugin)

    //返回值
    return {
        themeConfig: {
            ...cfg,
            // 补充一些额外的配置用于继承
            //...patchVPThemeConfig(cfg)
        },
        ...extraVPConfig
    }
}