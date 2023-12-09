import React, { useEffect } from "react";
import "../styles/modal.css";
import { Loading, NotificationMessageModal } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../../redux/status.slice";

export const Modal = ({ active, setActive, children }) => {
  const status = useSelector(state => state.status.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'saccess') {
      setActive(false)
      
      setTimeout(() => {
        dispatch(updateStatus('panding'))
      }, 2000)
    }
  }, [status])


  return (
    <>
      {status === 'saccess'
        ? <NotificationMessageModal />
        :
        <div
          className={active ? "modal active" : "modal"}
          onClick={() => status !== 'loading' && setActive(false)}
        >
          <div
            className={`${status === 'loading' ? 'blur-sm ' : ''} ` + 'w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[540px] md:h-[540px] p-[0px_6px] md:p-[0px_53px] ' + (active ? "modal__content active" : "modal__content")}
            onClick={e => e.stopPropagation()}
          >
            {children}
            <button className="absolute right-[-18px] bottom-[-18px] sm:right-[-25px] sm:bottom-[-25px] md:right-[-30px] md:bottom-[-30px]" onClick={() => setActive(false)}>
              <svg className="w-[31px] h-[30px] scale-[0.6] sm:scale-[0.8] md:scale-100" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 27.4473L27.0416 3.40563" stroke="#4D4AC8" strokeWidth="5" strokeLinecap="round" />
                <path d="M4 3L28.0416 27.0416" stroke="#4D4AC8" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {status === 'loading' && <Loading />}
        </div>
      }
    </>
  );
};
