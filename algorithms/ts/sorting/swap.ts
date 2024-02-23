export const swap = (array: any[], index1: number, index2: number) => {
    if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
        throw new Error(
            'Cannot swap array elements: index out of bounds.' +
            `Indexes: ${index1}, ${index2}.` +
            `Array length: ${array.length}.`
        );
    }
    if (index1 === index2) {
        return;
    }

    const buf = array[index1];

    array[index1] = array[index2];
    array[index2] = buf;
}