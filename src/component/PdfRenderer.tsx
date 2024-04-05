"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ChevronDown, ChevronUp, Divide, Loader2, RotateCw, Search } from 'lucide-react';
import React, { useState } from 'react'
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useResizeDetector } from "react-resize-detector";
import { useForm } from "react-hook-form";
import { number, string, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SimpleBar from "simplebar-react";
import PdfFullscreen from './PdfFullscreen';



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps {
  url: string,
}


const PdfRenderer = ({ url }: PdfRendererProps) => {

  const { toast } = useToast()
  const { width, ref } = useResizeDetector()
  const [numPages, setNumPages] = useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedscale, setRenderedscale] = useState<number | null>(null)

  const isLoading = renderedscale !== scale


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

              setValue('page', String(currentPage - 1))
            }}
            variant="ghost" aria-label='previous page' >
            < ChevronUp className='h-4 w-4' />
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
              setValue('page', String(currentPage + 1))
            }}

            variant="ghost" aria-label='next page'>

            <ChevronDown className='h-4 w-4' />

          </Button>

        </div>
        <div className=' space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label='zoom' variant='ghost' className='gap-1.5'>
                <Search className='h-4 w-4 ' />
                {scale * 100}% <ChevronDown className='h-4 w-4 opacity-50' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button aria-label='rotate 90 degree' variant='ghost' onClick={() => setRotation((prev) => prev + 90)}>
            <RotateCw className='h-4 w-4' />
          </Button>

          <PdfFullscreen fileUrl={url} />
        </div>
      </div>

      <div className='flex-1 w-full max-h-screen'>
        <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)] '>
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
              file={url} className="max-h-full  ">

              {isLoading && renderedscale ? <Page
                width={width ? width : 1}
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                key={"@"+ renderedscale} 
                /> : null}

              <Page
                className={cn(isLoading ? "hidden":"")}
                width={width ? width : 1}
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                key={"@" + scale}
                loading={
                  <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin'/>
                  </div>
                }
                onRenderSuccess={()=>setRenderedscale(scale)}
                />

            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PdfRenderer
