export const delay = (value: number) => {
    return new Promise<void>((res) => {
        if (value) {
            setTimeout(res, value);
        } else {
            res();
        }
    })
}