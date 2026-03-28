import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
export const InputBar = () => {
  return (
    <div className="flex">
      <div>
        <Input
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
