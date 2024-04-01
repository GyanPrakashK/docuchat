"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { trpc } from '../_trpc/Client'

const page = async() => {
    const router = useRouter()
  const  searchParams = useSearchParams()
  const origin = searchParams.get('origin')
  
  const { data , error} = trpc.authCallback.useQuery(undefined );
                              
useEffect(() => {
  if (data?.success){
    router.push(origin?`/$(origin)`: "/dashboard");
  }else if (error?.data?.code === "UNAUTHORIZED"){
    console.log('error: ', error); 
    router.push("/sign-in");
  }
}, [data, error, router,origin])

 
}

export default page
