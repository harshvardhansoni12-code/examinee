import { Options } from "./options";
import { UserButton } from "../../../auth/components/UserButton";
export const NavBar = () => {
  return (
    <div className="absolute flex justify-between items-center rounded-4xl h-14 absoulute inset-0 m-1 p-1  bg-slate-100">
      <div className=" text-3xl font-bold flex justify-center pl-1">
        Examinee
      </div>
      <div>
        <Options />
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};
