'use client'
import { createClient } from '@/utils/supabase/client'
import GoogleSignInButton from './GoogleSignInButton'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Users } from '@phosphor-icons/react'

export default function Login() {

    const signInWithGoogle = async () => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: process.env.NEXT_PUBLIC_BASE_URL + '/auth/callback'
            }
        })
    }

  return (
    <div className='w-full h-screen bg-gray-900 relative overflow-hidden fixed inset-0'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gray-800/50'></div>
      <div className='absolute top-20 left-20 w-72 h-72 bg-gray-700/20 rounded-full blur-3xl'></div>
      <div className='absolute bottom-20 right-20 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl'></div>
      
      {/* Header */}
      <div className='absolute top-6 left-6 z-20'>
        <Link href='/' className='inline-flex items-center text-white/70 hover:text-white transition-colors duration-300'>
          <ArrowLeft className='w-5 h-5 mr-2' />
          Back to Home
        </Link>
      </div>

      {/* Main Content - Fixed Center */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full px-4'>
        <div className='max-w-md w-full'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-white mb-2'>Welcome Back</h1>
            <p className='text-gray-300'>Sign in to access your virtual workspace</p>
          </div>

          {/* Sign In Card */}
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl'>
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-semibold text-white mb-2'>Sign In to Kinetic</h2>
              <p className='text-gray-400 text-sm'>Choose your preferred sign-in method</p>
            </div>

            {/* Google Sign In */}
            <div className='mb-6'>
              <GoogleSignInButton onClick={signInWithGoogle}/>
            </div>

            {/* Security Features */}
            <div className='space-y-3 text-sm text-gray-400'>
              <div className='flex items-center gap-3'>
                <Shield className='w-4 h-4 text-green-400' />
                <span>Secure authentication with Google OAuth</span>
              </div>
              <div className='flex items-center gap-3'>
                <Lock className='w-4 h-4 text-blue-400' />
                <span>End-to-end encrypted communications</span>
              </div>
              <div className='flex items-center gap-3'>
                <Users className='w-4 h-4 text-gray-400' />
                <span>Join virtual spaces with friends and colleagues</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='text-center mt-8 text-sm text-gray-400'>
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
            <div className='mt-4'>
              <Link href='/' className='text-gray-400 hover:text-white transition-colors duration-300'>
                Learn more about Kinetic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
