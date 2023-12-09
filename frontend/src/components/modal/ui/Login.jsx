import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'


import frame from "/Frame.svg";
import greenSvg from "/Ellipse 19.svg";
import redSvg from "/Ellipse 21.svg";
import graySvg from "/Ellipse 22.svg";
import { useLoginMutation } from '../../../redux/authApi';
import { ErrorMessage, Label } from '../../common';
import { updateStatus } from '../../../redux/status.slice'
import { useDispatch } from 'react-redux';

export const Login = ({ setAuthValue }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ mode: "onBlur" });

  const [passwordVisible, setPasswordVisible] = useState(true)
  const [login, { data, isLoading, isError }] = useLoginMutation()

  const dispatch = useDispatch()

  const handleSubmitForm = async (data) => {
    if (isValid) {
      await login(data);
    }
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(updateStatus('loading'))
      return
    }
    dispatch(updateStatus('panding'))

  }, [isLoading])

  useEffect(() => {
    if (data) {
      dispatch(updateStatus('saccess'))
    }
  }, [data])

  return (
    <form
      className="flex flex-col justify-between h-full pb-[60px] sm:pb-[90px]"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div>
        <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[17px] sm:mb-[23px] md:mb-[50px] flex relative">
          <img
            src={
              errors?.email?.message
                ? redSvg
                : watch("email")
                ? greenSvg
                : graySvg
            }
            alt=""
            className="hidden md:block ml-[19px] z-20"
          />
          <input
            placeholder="username@gmail.com"
            className="m-[2px] pl-[13px] py-[3px] sm:py-[5px] rounded-[8px] w-full md:w-[382px] md:ml-[17px] text-[13px] sm:text-[16px] font-semibold text-[#454380] outline-none"
            {...register("email", {
              required: "This field must be filled in",
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message: "email invalid"
              }
            })}
          />
          <Label>
            <div className="flex items-center">
              <p>email</p>
              <img
                src={
                  errors?.email?.message
                    ? redSvg
                    : watch("email")
                    ? greenSvg
                    : graySvg
                }
                alt=""
                className="md:hidden z-20 w-[8px] h-[8px] ml-[3px]"
              />
            </div>
          </Label>
          {errors?.email && (
            <ErrorMessage>{errors?.email?.message || "Error"}</ErrorMessage>
          )}
        </div>

        <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[17px] sm:mb-[23px] md:mb-[50px] flex relative">
          <img
            src={
              errors?.password?.message
                ? redSvg
                : watch("password")
                ? greenSvg
                : graySvg
            }
            alt=""
            className="hidden md:block ml-[19px] z-20"
          />
          <input
            placeholder="password"
            type={passwordVisible ? "text" : "password"}
            className="m-[2px] pl-[13px] py-[3px] sm:py-[5px] rounded-[8px] w-full md:w-[382px] md:ml-[17px] text-[13px] sm:text-[16px] font-semibold text-[#454380] outline-none"
            {...register("password", {
              required: "This field must be filled in",
              minLength: {
                value: 8,
                message: "Weak password"
              },
              maxLength: {
                value: 25,
                message: "Password must not exceed 25 characters"
              }
            })}
          />
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="p-[0px_7px_0px_5px] cursor-pointer"
              onClick={() => setPasswordVisible(value => !value)}
            >
              {passwordVisible ? (
                <svg
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0009 8C14.0009 9.6569 12.6578 11 11.0009 11C9.34415 11 8.00098 9.6569 8.00098 8C8.00098 6.3431 9.34415 5 11.0009 5C12.6578 5 14.0009 6.3431 14.0009 8Z"
                    stroke="#454380"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.0012 1C6.52354 1 2.73326 3.94288 1.45898 8C2.73324 12.0571 6.52354 15 11.0012 15C15.4788 15 19.2691 12.0571 20.5434 8C19.2691 3.94291 15.4788 1 11.0012 1Z"
                    stroke="#454380"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.44531 1L18.4453 17L2.44531 1Z" fill="#454380" />
                  <path
                    d="M2.44531 1L18.4453 17"
                    stroke="#454380"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.66839 2.63732C2.63743 3.89322 1.046 5.79137 0.17706 8.0474C-0.05902 8.6604 -0.05902 9.3396 0.17706 9.9526C1.7642 14.0733 5.76172 17 10.4453 17C12.8673 17 15.1059 16.2173 16.9226 14.8915L15.4873 13.4562C14.0486 14.4309 12.3131 15 10.4453 15C6.61615 15 3.34315 12.6083 2.04341 9.2337C1.98553 9.0835 1.98553 8.9165 2.04341 8.7663C2.81262 6.76914 4.27297 5.11625 6.13071 4.09964L4.66839 2.63732ZM7.92486 5.89379C7.02211 6.6272 6.44528 7.7462 6.44528 9C6.44528 11.2091 8.23614 13 10.4453 13C11.699 13 12.8181 12.4232 13.5515 11.5204L12.1219 10.0908C11.765 10.6382 11.1474 11 10.4453 11C9.34071 11 8.44528 10.1046 8.44528 9C8.44528 8.2979 8.80711 7.6802 9.35441 7.3234L7.92486 5.89379ZM14.408 9.5485L9.89681 5.03729C10.0761 5.0127 10.2592 5 10.4453 5C12.6544 5 14.4453 6.79086 14.4453 9C14.4453 9.1861 14.4326 9.3692 14.408 9.5485ZM17.0131 12.1536C17.7991 11.3151 18.4265 10.3259 18.8471 9.2337C18.905 9.0835 18.905 8.9165 18.8471 8.7663C17.5474 5.39172 14.2744 3 10.4453 3C9.65351 3 8.88551 3.10226 8.15382 3.29433L6.56386 1.70437C7.77072 1.24913 9.07881 1 10.4453 1C15.1288 1 19.1263 3.92668 20.7135 8.0474C20.9496 8.6604 20.9496 9.3396 20.7135 9.9526C20.1917 11.3074 19.4093 12.5331 18.4277 13.5682L17.0131 12.1536Z"
                    fill="#454380"
                  />
                </svg>
              )}
            </button>
          </div>
          <Label>
            <div className="flex items-center">
              <p>password</p>
              <img
                src={
                  errors?.password?.message
                    ? redSvg
                    : watch("password")
                    ? greenSvg
                    : graySvg
                }
                alt=""
                className="md:hidden z-20 w-[8px] h-[8px] ml-[3px]"
              />
            </div>
          </Label>
          {errors?.password && (
            <ErrorMessage>{errors?.password?.message || "Error"}</ErrorMessage>
          )}
        </div>

        <div className="hidden md:block absolute top-[105px] left-[76px] w-[4px] h-[94px] bg-[#4D4AC8] z-10 "></div>
      </div>

      <div className='relative flex md:block justify-center items-center md:mt-[-25px]'>
        {isError && <p className='absolute flex items-center justify-center w-full bottom-[34px] sm:bottom-[54px] md:bottom-[136px] text-[#ee2626d1] text-[9px] sm:text-[12px] font-bold'>
          Not found user with this email or password
        </p>
        }

        <div className="flex justify-center">
          <button
            className={`bg-[#E2E1FF] flex items-center justify-center rounded-[11px] text-[16px] sm:text-[22px] py-[5px] px-[30px] w-[80px] sm:w-[138px] h-[33px] sm:h-[41px] md:px-[30px] text-[#4D4AC8] font-semibold ${
              !isValid && "opacity-60"
            }`}
            disabled={!isValid}
          >
            login
          </button>
        </div>
        <div className="flex items-center justify-center md:mt-[22px] md:mb-[28px] ml-[12px] md:ml-[0px] gap-[7px]">
          <div className="text-[#454380]  font-semibold text-[16px] sm:text-[22px]">
            <p className="hidden md:block">don&apos;t have an account?</p>
            <p className="block md:hidden">or</p>
          </div>
          <img className="mb-[-5px] sm:mb-[-7px]" src={frame} alt="logo" />
          <button
            type="button"
            className="text-[#4D4AC8] text-[16px] sm:text-[22px] font-bold"
            onClick={() => setAuthValue("Registration")}
          >
            <p className="hidden md:block">registration</p>
            <p className="block md:hidden">create account</p>
          </button>
        </div>
      </div>
    </form>
  );
};
