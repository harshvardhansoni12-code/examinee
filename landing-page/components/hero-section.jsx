"use client";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 lg:pt-40 lg:pb-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
      {/* Left Content */}
      <div className="flex-1 max-w-xl text-center lg:text-left z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Study Smarter <br className="hidden md:block" />
          With <span className="text-indigo-600">AI!</span>
        </h1>
        <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
          Expand your knowledge and skills through our dynamic AI platform.
          Upload your notes, generate mock tests, and master your subjects from
          anywhere.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
          <button
            onClick={() => router.push("/authpage")}
            className="px-8 py-3.5 rounded-full bg-indigo-600 text-white font-bold shadow-[0_8px_20px_rgb(79,70,229,0.3)] hover:bg-indigo-700 hover:shadow-[0_8px_25px_rgb(79,70,229,0.4)] transition-all active:scale-95 w-full sm:w-auto"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Right Content - Hero Grid */}
      <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10 flex justify-center lg:justify-end">
        {/* Background decorative blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full aspect-square max-w-[500px]">
          {/* Row 1 */}
          <div className="col-start-2 rounded-t-full rounded-b-xl overflow-hidden shadow-lg relative bg-white">
            <Image
              src="/student1.png"
              alt="Student studying"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-start-3 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl bg-indigo-600 shadow-lg" />

          {/* Row 2 */}
          <div className="col-start-1 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-purple-500 shadow-lg relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          <div className="col-start-2 rounded-full overflow-hidden shadow-lg relative border-4 border-white bg-white">
            <Image
              src="/student2.png"
              alt="Student with headphones"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-start-3 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-rose-500 shadow-lg" />

          {/* Row 3 */}
          <div className="col-start-1 rounded-b-full rounded-t-xl overflow-hidden shadow-lg relative bg-white">
            <Image
              src="/student3.png"
              alt="Taking notes"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-start-2 rounded-bl-[3rem] rounded-tr-[3rem] rounded-tl-xl rounded-br-xl bg-amber-400 shadow-lg" />
          <div className="col-start-3 rounded-tl-full rounded-br-full overflow-hidden shadow-lg relative bg-white">
            <Image
              src="/student4.png"
              alt="Cheerful student"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
