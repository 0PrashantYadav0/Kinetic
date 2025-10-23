'use server'
import 'server-only'
import { createClient } from '@supabase/supabase-js'

export async function getPlayRealmData(accessToken: string, shareId: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SERVICE_ROLE!,
    )

    const { data: user, error: userError } = await supabase.auth.getUser(accessToken)

    if (userError) {
        return { data: null, error: userError }
    }

    const { data, error } = await supabase.from('realms').select('map_data, owner_id, only_owner, name').eq('share_id', shareId).single()

    if (!data || error) {
        return { data: null, error }
    }

    const realm = data

    // if we are the owner, always return the data
    if (realm.owner_id === user.user.id) {
        return { data, error }
    }

    if (realm.only_owner) {
        return { data: null, error: { message: 'only owner' }}
    }

    return { data, error }
}
