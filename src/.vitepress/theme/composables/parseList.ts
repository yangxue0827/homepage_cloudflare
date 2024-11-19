interface TimeContent {
    time: string;
    content: string;
}

export function extractListItems(htmlString: string): TimeContent[] {
    const listItems: TimeContent[] = [];
    const liRegex = /<li.*?>(.*?)<\/li>/g;
    let match;

    // 使用正则表达式匹配 <li> 标签及其内容
    while ((match = liRegex.exec(htmlString)) !== null) {
        const liContent = match[1];
        const [time, ...contentParts] = liContent.includes('|') ? liContent.split('|') : ['', liContent];
        const content = contentParts.join('|'); // 重新组合 content 部分，防止内容中包含 '|' 字符
    
        listItems.push({ time: time.trim(), content: content.trim() });
      }

    return listItems;
}


