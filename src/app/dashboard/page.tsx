
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  if(!user|| !user.id ) redirect('/auth-callback?origin=dashboard')
  return (
    <div className='flex gap-7'>
      {user?.email}
    <div>
    {user.id}
    </div>
    </div>
  )
}

export default Page
