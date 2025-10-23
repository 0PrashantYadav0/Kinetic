'use server'
import { RtcRole, RtcTokenBuilder } from 'agora-token'
import { createClient } from '../supabase/server'

export async function generateToken(channelName: string) {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return null

    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!
    const appCertificate = process.env.APP_CERTIFICATE!
    const uid = 0
    const role = RtcRole.PUBLISHER
    const expireTime = 3600
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const expiredTs = currentTimestamp + expireTime

    const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid,
        role,
        expiredTs,
        expiredTs,
    )

    return token
}