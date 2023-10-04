import { InputConverter } from "./InputConverter";
import { SelectConverter } from "./SelectConverter";

export const FormConverter = ({ children }) => {
  return (
    <div
      className={`sm:w-[43%] h-[11em] sm:h-full p-[0.6rem_0.8rem] sm:border-b-[0.13rem] ${
        children === "From" ? "sm:border-r-[0.13rem]" : "sm:border-l-[0.13rem]"
      }  border-zinc-200 rounded-[1.3rem] rounded-t-none`}
    >
      <h4 className="font-bold text-gray-700 text-[1.1rem] sm:text-[0.9rem] md:text-[1.1rem] mb-[0.4rem] md:mb-[0.5rem]">
        {children}
      </h4>
      <div className="h-full flex justify-between">
        <InputConverter />
        <SelectConverter />
      </div>
    </div>
  );
};
