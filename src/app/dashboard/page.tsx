
import Dashboard from '@/component/Dashboard';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  if(!user|| !user.id ) redirect('/auth-callback?origin=dashboard')

  const dbuser  =await db.user.findFirst({
    where:{
      id: user.id
     
    }
  })

if(!dbuser) redirect('/auth-callback?origin=dashboard')

  return <Dashboard/>
}

export default Page
