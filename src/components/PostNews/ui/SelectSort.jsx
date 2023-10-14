import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectSort = ({ dataList, onChange }) => {
  const [selected, setSelected] = useState(dataList[0]);

  const onChangeSelect = value => {
    onChange(value);
    setSelected(value);
  };

  return (
    <Listbox value={selected} onChange={onChangeSelect}>
      {({ open }) => (
        <>
          <div className="relative w-full flex items-center h-[60%]">
            <Listbox.Button className="relative cursor-pointer h-full w-full rounded-[1.3rem] bg-white pl-2 md:pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-2 block text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] text-gray-600">
                  {selected.name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon
                  className={
                    "hidden md:block h-5 w-5 text-gray-400 cursor-pointer mt-[0.13rem] transition-all " +
                    (open ? "rotate-[180deg]" : "")
                  }
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 top-[100%] max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {dataList.map(dataItem => (
                  <Listbox.Option
                    key={dataItem.id}
                    className={
                      "relative cursor-pointer select-none py-0 sm:py-1 md:py-2  md: text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem]"
                    }
                    value={dataItem}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className={"flex items-center"}>
                          <span
                            className={classNames(
                              selected
                                ? "font-semibold text-indigo-600"
                                : "font-normal",
                              active ? " text-yellow-600" : "",
                              "ml-1 md:ml-3 block transition-all"
                            )}
                          >
                            {dataItem.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectSort;
