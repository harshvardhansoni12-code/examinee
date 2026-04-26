import { Input } from "../../src/components/ui/input";
import { Button } from "../../src/components/ui/button";
import { Plus } from "lucide-react";
import { useRef } from "react";
export const InputBar = ({ pdf, setPdf }) => {
  const fileRef = useRef(null);
  const DesktopClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPdf(file);
    //
  };

  return (
    <div className="flex w-full max-w-xl gap-3 justify-center items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl shadow-sm border border-indigo-100/80 dark:border-slate-700 transition-all hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50">
      <div className="relative flex-1 min-w-0">
        <Input
          readOnly
          type="text"
          placeholder="Select a PDF document to begin..."
          value={pdf ? pdf.name : ""}
          onClick={DesktopClick}
          className="w-full h-12 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 cursor-pointer truncate text-base font-medium"
        />
        <input
          ref={fileRef}
          onChange={handleFileChange}
          type="file"
          accept=".pdf"
          className="hidden"
        />
      </div>
      <Button 
        className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95 text-white font-semibold" 
        onClick={DesktopClick}
        type="button"
      >
        <Plus className="size-5 mr-1" />
        {pdf ? "Change" : "Browse"}
      </Button>
    </div>
  );
};
