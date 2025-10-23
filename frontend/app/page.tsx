'use client'
import AnimatedCharacter from './play/SkinMenu/AnimatedCharacter'
import Link from 'next/link'
import BasicButton from '@/components/BasicButton'
import { Code, GithubLogo, Play, Users, VideoCamera, ChatCircle } from '@phosphor-icons/react'

export default function Index() {
  return (
    <div className='w-full min-h-screen bg-gray-900 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gray-800/50'></div>
      <div className='absolute top-20 left-20 w-72 h-72 bg-gray-700/20 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 right-20 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl'></div>
      
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Hero Section */}
          <div className='mb-12'>
            <h1 className='font-bold text-5xl md:text-6xl text-white mb-6'>
              Kinetic
            </h1>
            <p className='text-xl md:text-2xl text-gray-300 mb-4 font-light'>
              A modern virtual collaboration platform
            </p>
            <p className='text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed'>
              Experience seamless virtual meetings, interactive workspaces, and real-time collaboration 
              in a beautifully designed 2D environment. Built with cutting-edge technology for the future of remote work.
            </p>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto'>
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300'>
              <Users className='w-8 h-8 text-green-400 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-white mb-2'>Virtual Spaces</h3>
              <p className='text-gray-400 text-sm'>Customizable rooms and interactive environments</p>
            </div>
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300'>
              <ChatCircle className='w-8 h-8 text-blue-400 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-white mb-2'>Real-time Chat</h3>
              <p className='text-gray-400 text-sm'>Instant messaging and collaboration tools</p>
            </div>
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 flex'>
              <AnimatedCharacter src='/sprites/characters/Character_001.png'/>
              <AnimatedCharacter src='/sprites/characters/Character_002.png'/>
              <AnimatedCharacter src='/sprites/characters/Character_003.png'/>
              <AnimatedCharacter src='/sprites/characters/Character_004.png'/>
            </div>
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 flex'>
              <AnimatedCharacter src='/sprites/characters/Character_005.png'/>
              <AnimatedCharacter src='/sprites/characters/Character_006.png'/>
              <AnimatedCharacter src='/sprites/characters/Character_007.png'/>
              <AnimatedCharacter src='/sprites/characters/Character_008.png'/>
            </div>
          </div>

          {/* CTA Section */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-6 mb-12'>
            <Link href='/app'>
              <button className='group relative px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 border-2 border-gray-600 hover:border-gray-500 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-gray-900/50'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='relative flex items-center justify-center gap-3'>
                  <Play className='w-6 h-6' />
                  <span>Get Started</span>
                </div>
              </button>
            </Link>
            <Link href='/signin'>
              <button className='group relative px-10 py-5 text-lg font-bold text-white bg-transparent border-2 border-gray-600 hover:border-gray-400 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-gray-900/50 hover:bg-gray-800/30'>
                <div className='flex items-center justify-center gap-3'>
                  <span>Sign In</span>
                </div>
              </button>
            </Link>
          </div>

          {/* Footer */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500'>
            <div className='flex items-center gap-2'>
              <span>Created by</span>
              <a 
                href="https://github.com/0PrashantYadav0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='font-semibold text-white hover:text-gray-300 transition-colors duration-300'
              >
                Prashant Yadav
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <a 
                href='https://github.com/0PrashantYadav0/Kinetic' 
                target="_blank" 
                rel="noopener noreferrer" 
                className='font-semibold text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-2'
              >
                <GithubLogo className='w-4 h-4' />
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
