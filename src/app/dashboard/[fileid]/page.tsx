import ChatWrapper from '@/component/ChatWrapper'
import PdfRenderer from '@/component/PdfRenderer'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

interface PagePropes {
    params:{
        fileid:string
    }
}

const page = async({params}:PagePropes) => {
// retrive the  file id 
    const {fileid} = params

   const {getUser} = getKindeServerSession()
   const user = await getUser()
   
   if(!user|| !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`)

   // make database call

   const file = await db.file.findFirst({
    where:{
      id: fileid,
      userId: user.id,
    }
   })

   if(!file) notFound()

  return (
    <div className=' flex justify-center flex-1 flex-col h-[calc(100vh-3.5rem)]'>
      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2 '>
        {/* left side */}
        <div className=' flex-1 xl:flex'>
          <div className="px-4 py-6 sm:px-6 lg:pl-6 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url}/>
          </div>
        </div>

        <div className=' shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96  lg:border-l lg:border-t-0'>
          <ChatWrapper/>
        </div>

      </div>
    </div>
  )
}

export default page
