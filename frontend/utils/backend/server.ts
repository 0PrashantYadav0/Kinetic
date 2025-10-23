import io, { Socket } from 'socket.io-client'
import { createClient } from '../supabase/client'
import { request } from './requests'

type ConnectionResponse = {
    success: boolean
    errorMessage: string
}

const backend_url: string = process.env.NEXT_PUBLIC_BACKEND_URL as string

class Server {
    public socket: Socket = {} as Socket
    private connected: boolean = false

    public async connect(realmId: string, uid: string, shareId: string, access_token: string) {
        this.socket = io(backend_url, {
        reconnection: true,
        autoConnect: false,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        transportOptions: {
            polling: {
                extraHeaders: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        },
        query: {
            uid
        }
    })

        return new Promise<ConnectionResponse>((resolve, reject) => {
            this.socket.connect()

            this.socket.on('connect', () => {
                this.connected = true

                this.socket.emit('joinRealm', {
                    realmId,
                    shareId
                })
            })

            this.socket.on('joinedRealm', () => {
                resolve({
                    success: true,
                    errorMessage: ''
                })
            })

            this.socket.on('failedToJoinRoom', (reason: string) => {
                resolve({
                    success: false,
                    errorMessage: reason
                })
            })

            this.socket.on('connect_error', (err: any) => {
                console.error('Connection error:', err)
                resolve({
                    success: false,
                    errorMessage: err.message
                })
            })
        })
    }

    public disconnect() {
        if (this.connected) {
            this.connected = false
            this.socket.disconnect()
        }
    }

    public async getPlayersInRoom(roomIndex: number) {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return { data: null, error: { message: 'No session provided' } }

        return request('/getPlayersInRoom', {
            roomIndex: roomIndex,
        }, session.access_token)
    }
}

const server = new Server()

export { server }