'use server'
import 'server-only'
import { RealmData } from '../pixi/types'
import { createClient } from '@supabase/supabase-js'
import { RealmDataSchema } from '../pixi/zod'
import { formatForComparison, removeExtraSpaces } from '../removeExtraSpaces'

export async function saveRealm(access_token: string, realmData: RealmData, id: string) {
    const result = RealmDataSchema.safeParse(realmData)
    if (result.success === false) {
        return { error: { message: 'Invalid realm data.' } }
    }

    if (realmData.rooms.length === 0) {
        return { error: { message: 'A realm must have at least one room.' } }
    }

    if (realmData.rooms.length > 50) {
        return { error: { message: 'A realm cannot have more than 50 rooms.' } }
    }

    // return if any rooms in realm data have the same name
    const roomNames = new Set<string>()
    for (const room of realmData.rooms) {
        if (Object.keys(room.tilemap).length > 10_000) {
            return { error: { message: 'This room is too big to save!' } }
        }

        const roomName = formatForComparison(room.name)

        if (roomNames.has(roomName)) {
            return { error: { message: 'Room names must be unique.' } }
        }
        if (roomName.trim() === '') {
            return { error: { message: 'Room name cannot be empty.' } }
        }
        if (roomName.length > 32) {
            return { error: { message: 'Room names cannot be longer than 32 characters.' } }
        }
        roomNames.add(roomName)

        room.name = removeExtraSpaces(room.name, true)
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SERVICE_ROLE!,
    )

    const { data: user, error: userError } = await supabase.auth.getUser(access_token)
    if (!user || !user.user) {
        return { error: userError }
    }

    const { error } = await supabase
        .from('realms')
        .update({ map_data: realmData })
        .eq('id', id)
        .eq('owner_id', user.user.id)

    if (error) {
        return { error }
    }

    return { error: null }
}
