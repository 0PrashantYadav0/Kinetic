export function removeExtraSpaces(text: string, trim?: boolean) {
    let value = text.replace(/\s\s+/g, ' ')
    if (value.startsWith(' ')) {
        value = value.substring(1)
    }
    if (trim) {
        value = value.trim()
    }
    return value
}

export function formatForComparison(text: string, noLowerCase?: boolean) {
    if (noLowerCase) {
        return removeExtraSpaces(text, true)
    } else {
        return removeExtraSpaces(text.toLowerCase(), true)
    }
}