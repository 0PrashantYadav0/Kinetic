'use client'
import React, { useState } from 'react'
import Dropdown from '@/components/Dropdown'
import BasicButton from '@/components/BasicButton'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-toastify'
import revalidate from '@/utils/revalidate'
import { useModal } from '../hooks/useModal'
import { Copy, ArrowLeft, Gear, Share, FloppyDisk } from '@phosphor-icons/react'
import { v4 as uuidv4 } from 'uuid'
import BasicInput from '@/components/BasicInput'
import { removeExtraSpaces } from '@/utils/removeExtraSpaces'
import Link from 'next/link'

type ManageChildProps = {
    realmId: string
    startingShareId: string
    startingOnlyOwner: boolean
    startingName: string
}

const ManageChild:React.FC<ManageChildProps> = ({ realmId, startingShareId, startingOnlyOwner, startingName }) => {

    const [selectedTab, setSelectedTab] = useState(0)
    const [shareId, setShareId] = useState(startingShareId)
    const [onlyOwner, setOnlyOwner] = useState(startingOnlyOwner)
    const [name, setName] = useState(startingName)
    const { setModal, setLoadingText } = useModal()

    const supabase = createClient()

    async function save() {
        if (name.trim() === '') {
            toast.error('Name cannot be empty!')
            return
        }

        setModal('Loading')
        setLoadingText('Saving...')

        const { error } = await supabase
            .from('realms')
            .update({ 
                    only_owner: onlyOwner,
                    name: name,
                })
            .eq('id', realmId)

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Saved!')
        }

        revalidate('/manage/[id]')
        setModal('None')
    }

    function copyLink() {
        const link = process.env.NEXT_PUBLIC_BASE_URL + '/play/' + realmId + '?shareId=' + shareId
        navigator.clipboard.writeText(link)
        toast.success('Link copied!')
    }

    async function generateNewLink() {
        setModal('Loading')
        setLoadingText('Generating new link...')

        const newShareId = uuidv4()
        const { error } = await supabase
            .from('realms')
            .update({ 
                share_id: newShareId
                })
            .eq('id', realmId)

        if (error) {
            toast.error(error.message)
        } else {
            setShareId(newShareId)
            const link = process.env.NEXT_PUBLIC_BASE_URL + '/play/' + realmId + '?shareId=' + newShareId
            navigator.clipboard.writeText(link)
            toast.success('New link copied!')
        }

        revalidate('/manage/[id]')
        setModal('None')
    }

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = removeExtraSpaces(e.target.value)
        setName(value)
    }

    return (
        <div className='w-full min-h-screen bg-gray-900 relative overflow-hidden'>
            {/* Background Elements */}
            <div className='absolute inset-0 bg-gray-800/50'></div>
            <div className='absolute top-20 left-20 w-72 h-72 bg-gray-700/20 rounded-full blur-3xl'></div>
            <div className='absolute bottom-20 right-20 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl'></div>
            
            {/* Header with Back Button */}
            <div className='relative z-10 p-6'>
                <Link href='/app' className='inline-flex items-center text-white/70 hover:text-white transition-colors duration-300 group'>
                    <ArrowLeft className='w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300' />
                    Back to Dashboard
                </Link>
            </div>

            {/* Main Content */}
            <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>
                <div className='max-w-4xl w-full'>
                    {/* Header */}
                    <div className='text-center mb-12'>
                        <h1 className='text-4xl font-bold text-white mb-2'>Manage Realm</h1>
                        <p className='text-gray-300'>Configure your virtual space settings</p>
                    </div>

                    {/* Management Panel */}
                    <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl'>
                        <div className='flex flex-row gap-8'>
                            {/* Sidebar Navigation */}
                            <div className='flex flex-col w-64 border-r border-gray-700/50 pr-6'>
                                <div className='space-y-2'>
                                    <button 
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                            selectedTab === 0 
                                                ? 'bg-gray-700/50 text-white border border-gray-600' 
                                                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                                        }`}
                                        onClick={() => setSelectedTab(0)}
                                    >
                                        <Gear className='w-5 h-5' />
                                        <span className='font-medium'>General</span>
                                    </button>
                                    <button 
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                            selectedTab === 1 
                                                ? 'bg-gray-700/50 text-white border border-gray-600' 
                                                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                                        }`}
                                        onClick={() => setSelectedTab(1)}
                                    >
                                        <Share className='w-5 h-5' />
                                        <span className='font-medium'>Sharing</span>
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className='flex-1'>
                                {selectedTab === 0 && (
                                    <div className='space-y-6'>
                                        <div>
                                            <h3 className='text-xl font-semibold text-white mb-4'>General Settings</h3>
                                            <div className='space-y-4'>
                                                <div>
                                                    <label className='block text-sm font-medium text-gray-300 mb-2'>Realm Name</label>
                                                    <BasicInput 
                                                        value={name} 
                                                        onChange={onNameChange} 
                                                        maxLength={32}
                                                        className='w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedTab === 1 && (
                                    <div className='space-y-6'>
                                        <div>
                                            <h3 className='text-xl font-semibold text-white mb-4'>Sharing Options</h3>
                                            <div className='space-y-4'>
                                                <div className='flex flex-col gap-3'>
                                                    <button 
                                                        className='group flex items-center gap-3 px-4 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-xl transition-all duration-300'
                                                        onClick={copyLink}
                                                    >
                                                        <Copy className='w-5 h-5 text-blue-400' />
                                                        <span className='text-white font-medium'>Copy Current Link</span>
                                                    </button>
                                                    <button 
                                                        className='group flex items-center gap-3 px-4 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-xl transition-all duration-300'
                                                        onClick={generateNewLink}
                                                    >
                                                        <Copy className='w-5 h-5 text-green-400' />
                                                        <span className='text-white font-medium'>Generate New Link</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className='flex justify-end mt-8 pt-6 border-t border-gray-700/50'>
                            <button 
                                className='group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 border-2 border-gray-600 hover:border-gray-500 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl'
                                onClick={save}
                            >
                                <FloppyDisk className='w-5 h-5' />
                                <span className='font-semibold text-white'>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageChild