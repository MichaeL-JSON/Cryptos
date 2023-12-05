import React, { useState } from 'react';
import frame from "/Frame.svg";
import { Login } from './Login';
import { Registration } from './Registration';


export const Auth = () => {
  const [authValue, setAuthValue] = useState('Login')

  return (
    <>
      <h1 className="text-[30px] font-semibold text-center text-[#4D4AC8] mb-[27px] mt-[16px]">
        {authValue}
      </h1>

      {authValue === 'Login'
        ?
        <Login />
        :
        <Registration />
      }

      <div>
        <div className="flex items-center justify-center mt-[22px] mb-[28px] gap-[7px]">
          <div className="text-[#454380] text-[22px] font-semibold">
            {authValue === 'Login' ? "don't have an account" : "already have an account"}?
          </div>
          <img src={frame} alt="logo" />
          <button className="text-[#4D4AC8] text-[22px] font-bold" onClick={() => setAuthValue(value => {
            return value === 'Login' ? "Registration" : "Login"
          })}>
            {authValue === 'Login' ? "registration" : "login"}
          </button>
        </div>
      </div>
    </>
  );
};