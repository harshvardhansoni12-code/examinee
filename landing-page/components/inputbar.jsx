"use client";
import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { FileUp, FileText, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

export const InputBar = ({ pdf, setPdf, disabled = false }) => {
  const fileRef = useRef(null);

  const DesktopClick = () => {
    if (disabled) return;
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPdf(file);
  };

  return (
    <div className="w-full max-w-xl">
      <div
        onClick={DesktopClick}
        className={`relative group flex flex-col sm:flex-row items-center gap-3 p-3.5 bg-[#FFFDF9] rounded-2xl border-2 border-dashed ${
          pdf ? "border-[#E85B9C] bg-[#FCE7F1]/30" : "border-[#191919] hover:border-[#E85B9C]"
        } shadow-brutal-sm transition-all cursor-pointer ${
          disabled ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="w-11 h-11 rounded-xl bg-[#F5F2EB] border-2 border-[#191919] flex items-center justify-center text-[#191919] shrink-0 group-hover:bg-[#E85B9C] group-hover:text-white transition-colors">
          {pdf ? (
            <FileText className="w-5 h-5 text-[#C93678] group-hover:text-white" />
          ) : (
            <FileUp className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left">
          {pdf ? (
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <p className="text-sm font-black text-[#191919] truncate">
                {pdf.name}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-extrabold text-[#191919]">
                Choose a PDF study document
              </p>
              <p className="text-xs font-semibold text-[#888888]">
                Lecture notes, textbook chapters, or exam reviews
              </p>
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          onChange={handleFileChange}
          type="file"
          disabled={disabled}
          accept=".pdf"
          className="hidden"
        />

        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            DesktopClick();
          }}
          disabled={disabled}
          className="btn-brutal h-10 px-5 rounded-xl bg-[#FFFDF9] hover:bg-[#F5F2EB] text-[#191919] font-black text-xs shrink-0 cursor-pointer"
        >
          {pdf ? "Change PDF" : "Browse Files"}
        </Button>
      </div>
    </div>
  );
};
