"use client"

import React, { useState } from 'react'
import {QueryClient} from "@tanstack/react-query"
import { trpc } from '@/app/_trpc/Client'
import { httpBatchLink } from '@trpc/client'

const Provider = () => {
 const [queryClient] = useState(()=> new QueryClient())
 const [trpcClient] = useState(()=> trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000//api/trpc',
        })
    ]
 }))
}

export default Provider
