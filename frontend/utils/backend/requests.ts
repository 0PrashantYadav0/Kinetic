export async function request(url: string, params: Record<string, any> = {}, access_token?: string) {

    if (url.startsWith('/')) {
        url = url.substring(1)
    }

    const queryString = new URLSearchParams(params).toString()
    const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}${queryString ? '?' + queryString : ''}`

    const headers = new Headers();
    if (access_token) {
        headers.append('Authorization', `Bearer ${access_token}`);
    }

    try {
        const response = await fetch(fullUrl, { headers })

        if (!response.ok) {
            const error = await response.json()
            return { data: null, error }
        }

        const data = await response.json()
        return { data, error: null }
    } catch (err) {
        if (err instanceof Error) {
            return { data: null, error: err.message }
        } else {
            return { data: null, error: 'An unknown error occurred.' }
        }
    }
}