import {naturals} from "../utils/utils";

export type UnionFindConstructor = (n: number) => {
    union(p: number, q: number): void,
    isConnected(p: number, q: number): boolean,
}

/**
 * Quick Find (data structure).
 *
 * Find: O(1)
 *      (direct access by an index)
 * Union: O(N)
 *
 * Defects:
 *  - union too expensive
 */
export const QuickFind: UnionFindConstructor = (n) => {
    const arr = naturals(n);

    function isConnected(p: number, q: number) {
        return arr[p] === arr[q];
    }

    function union(p: number, q: number) {
        const pid = arr[p];
        const qid = arr[q];

        for (let i in arr) {
            if (arr[i] === pid) {
                arr[i] = qid;
            }
        }
    }

    return { union, isConnected };
}

/**
 * Quick Union (data structure).
 *
 * Find (getRoot): O(N)
 * Union: O(N)
 *      (excluding cases where p and q are already connected)
 *
 * Defects:
 *  - trees can get too tall
 *  - find too expensive
 */
export const QuickUnion: UnionFindConstructor = (n) => {
    const arr = naturals(n);

    function isConnected(p: number, q: number) {
        return getRoot(p) === getRoot(q);
    }

    function getRoot(p: number) {
        while (arr[p] !== p) {
            p = arr[p];
        }
        return p;
    }

    function union(p: number, q: number) {
        const qRoot = getRoot(q);
        const pRoot = getRoot(p);
        arr[pRoot] = arr[qRoot];
    }

    return { union, isConnected };
}

/**
 * Wighted Quick Union (data structure).
 *
 * Is the Quick Union with balanced trees.
 *
 * Find: O(lg(N))
 *      (depth of any node in the balanced tree can be at most lg(N))
 *
 * Union: O(lg(N))
 */
export const WeightedQuickUnion: UnionFindConstructor = (n) => {
    const arr = naturals(n);
    const treeSizes = arr.map(() => 1);

    function isConnected(p: number, q: number) {
        return getRoot(p) === getRoot(q);
    }

    function getRoot(p: number) {
        while (arr[p] !== p) {
            p = arr[p];
        }
        return p;
    }

    function union(p: number, q: number) {
        const qRoot = getRoot(q);
        const pRoot = getRoot(p);

        // link smaller tree to the bigger one
        if (treeSizes[pRoot] > treeSizes[qRoot]) {
            arr[qRoot] = arr[pRoot];
            treeSizes[pRoot] += treeSizes[qRoot];
        } else {
            arr[pRoot] = arr[qRoot];
            treeSizes[qRoot] += treeSizes[pRoot];
        }
    }

    return { union, isConnected };
}


/**
 * Weighted Quick Union With Path Compression (data structure).
 *
 * Is the Weighted Quick Union with a path compression.
 * Line (1) allows to half the path to the root.
 */
export const WeightedQuickUnionWithPathCompression: UnionFindConstructor = (n) => {
    const arr = naturals(n);
    const treeSizes = arr.map(() => 1);

    function isConnected(p: number, q: number) {
        return getRoot(p) === getRoot(q);
    }

    function getRoot(p: number) {
        while (arr[p] !== p) {
            arr[p] = arr[arr[p]]; // (1)
            p = arr[p];
        }
        return p;
    }

    function union(p: number, q: number) {
        const qRoot = getRoot(q);
        const pRoot = getRoot(p);

        // link smaller tree to the bigger one
        if (treeSizes[pRoot] > treeSizes[qRoot]) {
            arr[qRoot] = arr[pRoot];
            treeSizes[pRoot] += treeSizes[qRoot];
        } else {
            arr[pRoot] = arr[qRoot];
            treeSizes[qRoot] += treeSizes[pRoot];
        }
    }

    return { union, isConnected };
}


/**
 * Marked Weighted Quick Union With Path Compression (data structure).
 *
 * Is the Weighted Quick Union With Path Compression with an ability to mark a union.
 */
export const MarkedWeightedQuickUnionWithPathCompression = (n) => {
    const arr = naturals(n);
    const treeSizes = arr.map(() => 1);
    const rootToMarks = new Map<number, Set<string>>();

    function isConnected(p: number, q: number) {
        return getRoot(p) === getRoot(q);
    }

    function getRoot(p: number) {
        while (arr[p] !== p) {
            arr[p] = arr[arr[p]]; // (1)
            p = arr[p];
        }
        return p;
    }

    function union(p: number, q: number, marks?: any[]) {
        const qRoot = getRoot(q);
        const pRoot = getRoot(p);

        if (treeSizes[pRoot] > treeSizes[qRoot]) {
            arr[qRoot] = arr[pRoot];
            treeSizes[pRoot] += treeSizes[qRoot];
            mergeMarks(qRoot, pRoot, marks);
        } else {
            arr[pRoot] = arr[qRoot];
            treeSizes[qRoot] += treeSizes[pRoot];
            mergeMarks(pRoot, qRoot, marks);
        }
    }

    function mergeMarks(sourceRoot, targetRoot, newMarks?: any[]) {
        const targetSet = rootToMarks.get(targetRoot) || new Set();

        if (rootToMarks.has(sourceRoot)) {
            rootToMarks.get(sourceRoot)
                .forEach((mark) => targetSet.add(mark));
            rootToMarks.delete(sourceRoot);
        }
        if (newMarks) {
            newMarks.forEach(mark => {
                mark && targetSet.add(mark);
            });
        }

        if (targetSet.size) {
            rootToMarks.set(targetRoot, targetSet);
        }
    }

    function getMarks(p: number) {
        return rootToMarks.get(getRoot(p));
    }

    function isInMarkedUnion(p: number, marks: any[]) {
        const unionMarks = getMarks(p);

        if (!unionMarks) {
            return false;
        }

        return marks.every(mark => unionMarks.has(mark));
    }

    function getMarkedUnionStat() {
        const marksMap: Record<any, number> = {};

        rootToMarks.forEach((marks) => {
            marks.forEach(mark => {
                marksMap[mark] = (marksMap[mark] || 0) + 1;
            })
        });

        return marksMap;
    }

    return {
        union,
        isConnected,
        isInMarkedUnion,
        getMarkedUnionStat,
    };
}