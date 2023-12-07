import React, { useState } from 'react';
import { Login } from './Login';
import { Registration } from './Registration';


export const Auth = () => {
  const [authValue, setAuthValue] = useState('Login')

  return (
    <>
      <h1 className="text-[20px] sm:text-[30px] font-semibold text-center text-[#4D4AC8] m-[5px_0px_10px] sm:m-[14px_0px_10px] md:m-[16px_0px_27px]">
        {authValue}
      </h1>

      {authValue === 'Login'
        ?
        <Login setAuthValue={setAuthValue}/>
        :
        <Registration setAuthValue={setAuthValue}/>
      }

    </>
  );
};