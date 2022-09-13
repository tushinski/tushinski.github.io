export type ParsedIntValueParams = {
    text: string,
    value: number,
    defaultValue: number,
    hint: string,
    min: number,
    max: number,
    isValid: boolean,
};

export type ParsedIntValue = Readonly<ParsedIntValueParams & {
    parse(text: string): ParsedIntValue,
}>

export function parsedIntValue(params: Partial<ParsedIntValueParams>): ParsedIntValue {
    const min = params.min || Number.MIN_SAFE_INTEGER;
    const max = params.max || Number.MAX_SAFE_INTEGER;
    const defaultValue = params.defaultValue ?? min;
    const value = params.value ?? defaultValue;

    if (max <= min) {
        throw new Error("Illegal number limits.");
    }

    const resultingParams: ParsedIntValueParams = {
        text: params.text ?? value.toString(),
        value,
        defaultValue,
        hint: params.hint || `${min} <= value <= ${max}`,
        min,
        max,
        isValid: params.isValid ?? true,
    };

    function parse(text: string) {
        const value = parseInt(text);
        const isValid = /^[0-9]+$/.test(text) && !(Number.isNaN(value) || value > max || value < min);

        return parsedIntValue({
            ...resultingParams,
            text,
            value,
            isValid,
        });
    }

    const returnValue = {
        ...resultingParams,
        parse,
    };

    return Object.freeze(returnValue);
}