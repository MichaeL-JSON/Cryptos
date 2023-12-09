export const ErrorMessage = ({ children }) => {
  return (
    <div
      style={{ boxShadow: '1px 1px 10px 0px rgba(91, 88, 197, 0.4)' }}
      className='absolute rounded-[5px] rounded-es-[0px] p-[4px_10px] max-w-[130px] sm:max-w-[180px] md:max-w-[211px] bg-white bottom-[20px] sm:bottom-[25px] md:bottom-[43px] right-[20px] sm:right-[40px] md:right-[-15px] text-[#cc2929d1] text-[9px] sm:text-[12px] font-bold'>
      {children}
    </div>
  )
}