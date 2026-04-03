import { Options } from "./options";
import { UserButton } from "../../../auth/components/UserButton";
export const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center rounded-4xl h-14 m-1 p-1 bg-slate-100 z-50">
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
