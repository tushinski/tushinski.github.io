export interface IQuickUnion {
    union(p: number, q: number): void,
    isConnected(p: number, q: number): boolean,
}