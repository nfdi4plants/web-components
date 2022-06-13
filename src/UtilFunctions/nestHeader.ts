export type Header = {
    depth: number
    text: string
    id: string
    children: Header []
}

export function findlowestLevelHeader(headers: Header []) {
    const min = Math.min(...headers.map(h => h.depth))
    // console.log("min", min)
    return headers.filter((x_2) => (x_2.depth === min));
}

export function nest(currentHeaders: Header []) {
    const currentLevelHeader = findlowestLevelHeader(currentHeaders);
    // console.log("currentLevelHeader:", currentLevelHeader)
    return currentLevelHeader.map(function(h, i) {
        const headerIndex = currentHeaders.findIndex((x) => x == h) | 0;
        let nextIndex;
        const next = currentLevelHeader[i+1] as Header | undefined
            // tryItem(i + 1, currentLevelHeader);
        nextIndex = ((next == null) ? currentHeaders.length : currentHeaders.findIndex((x_1) => x_1 == next));
        const children = currentHeaders.slice(headerIndex + 1, (nextIndex - 1) + 1);
        const updatedH : Header = {depth: h.depth, text: h.text, id: h.id, children: (children.length === 0) ? [] : nest(children)};
        return updatedH;
    })
}