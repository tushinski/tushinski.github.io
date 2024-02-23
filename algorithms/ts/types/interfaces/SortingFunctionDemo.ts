import {CompareFunction} from "./CompareFunction";

export type SortingFunctionDemoOptions<T> = {
    onPointer: (position: number) => Promise<void>,
    onChange: (values: T[]) => Promise<void>,
}

export type SortingFunctionDemo = <T>(compareFunc: CompareFunction<T>, values: T[], options: SortingFunctionDemoOptions<T>) => Promise<void>;