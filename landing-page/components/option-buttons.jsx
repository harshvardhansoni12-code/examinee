import toast from "react-hot-toast";
import { Button } from "../../src/components/ui/button";

export const OptionsButtons = ({ pdf }) => {
  const uploadPdf = async () => {
    try {
      if (!pdf) {
        toast.error("please select the pdf");
        return;
      }
      const formData = new FormData();
      formData.append("file", pdf);
      const response = await fetch("api/mcq", {
        method: "POST",
        body: formData,
      });
      if (response) {
        toast.success("pdf created");
      }
    } catch (e) {
      toast.error(response.error);
      return;
    }
  };
  //
  return (
    <div className="flex justify-center items-center max-w-72 gap-20">
      <div className=" flex items-center">
        <Button variant={"mcq"} onClick={uploadPdf}>
          Mcq
        </Button>
      </div>
      <div className="flex items-center">
        <Button variant={"cards"}>Cards</Button>
      </div>
    </div>
  );
};
