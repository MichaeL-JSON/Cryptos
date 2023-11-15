import React from 'react';
import { useForm } from 'react-hook-form'

import frame from "/Frame.svg";
import greenSvg from "/Ellipse 19.svg";
import redSvg from "/Ellipse 21.svg";
import graySvg from "/Ellipse 22.svg";

const ErrorMessage = ({ children }) => {
  return (
    <div className='absolute bottom-[-15px] left-[50px] text-[#cc2929d1] text-[11px] font-bold'>
      {children}
    </div>
  )
}

const Label = ({ children }) => {
  return (
    <label className="absolute left-[50px] top-[-15px] text-[#4D4AC8] text-[11px] font-bold">
      {children}
    </label>
  )
}

export const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur' })

  const handleSubmitForm = (data) => {
    if (isValid) {
      console.log(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <h1 className="text-[30px] font-semibold text-center text-[#4D4AC8] mb-[27px] mt-[16px]">
        Registration
      </h1>

      <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex relative">
        <img
          src={errors?.username?.message ? redSvg : (watch('username') ? greenSvg : graySvg)}
          alt=""
          className="ml-[19px] z-20"
        />
        <input
          placeholder="MIchael_JSON"
          className="m-[2px] pl-[13px] py-[5px] rounded-[8px] w-[382px] ml-[17px] text-[16px] font-semibold text-[#454380]"
          {...register("username", {
            required: 'This field must be filled in',
            minLength: {
              value: 4,
              message: 'Username must be at least 4 characters long'
            },
            maxLength: {
              value: 20,
              message: 'Username must not exceed 20 characters'
            }
          })}
        />
        <Label>username</Label>
        {errors?.username && <ErrorMessage>{errors?.username?.message || "Error"}</ErrorMessage>}
      </div>

      <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex relative">
        <img
          src={errors?.email?.message ? redSvg : (watch('email') ? greenSvg : graySvg)}
          alt=""
          className="ml-[19px] z-20"
        />
        <input
          placeholder="example@mail.com"
          className="m-[2px] pl-[13px] py-[5px] rounded-[8px] w-[382px] ml-[17px] text-[16px] font-semibold text-[#454380]"
          {...register("email", {
            required: 'This field must be filled in',
            pattern: {
              value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              message: 'email invalid'
            }
          })}
        />
        <Label>email</Label>
        {errors?.email && <ErrorMessage>{errors?.email?.message || "Error"}</ErrorMessage>}
      </div>

      <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex relative">
        <img
          src={errors?.password?.message ? redSvg : (watch('password') ? greenSvg : graySvg)}
          alt=""
          className="ml-[19px] z-20"
        />
        <input
          placeholder="XXXXXXX"
          className="my-[2px] pl-[13px] py-[5px] rounded-[11px] w-[352px] ml-[17px] text-[16px] font-semibold text-[#454380]"
          {...register("password", {
            required: 'This field must be filled in',
            minLength: {
              value: 8,
              message: 'Strong password'
            },
            maxLength: {
              value: 25,
              message: 'Password must not exceed 25 characters'
            }
          })}
        />
        <img
          src="../public/eye close.svg"
          alt=""
          className="ml-[3px]"
        />
        <Label>password</Label>
        {errors?.password && <ErrorMessage>{errors?.password?.message || "Error"}</ErrorMessage>}
      </div>

      <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[21px] flex relative">
        <img
          src={errors?.confirmPassword?.message ? redSvg : (watch('confirmPassword') ? greenSvg : graySvg)}
          alt=""
          className="ml-[19px] z-20"
        />
        <input
          placeholder="fdrgyu7_Trdg"
          className="my-[2px] pl-[13px] py-[5px] rounded-[11px] w-[352px] ml-[17px] text-[16px] font-semibold text-[#454380]"
          {...register("confirmPassword", {
            required: 'This field must be filled in',
            validate: value => value === watch('password') || 'Password confirmation is invalid'
          })}
        />
        <img src="../public/eye.svg" alt="" className="ml-[3px]" />
        <Label>confirm password</Label>
        {errors?.confirmPassword && <ErrorMessage>{errors?.confirmPassword?.message || "Error"}</ErrorMessage>}
      </div>

      <div className="flex justify-center">
        <button
          className={`bg-[#E2E1FF] rounded-[11px] text-[22px] py-[5px] px-[30px] text-[#4D4AC8] font-semibold ${!isValid && 'opacity-60'}`}
          disabled={!isValid}
        >
          create account
        </button>
      </div>

      <div className=" absolute top-[105px] left-[76px] w-[4px] h-[268px] bg-[#4D4AC8] z-10 "></div>

      <div className="flex items-center justify-center mt-[22px] mb-[28px] gap-[7px]">
        <div className="text-[#454380] text-[22px] font-semibold">
          already have an account ?
        </div>
        <img src={frame} alt="logo" />
        <div className="text-[#4D4AC8] text-[22px] font-bold">login</div>
      </div>
    </form>
  );
};