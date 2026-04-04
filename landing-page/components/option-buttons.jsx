export const OptionsButtons = () => {
  return (
    <div className="flex justify-center items-center max-w-72 gap-20">
      <div className=" flex items-center">
        <button className="text-gray-400 rounded-2xl w-22 h-10 bg-red-300">
          MCQ
        </button>
      </div>
      <div className="flex items-center">
        <button className="text-gray-400 rounded-2xl w-22 h-10 bg-pink-200 ">
          Cards
        </button>
      </div>
    </div>
  );
};
