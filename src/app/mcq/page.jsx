"use client";
import { useEffect, useState } from "react";

export default function Mcq() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [correctOpt, setCorrectOpt] = useState("");
  // const [ansOpt, setAnsOpt] = useState("");
  // const [correct, setCorrect] = useState(0);
  // const [incorrect, setIncorrect] = useState(0);
  // // let i = 0;
  // // let j = 0;

  // // if (correct === ans) {
  // //   i++;
  // // } else {
  // //   j++;
  // // }

  // if (correctOpt === ansOpt) {
  //   setCorrect((prev) => prev + 1);
  // } else {
  //   setIncorrect((prev) => prev + 1);
  // }
  useEffect(() => {
    const fetchMcq = async () => {
      setLoading(true);
      const response = await fetch("/api/actions/get-mcq");
      if (!response.ok) {
        throw new Error("no mcq found");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchMcq();
  }, []);

  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          {data.map((item) => (
            <li key={item.id}>
              <div>{item.mcq}</div>
              <br />
            </li>
          ))}
        </div>
      )}
    </>
  );
}
