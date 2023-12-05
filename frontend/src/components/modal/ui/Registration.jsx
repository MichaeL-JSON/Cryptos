import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import greenSvg from "/Ellipse 19.svg";
import redSvg from "/Ellipse 21.svg";
import graySvg from "/Ellipse 22.svg";
import { useRegistrationMutation } from '../../../redux/authApi';

const ErrorMessage = ({ children }) => {
  return (
    <div
      style={{ boxShadow: '1px 1px 10px 0px rgba(91, 88, 197, 0.4)' }}
      className='absolute rounded-[5px] rounded-es-[0px] p-[5px_10px] max-w-[211px] bg-white bottom-[43px] right-[-15px] text-[#cc2929d1] text-[11px] font-bold'>
      {children}
    </div>
  );
};

const Label = ({ children }) => {
  return (
    <label className="absolute left-[50px] top-[-15px] text-[#4D4AC8] text-[11px] font-bold">
      {children}
    </label>
  );
};

export const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ mode: "onBlur" });

  const [passwordVisible, setPasswordVisible] = useState(true)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true)
  const [registration] = useRegistrationMutation()

  const handleSubmitForm = async (data) => {
    if (isValid) {
      await registration({
        email: data.email,
        password: data.password,
        username: data.username
      })
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex relative">
        <img
          src={
            errors?.username?.message
              ? redSvg
              : watch("username")
              ? greenSvg
              : graySvg
          }
          alt=""
          className="ml-[19px] z-20"
        />
        <input
          placeholder="MIchael_JSON"
          className="m-[2px] pl-[13px] py-[5px] rounded-[8px] w-[382px] ml-[17px] text-[16px] font-semibold text-[#454380]"
          {...register("username", {
            required: "This field must be filled in",
            minLength: {
              value: 4,
              message: "Username must be at least 4 characters long"
            },
            maxLength: {
              value: 20,
              message: "Username must not exceed 20 characters"
            }
          })}
        />
        <Label>username</Label>
        {errors?.username && (
          <ErrorMessage>{errors?.username?.message || "Error"}</ErrorMessage>
        )}
      </div>

      <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex relative">
        <img
          src={
            errors?.email?.message
              ? redSvg
              : watch("email")
              ? greenSvg
              : graySvg
          }
          alt=""
          className="ml-[19px] z-20"
        />
        <input
          placeholder="example@mail.com"
          className="m-[2px] pl-[13px] py-[5px] rounded-[8px] w-[382px] ml-[17px] text-[16px] font-semibold text-[#454380]"
          {...register("email", {
            required: "This field must be filled in",
            pattern: {
              value:
                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              message: "email invalid"
            }
          })}
        />
        <Label>email</Label>
        {errors?.email && (
          <ErrorMessage>{errors?.email?.message || "Error"}</ErrorMessage>
        )}
      </div>

      <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex relative">
        <img
          src={
            errors?.password?.message
              ? redSvg
              : watch("password")
              ? greenSvg
              : graySvg
          }
          alt=""
          className="ml-[19px] z-20"
        />
        <input
          placeholder="XXXXXXX"
          type={passwordVisible ? 'text' : 'password'}
          className="my-[2px] pl-[13px] py-[5px] rounded-[11px] w-[352px] ml-[17px] text-[16px] font-semibold text-[#454380]"
          {...register("password", {
            required: "This field must be filled in",
            minLength: {
              value: 8,
              message: "Strong password"
            },
            maxLength: {
              value: 25,
              message: "Password must not exceed 25 characters"
            }
          })}
        />
        <div className='flex items-center justify-center'>
          <button type='button' className='ml-[5px] cursor-pointer' onClick={() => setPasswordVisible(value => !value)}>
            {passwordVisible
              ?
              <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0009 8C14.0009 9.6569 12.6578 11 11.0009 11C9.34415 11 8.00098 9.6569 8.00098 8C8.00098 6.3431 9.34415 5 11.0009 5C12.6578 5 14.0009 6.3431 14.0009 8Z" stroke="#454380" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.0012 1C6.52354 1 2.73326 3.94288 1.45898 8C2.73324 12.0571 6.52354 15 11.0012 15C15.4788 15 19.2691 12.0571 20.5434 8C19.2691 3.94291 15.4788 1 11.0012 1Z" stroke="#454380" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              :
              <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.44531 1L18.4453 17L2.44531 1Z" fill="#454380" />
                <path d="M2.44531 1L18.4453 17" stroke="#454380" stroke-width="2" stroke-linecap="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66839 2.63732C2.63743 3.89322 1.046 5.79137 0.17706 8.0474C-0.05902 8.6604 -0.05902 9.3396 0.17706 9.9526C1.7642 14.0733 5.76172 17 10.4453 17C12.8673 17 15.1059 16.2173 16.9226 14.8915L15.4873 13.4562C14.0486 14.4309 12.3131 15 10.4453 15C6.61615 15 3.34315 12.6083 2.04341 9.2337C1.98553 9.0835 1.98553 8.9165 2.04341 8.7663C2.81262 6.76914 4.27297 5.11625 6.13071 4.09964L4.66839 2.63732ZM7.92486 5.89379C7.02211 6.6272 6.44528 7.7462 6.44528 9C6.44528 11.2091 8.23614 13 10.4453 13C11.699 13 12.8181 12.4232 13.5515 11.5204L12.1219 10.0908C11.765 10.6382 11.1474 11 10.4453 11C9.34071 11 8.44528 10.1046 8.44528 9C8.44528 8.2979 8.80711 7.6802 9.35441 7.3234L7.92486 5.89379ZM14.408 9.5485L9.89681 5.03729C10.0761 5.0127 10.2592 5 10.4453 5C12.6544 5 14.4453 6.79086 14.4453 9C14.4453 9.1861 14.4326 9.3692 14.408 9.5485ZM17.0131 12.1536C17.7991 11.3151 18.4265 10.3259 18.8471 9.2337C18.905 9.0835 18.905 8.9165 18.8471 8.7663C17.5474 5.39172 14.2744 3 10.4453 3C9.65351 3 8.88551 3.10226 8.15382 3.29433L6.56386 1.70437C7.77072 1.24913 9.07881 1 10.4453 1C15.1288 1 19.1263 3.92668 20.7135 8.0474C20.9496 8.6604 20.9496 9.3396 20.7135 9.9526C20.1917 11.3074 19.4093 12.5331 18.4277 13.5682L17.0131 12.1536Z" fill="#454380" />
              </svg>
            }
          </button>
        </div>
        <Label>password</Label>
        {errors?.password && (
          <ErrorMessage>{errors?.password?.message || "Error"}</ErrorMessage>
        )}
      </div>

      <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[21px] flex relative">
        <img
          src={
            errors?.confirmPassword?.message
              ? redSvg
              : watch("confirmPassword")
              ? greenSvg
              : graySvg
          }
          alt=""
          className="ml-[19px] z-20"
        />
        <input
          placeholder="fdrgyu7_Trdg"
          type={confirmPasswordVisible ? 'text' : 'password'}
          className="my-[2px] pl-[13px] py-[5px] rounded-[11px] w-[352px] ml-[17px] text-[16px] font-semibold text-[#454380]"
          {...register("confirmPassword", {
            required: "This field must be filled in",
            validate: value =>
              value === watch("password") || "Password confirmation is invalid"
          })}
        />
        <div className='flex items-center justify-center'>
          <button type='button' className='ml-[5px] cursor-pointer' onClick={() => setConfirmPasswordVisible(value => !value)}>
            {confirmPasswordVisible
              ?
              <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0009 8C14.0009 9.6569 12.6578 11 11.0009 11C9.34415 11 8.00098 9.6569 8.00098 8C8.00098 6.3431 9.34415 5 11.0009 5C12.6578 5 14.0009 6.3431 14.0009 8Z" stroke="#454380" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.0012 1C6.52354 1 2.73326 3.94288 1.45898 8C2.73324 12.0571 6.52354 15 11.0012 15C15.4788 15 19.2691 12.0571 20.5434 8C19.2691 3.94291 15.4788 1 11.0012 1Z" stroke="#454380" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              :
              <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.44531 1L18.4453 17L2.44531 1Z" fill="#454380" />
                <path d="M2.44531 1L18.4453 17" stroke="#454380" stroke-width="2" stroke-linecap="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66839 2.63732C2.63743 3.89322 1.046 5.79137 0.17706 8.0474C-0.05902 8.6604 -0.05902 9.3396 0.17706 9.9526C1.7642 14.0733 5.76172 17 10.4453 17C12.8673 17 15.1059 16.2173 16.9226 14.8915L15.4873 13.4562C14.0486 14.4309 12.3131 15 10.4453 15C6.61615 15 3.34315 12.6083 2.04341 9.2337C1.98553 9.0835 1.98553 8.9165 2.04341 8.7663C2.81262 6.76914 4.27297 5.11625 6.13071 4.09964L4.66839 2.63732ZM7.92486 5.89379C7.02211 6.6272 6.44528 7.7462 6.44528 9C6.44528 11.2091 8.23614 13 10.4453 13C11.699 13 12.8181 12.4232 13.5515 11.5204L12.1219 10.0908C11.765 10.6382 11.1474 11 10.4453 11C9.34071 11 8.44528 10.1046 8.44528 9C8.44528 8.2979 8.80711 7.6802 9.35441 7.3234L7.92486 5.89379ZM14.408 9.5485L9.89681 5.03729C10.0761 5.0127 10.2592 5 10.4453 5C12.6544 5 14.4453 6.79086 14.4453 9C14.4453 9.1861 14.4326 9.3692 14.408 9.5485ZM17.0131 12.1536C17.7991 11.3151 18.4265 10.3259 18.8471 9.2337C18.905 9.0835 18.905 8.9165 18.8471 8.7663C17.5474 5.39172 14.2744 3 10.4453 3C9.65351 3 8.88551 3.10226 8.15382 3.29433L6.56386 1.70437C7.77072 1.24913 9.07881 1 10.4453 1C15.1288 1 19.1263 3.92668 20.7135 8.0474C20.9496 8.6604 20.9496 9.3396 20.7135 9.9526C20.1917 11.3074 19.4093 12.5331 18.4277 13.5682L17.0131 12.1536Z" fill="#454380" />
              </svg>
            }
          </button>
        </div>
        <Label>confirm password</Label>
        {errors?.confirmPassword && (
          <ErrorMessage>
            {errors?.confirmPassword?.message || "Error"}
          </ErrorMessage>
        )}
      </div>

      <div className="flex justify-center">
        <button
          className={`bg-[#E2E1FF] rounded-[11px] text-[22px] py-[5px] px-[30px] text-[#4D4AC8] font-semibold ${
            !isValid && "opacity-60"
          }`}
          disabled={!isValid}
        >
          create account
        </button>
      </div>

      <div className=" absolute top-[105px] left-[76px] w-[4px] h-[268px] bg-[#4D4AC8] z-10 "></div>
    </form>

  )
};
