
export const capitalize = (str: string): string => {
    const [first, ...rest] = str.split("");
    return [first.toUpperCase(), ...rest].join("");
};
