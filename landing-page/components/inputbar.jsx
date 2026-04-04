import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { useRef, useState } from "react";
export const InputBar = () => {
  const fileRef = useRef(null);
  const DesktopClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[(0, 1)];
    if (!file) return;
  };

  return (
    <div className="flex">
      <Button className="h-13 ml-1 mr-1 rounded-full" onClick={DesktopClick}>
        <Plus className="size-6 text-white" />
      </Button>
      <div>
        <Input
          ref={fileRef}
          onChange={handleFileChange}
          type="file"
          placeholder="Upload Your Pdf"
          className="bg-white h-12 w-100 rounded-3xl b"
        />
      </div>
      <Button className="h-12 ml-1 rounded-full">
        <Search className="size-7 text-white" />
      </Button>
    </div>
  );
};
