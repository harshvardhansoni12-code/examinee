export default function Mcq({ pdf, setPdf }) {
  const uploadPdf = async () => {
    if (!pdf) {
      toast.error("please select the pdf");
      return;
    }
    const formData = new FormData();
    formData.append("file", pdf);
    const response = await fetch("api/mcq", {
      method: "POST",
      header: { "Content-Type": formData },
    });
  };

  return <div>this is mcq page!</div>;
}
