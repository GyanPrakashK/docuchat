import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const page = async() => {
    const router = useRouter()
  const  searchParams = useSearchParams()
  const origin = searchParams.get('origin')
  const apiResponce = await fetch('/api/whatever')
  const data = await apiResponce.json()  
  return (
    <div>
      
    </div>
  )
}

export default page
