import React from 'react'
import { ModalProvider } from '@/app/hooks/useModal'
import ModalParent from '../Modal/ModalParent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type LayoutProps = {
    children?: React.ReactNode
}

const Layout:React.FC<LayoutProps> = ({ children }) => {

    return (
        <ModalProvider>
            <ToastContainer theme='colored' pauseOnHover={false}/>
            <ModalParent />
            {children}
        </ModalProvider>
    )
}

export default Layout