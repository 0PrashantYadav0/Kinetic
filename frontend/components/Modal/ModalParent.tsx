'use client'
import React from 'react'
import CreateRealmModal from './CreateRealmModal'
import AccountDropdown from '../AccountDropdown'
import LoadingModal from './LoadingModal'
import DeleteRoomModal from './DeleteRoomModal'
import TeleportModal from './TeleportModal'
import DeleteRealmModal from './DeleteRealmModal'
import FailedToConnectModal from './FailedToConnectModal'
import SkinMenu from '@/app/play/SkinMenu/SkinMenu'
import DisconnectedModal from './DisconnectedModal'
import { useModal } from '@/app/hooks/useModal'

const ModalParent:React.FC = () => {

    const { errorModal } = useModal()

    return (
        <div>
            {errorModal === 'None' && (
                <>
                    <CreateRealmModal />
                    <AccountDropdown />
                    <LoadingModal />
                    <DeleteRoomModal />
                    <TeleportModal />
                    <DeleteRealmModal />
                    <SkinMenu />
                </>
            )}
            <FailedToConnectModal />
            <DisconnectedModal />
        </div>
    )
}
export default ModalParent;