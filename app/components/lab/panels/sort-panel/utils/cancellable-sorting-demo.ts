import {SortingFunctionDemo} from "../../../../../../algorithms/ts/types/interfaces/SortingFunctionDemo";

class CancelSignal extends Error {}

export const cancellableSortingDemo = (sortDemo: SortingFunctionDemo) => (...sortArgs: Parameters<SortingFunctionDemo>) => {
    const cancelled = {value: false};
    const throwIfCancelled = <Args extends any[], Return>(func: (...args: Args) => Return) => {
        return (...args: Args): Return => {
            if (cancelled.value) {
                throw new CancelSignal();
            }
            return func(...args);
        }
    };
    const [comparator, values, options] = sortArgs;

    sortDemo(
        comparator,
        values,
        {
            onPointer: throwIfCancelled(options.onPointer),
            onChange: throwIfCancelled(options.onChange)
        }
    )
        .catch(e => {
            if (e instanceof CancelSignal) {
                return;
            }
            throw e;
        })

    return () => {
        cancelled.value = true;
    };
}