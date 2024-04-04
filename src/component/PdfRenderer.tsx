"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useResizeDetector } from "react-resize-detector";
import { useForm } from "react-hook-form";
import { number, string, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from '@/lib/utils';



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps {
  url: string,
}


const PdfRenderer = ({ url }: PdfRendererProps) => {

  const { toast } = useToast()
  const { width, ref } = useResizeDetector()
  const [numPages, setNumPages] = useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const CustomPageValidator = z.object({
    page: z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages!)
  })
  type TCustomPageValidator = z.infer<typeof CustomPageValidator>
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: '1'
    },
    resolver: zodResolver(CustomPageValidator)
  })

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrentPage(Number(page))
    setValue("page", String(page))
  }

  return (
    <div className=' w-full bg-white rounded-md flex flex-col shadow items-center'>
      <div className=' h-14  w-full border-b border-zinc-200 flex items-center  justify-between px-2 '>
        <div className=" flex gap-1.5 items-center">
          <Button
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage((prev) => prev - 1 > 1 ? prev - 1 : 1)
            }}
            variant="ghost" aria-label='previous page' >
            <ChevronDown className='h-4 w-4' />
          </Button>
          <div className='flex gap-1.5 items-center '>

            <Input {...register('page')}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)()
                }
              }}
              className={cn('h-12 w-10 ', errors.page && "focus-visible:ring-red-600")} />

            <p className='text-zinc-700 text-sm space-x-1'>
              <span>/</span>
              <span>{numPages ?? 'x'}</span>
            </p>

          </div>

          <Button
            disabled={
              numPages === undefined || currentPage === numPages
            }
            onClick={() => {
              setCurrentPage((prev) => prev + 1 > numPages! ? numPages! : prev + 1)
            }}
            variant="ghost" aria-label='next page'>

            <ChevronUp className='h-4 w-4' />

          </Button>

        </div>

      </div>

      <div className='flex-1 w-full max-h-screen'>

        <div ref={ref}>

          <Document loading={
            <div className='flex justify-center'>

              <Loader2 className=' my-24 h-6 w-6 animate-spin' />

            </div>
          }
            onLoadError={
              () => {
                toast({
                  title: "Error loading Pdf",
                  description: "plese try again later",
                  variant: 'destructive'
                })
              }
            }

            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            file={url} className="max-h-96  ">

            <Page width={width ? width : 1} pageNumber={currentPage} />

          </Document>
        </div>
      </div>
    </div>
  )
}

export default PdfRenderer
