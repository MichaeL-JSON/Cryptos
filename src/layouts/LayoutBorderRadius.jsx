const LayoutBorderRadius = ({ children }) => {
  return (
    <div className="h-auto max-w-4xl mx-auto mt-5 md:mt-7 md:p-[2rem] md:border-2  border-b-0 border-zinc-200 rounded-[2rem]">
      {children}
    </div>
  );
};

export default LayoutBorderRadius;
