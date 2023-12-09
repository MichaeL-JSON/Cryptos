export const NotificationMessageModal = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div className="bg-white p-6 border-[1px] border-green-200 border-opacity-50 rounded-[10px] shadow-2xl">
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="green"
            className="h-12 w-12"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-green-700 font-bold ">Success</p>
      </div>
    </div>
  )
}