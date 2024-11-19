import { PostPage } from "../data/pubs.data";

export function groupByYear(posts: PostPage[]) {
    const grouped = posts.reduce((acc, post) => {
        const year = post.frontmatter.year;
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {} as Record<number, PostPage[]>);

    Object.keys(grouped).forEach(year => {
        grouped[Number(year)].sort((a, b) => b.frontmatter.year - a.frontmatter.year);
    });

    const beforeMerge = Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a));

    return mergeBeforeYear(beforeMerge, 2019)
}

function mergeBeforeYear(groupedPosts: [string, PostPage[]][], yearThreshold: number = 2019): [string, PostPage[]][] {
    const beforeThreshold: [string, PostPage[]][] = [];
    const afterThreshold: [string, PostPage[]][] = [];

    // First, separate the groups into before and after threshold
    for (const [year, posts] of groupedPosts) {
        if (Number(year) <= yearThreshold) {
            beforeThreshold.push([year, posts]);
        } else {
            afterThreshold.push([year, posts]);
        }
    }

    // Sort the beforeThreshold groups by year in descending order
    beforeThreshold.sort(([a], [b]) => Number(b) - Number(a));

    // Merge the posts from beforeThreshold groups
    const mergedBeforeThreshold: PostPage[] = beforeThreshold.flatMap(([_, posts]) => posts);

    // Combine the results
    return [
        ...afterThreshold,
        [`Before ${yearThreshold}`, mergedBeforeThreshold]
    ];
}


export function groupByTag(posts: PostPage[]) {
    const grouped = posts.reduce((acc, post) => {
        post.frontmatter.tags.forEach((tag: string) => {
            if (!acc[tag]) {
                acc[tag] = [];
            }

            acc[tag].push(post);
        });
        if (!acc['ALL']) {
            acc['ALL'] = []
        }
        acc['ALL'].push(post);
        return acc;
    }, {} as Record<string, PostPage[]>);
    
    Object.keys(grouped).forEach(tag => {
        grouped[tag].sort((a, b) => b.frontmatter.year - a.frontmatter.year);
    });
    
    return Object.entries(grouped).sort(([a], [b]) => grouped[b].length - grouped[a].length);
}