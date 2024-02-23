import {CompareFunction} from "./CompareFunction";

export type SortingFunction = <T>(compareFunc: CompareFunction<T>, values: T[]) => T[];