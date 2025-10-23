'use server'
import 'server-only'
import { createClient } from '@supabase/supabase-js'

export async function getVisitedRealms(access_token: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SERVICE_ROLE!,
    )

    const { data: user, error: userError } = await supabase.auth.getUser(access_token)
    if (!user || !user.user) {
        return { data: null, error: userError }
    }
    
    const { data: profile, error: profileError } = await supabase.from('profiles').select('visited_realms').eq('id', user.user.id).single()
    if (!profile) {
        return { data: null, error: profileError }
    }

    const visitedRealms = []
    const realmsToRemove: string[] = []
    for (const shareId of profile.visited_realms) {
        const { data, error } = await supabase.from('realms').select('id, name, share_id').eq('share_id', shareId).single()
        if (data) {
            visitedRealms.push(data)
        } else {
            realmsToRemove.push(shareId)
        }
    }

    if (realmsToRemove.length > 0) {
        await supabase
            .from('profiles')
            .update({ 
                visited_realms: profile.visited_realms.filter((shareId: string) => !realmsToRemove.includes(shareId))
            })
            .eq('id', user.user.id)
    }

    return { data: visitedRealms, error: null }

}