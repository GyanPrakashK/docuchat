import MaxWidhWrapper from "@/component/MaxWidhWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
 < MaxWidhWrapper className=" mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center ">
  <div className=" mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
<p className="text-sm font-semibold text-gray-700">DocuChat is public?</p>
 </div>
 <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
    chat with your <span className="text-blue-600">Document</span> in seconds.
 </h1>
 <p className=" mt-5 max-w-prose text-zinc-700 sm:text-lg">
  docuChat allow to chat with any PDF.Simply Upload your file & start chat in right way
 </p>
 <Link className={buttonVariants({
  size:"lg",
  className:"mt-5"
 })} href="/dashboard" target="_blank">Get Start<ArrowRight className="ml-2 h-5 w-5"/></Link>
  </ MaxWidhWrapper>
  <div>
    <div className="relative isolate">
      <div  aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
              <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ea6742] to-[#f759edcb] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />

      </div>
    </div>
  </div>
  </>
  );
}
