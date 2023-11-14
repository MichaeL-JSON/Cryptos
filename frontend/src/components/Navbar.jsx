import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Modal from "./modal/Modal";
import frame from "/Frame.svg";
import el19 from "/Ellipse 19.svg";
import el21 from "/Ellipse 21.svg";
import el22 from "/Ellipse 22.svg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Converter", href: "/converter" },
  { name: "News", href: "/news" },
  { name: "About", href: "about" }
];

const Navbar = () => {
  const [modalActive, setModalActive] = useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <div className="w-10 h-10 block bg-white shadow-sm ">
            <svg
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#9089fc"
                strokeWidth="0.24000000000000005"
              >
                {" "}
                <path
                  d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"
                  fill="#ff006a"
                ></path>{" "}
              </g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"
                  fill="#ff006a"
                ></path>{" "}
              </g>
            </svg>
          </div>

          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => (
            <Link
              key={item.name}
              to={item.href}
              className="text-xl font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="#" className="text-xl font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
          <button
            onClick={() => setModalActive(true)}
            type="button"
            className="text-xl font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </button>
          <Modal active={modalActive} setActive={setModalActive}>
            <h1 className="text-[30px] font-semibold text-center text-[#4D4AC8] mb-[27px] mt-[16px]">
              Registration
            </h1>

            <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex">
              <img src={el19} alt="" className="ml-[19px] z-20" />
              <input
                type="text"
                placeholder="MIchael_JSON"
                className="m-[2px] pl-[13px] py-[5px] rounded-[8px] w-[382px] ml-[17px] text-[16px] font-semibold text-[#454380]"
              />
              <label className="absolute left-[103px] top-[72px] text-[#4D4AC8] text-[11px] font-bold">
                username
              </label>
            </div>

            <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex">
              <img src={el19} alt="" className="ml-[19px] z-20" />
              <input
                type="text"
                placeholder="example@mail.com"
                className="m-[2px] pl-[13px] py-[5px] rounded-[8px] w-[382px] ml-[17px] text-[16px] font-semibold text-[#454380]"
              />
              <label className="absolute left-[103px] top-[161px] text-[#4D4AC8] text-[11px] font-bold">
                email
              </label>
            </div>

            <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[50px] flex">
              <img src={el21} alt="" className="ml-[19px] z-20" />
              <input
                type="text"
                placeholder="XXXXXXX"
                className="my-[2px] pl-[13px] py-[5px] rounded-[11px] w-[352px] ml-[17px] text-[16px] font-semibold text-[#454380]"
              />
              <img
                src="../public/eye close.svg"
                alt=""
                className="ml-[3px]"
              />
              <label className="absolute left-[103px] top-[249px] text-[#4D4AC8] text-[11px] font-bold">
                password
              </label>
            </div>

            <div className="bg-[#E2E1FF] w-full rounded-[11px] mb-[21px] flex">
              <img src={el22} alt="" className="ml-[19px] z-20" />
              <input
                type="text"
                placeholder="fdrgyu7_Trdg"
                className="my-[2px] pl-[13px] py-[5px] rounded-[11px] w-[352px] ml-[17px] text-[16px] font-semibold text-[#454380]"
              />
              <img src="../public/eye.svg" alt="" className="ml-[3px]" />
              <label className="absolute left-[103px] top-[338px] text-[#4D4AC8] text-[11px] font-bold">
                confirm password
              </label>
            </div>

            <div className="flex justify-center">
              <button className="bg-[#E2E1FF] rounded-[11px] text-[22px] py-[5px] px-[30px] text-[#4D4AC8] font-semibold">
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
          </Modal>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
                {/* <button type="button">
                  Log in open
                </button> */}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
