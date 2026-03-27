import { NotebookTabs } from "lucide-react";
import { TriangleRight } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { Code } from "lucide-react";
import { AlarmClockCheck } from "lucide-react";
export const BackGround = () => {
  return (
    <div className="">
      <Code className="absolute top-12 left-8 text-pink-300 size-14 opacity-30 animate-float" />

      <TriangleRight className="absolute top-[22%] right-[18%] text-green-200 size-16 opacity-30 animate-float" />

      <GraduationCap className="absolute bottom-[18%] left-[28%] text-amber-300 size-14 opacity-30 animate-float" />

      <NotebookTabs className="absolute top-[48%] right-[35%] text-purple-300 size-12 opacity-30 animate-float" />

      <AlarmClockCheck className="absolute bottom-10 right-10 text-pink-300 size-16 opacity-30 animate-float" />

      {/* extra for randomness */}
      <Code className="absolute top-[65%] left-[12%] text-pink-300 size-12 opacity-30 animate-float" />

      <TriangleRight className="absolute top-[8%] right-[40%] text-green-200 size-12 opacity-30 animate-float" />
    </div>
  );
};
