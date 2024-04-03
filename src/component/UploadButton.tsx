"use client"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'

const UploadButton = () => {
 
    const [isopen, setIsOpen] = useState<boolean>(false)

    return (
        <Dialog      open={isopen}  onOpenChange={(v)=>{
            if(!v){
                setIsOpen(v)
            }
        }}>
              <DialogTrigger asChild onClick={()=>setIsOpen(true)} className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9  px-3 ' >
                <button >UplaodPdf</button>
              </DialogTrigger>

              <DialogContent>
                hmmmmm
              </DialogContent>
        </Dialog>
        
    )



}

export default UploadButton
