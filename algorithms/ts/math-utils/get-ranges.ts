export type Range = [number, number];

export const getRanges = (from: number, to: number, excludedPoints: Set<number>): Range[] => {
    const ranges: [number, number][] = [];

    for (let i = from; i <= to; i++) {
        const lastRange = ranges.at(-1);

        if (excludedPoints.has(i)) {
            if (lastRange && lastRange[1] >= i) {
                lastRange[1] = i - 1;
            }
        } else {
            if (lastRange) {
                if (lastRange[1] < i) {
                    ranges.push([i, to]);
                }
            } else {
                ranges.push([i, to])
            }
        }
    }

    return ranges;
}