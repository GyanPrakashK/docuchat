"use client"
import React from 'react'
import MaxWidhWrapper from './MaxWidhWrapper'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
// import { Ghost } from 'lucide-react'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'


const NavBar = () => {
  return (
   <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>

    <MaxWidhWrapper>
      <div className='flex h-14 items-center justify-between border-b border-gray-200'>
        <Link href='/' className='flex z-40 font-semibold'>
        <span>docuchat</span>
        </Link>
        {/* for mobile latter */}
        <div className='sm:flex hidden items-center space-x-4'>
          <>
          <Link href="/pricing" className={buttonVariants(
            {
              variant: 'ghost',
              size: 'sm',
            }
          )}>Pricing</Link>
          <LoginLink className={buttonVariants(
            {
              variant: 'ghost',
              size: 'sm',
            }
          )}> Sign in</LoginLink>
          <RegisterLink className={buttonVariants(
            {
             
              size: 'sm',
            }
          )}> Get started</RegisterLink>
          </>
        </div>
      </div>
    </MaxWidhWrapper>
   </nav>
  )
}

export default NavBar
