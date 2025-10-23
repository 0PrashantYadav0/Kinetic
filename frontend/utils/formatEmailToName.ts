export function formatEmailToName(email: string) {
    if (typeof email !== 'string') {
        return ''
    }

    const name = email.split('@')[0];
    return name;
}
