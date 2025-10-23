import React from 'react'

type GoogleSignInButtonProps = {
    onClick: () => void
}

const GoogleSignInButton:React.FC<GoogleSignInButtonProps> = ({ onClick }) => {
    
    return (
        <button 
            className='group relative w-full h-16 bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out rounded-2xl flex items-center justify-center space-x-4 p-4 shadow-xl hover:shadow-2xl transform hover:scale-[1.05] border-2 border-gray-200 hover:border-gray-300' 
            onClick={onClick}
        >
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='relative flex items-center justify-center space-x-4'>
                <img src='/google-logo.png' alt="Google logo" className='h-7 w-7' />
                <span className='text-gray-700 font-bold text-lg'>Continue with Google</span>
            </div>
        </button>
    );
}

export default GoogleSignInButton