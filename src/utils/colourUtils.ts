export type ColourHex = `#${string}`

export function isColourHex(hexCode: string): hexCode is ColourHex {
    return /^#([0-9A-Fa-f]{3}){1,2}$/.test(hexCode);
}

export interface ColourComponent {
    r: number
    g: number
    b: number
}

export function componentToHex(component: number) {
    return component.toString(16).padStart(2, '0')
}

export function colourToHex({ r, g, b }: ColourComponent): ColourHex {
    if ([r, g, b].some(val => val < 0 || val > 255)) {
        throw new Error(`Invalid colour: ${JSON.stringify({r, g, b})}`)
    }
    
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export function hexToColour(hexCode: string): ColourComponent {
    if(isColourHex(hexCode)) {
        const rawCode = hexCode.replace(/^#/, '');
        const formattedHex = rawCode.length === 3
            ? `${rawCode[0]}${rawCode[0]}${rawCode[1]}${rawCode[1]}${rawCode[2]}${rawCode[2]}`
        : rawCode;

        const r = parseInt(formattedHex.substring(0, 2), 16);
        const g = parseInt(formattedHex.substring(2, 4), 16);
        const b = parseInt(formattedHex.substring(4, 6), 16);
        return { r, g, b };
    }
    throw new Error(`Invalid hex: ${hexCode}`)
}

export function hexToSplitHex(hexCode: string): string[] {
    if(isColourHex(hexCode)) {
        const rawCode = hexCode.replace(/^#/, '');

        const shortRegex = /^([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/
        const longRegex = /^([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/

        let matches = (rawCode.length === 3 ? shortRegex : longRegex).exec(rawCode)

        if (!matches) {
            throw new Error(`Could not match hex: ${rawCode}`);
        }

        // Start at index 1 since the first match is the whole hex
        return matches.slice(1, 4)
    }
    throw new Error(`Invalid hex: ${hexCode}`)
}
