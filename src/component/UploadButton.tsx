"use client"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress';
import { Cloud, File } from 'lucide-react';
import React, { useState } from 'react'
import Dropzone from "react-dropzone";

const UploadDropzone =()=>{
  const [ isuploading , setIsUploading ] = useState<boolean>(true)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const startSimulatedProgress = ()=>{
       setUploadProgress(0)
       const interval = setInterval(()=>{
           setUploadProgress((prevProgress)=>{
            if(prevProgress >=95){
              clearInterval(interval)
              return prevProgress
            }
            return prevProgress + 5
           })
       },500)

       return interval
  }

  return <Dropzone multiple={false} onDrop={async(acceptedFile)=>{
   setIsUploading(true)

   const progressInterval = startSimulatedProgress()

   //handle file uploading 

   await new Promise((resolve)=> setTimeout(resolve, 1500))

   clearInterval(progressInterval)
   setUploadProgress(100)

  }}>
    {({getRootProps, getInputProps ,acceptedFiles})=>(
      <div {...getRootProps()} className=' border h-64 border-dashed border-gray-300 rounded-lg'>
        <div className="flex items-center justify-center h-full w-full">
          <label htmlFor="dropzone-file" className='flex flex-col items-center justify-center h-full w-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
           <Cloud className=' h-6 w-6 text-zinc-500 mb-2 '/>
           <p className=' mb-2 text-sm text-zinc-700'>
            <span className='font-semibold'> Click to upload</span> or drag and drop
           </p>
           <p className=' text-sm text-zinc-500'> PDF (up to 4MB)</p>
            </div>
            { acceptedFiles && acceptedFiles[0] ? (
              <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                <div className='px-3 py-2 h-full grid place-items-center'>
                  <File className=' h-4 w-4 text-blue-500'/>
                </div>
                <div className=' px-3 py-2 h-full text-sm truncate'>
                {acceptedFiles[0].name}
                </div>
              </div>
            ):null}

            {isuploading ? (
              <div className=' w-full mt-4 max-w-xs mx-auto'>
                <Progress value={uploadProgress} className=' h-1 w-full bg-zinc-200'/>
              </div>
            ): null}
          </label>
        </div>
      </div>
    )}
  </Dropzone>
}

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
              <UploadDropzone/>
              </DialogContent>
        </Dialog>
        
    )



}

export default UploadButton
