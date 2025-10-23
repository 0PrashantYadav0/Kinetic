
type NotFoundProps = {
    specialMessage?: string
}

export default function NotFound({ specialMessage }: NotFoundProps) {

    function getMessage() {
        if (specialMessage === 'only owner') {
            return 'This realm is private right now. Come back later! 😶'
        } else {
            return '404 - This page is not real! ☹️'
        }
    }

    return (
        <div className='w-full min-h-screen bg-gray-900 relative overflow-hidden'>
            {/* Background Elements */}
            <div className='absolute inset-0 bg-gray-800/50'></div>
            <div className='absolute top-20 left-20 w-72 h-72 bg-gray-700/20 rounded-full blur-3xl'></div>
            <div className='absolute bottom-20 right-20 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl'></div>
            
            <div className='relative z-10 w-full h-screen grid place-items-center p-4'>
                <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 shadow-2xl text-center max-w-2xl'>
                    <h1 className='text-4xl font-bold text-white mb-4'>{getMessage()}</h1>
                    <p className='text-gray-300 mb-8'>The page you're looking for doesn't exist or has been moved.</p>
                    <a 
                        href='/app' 
                        className='inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 rounded-xl transition-all duration-300 text-white font-medium'
                    >
                        Return to Dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}