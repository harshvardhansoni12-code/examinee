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
  };

  return (
    <div className="flex gap-1 justify-center items-center">
      <div>
        <Button className="h-11 rounded-full" onClick={DesktopClick}>
          <Plus className="size-6 text-white" />
        </Button>
      </div>
      <div>
        <form>
          <Input
            ref={fileRef}
            onChange={handleFileChange}
            type="file"
            placeholder="Upload Your Pdf"
            className="bg-white h-12 w-100 rounded-3xl"
          />
        </form>
      </div>
    </div>
  );
};
