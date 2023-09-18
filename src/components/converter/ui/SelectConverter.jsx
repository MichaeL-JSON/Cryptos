import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const dataList = [
  {
    id: 1,
    name: "BTC",
    avatar:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAADAFBMVEVHcEz/fwD2kxr/AAD2khr0dQD3kxr//wD/qgD2kxr2khr2khr1khr2khr6lhr1khr2khn6lRn4kxr1khb2khn3kxr3kBi/fwD3kxr4khn3kxn3kRjzkBf4khr/VQD6lRn6lhr7lxv6lRr9mBv4lRn2khn6lhrMmQD5lRn4kxr3kxr3kxn3kxn2khn3kxn5lBn4lBn3kxn3lBr4lBkAZwD6lhr1khj5lRr4lBn5kRj3lBn3kxr2khr3kxn4lBn3khn1kRqqVQD8lhr3kxr3kxr2kBr0jxr7lhr3khn7lhr4lBn5lRr3kxr1kRv7lRr2kxn5lBn3khrykRj2kRj3lBn4khr2khn6lxr4lBj5lBrykhn2khn3kxr//////v33lBz///73lR33lB33kxv/nRz3lR7/mRv//fv//fz/nhz//vz2jAr3jQz//v73khj3lBv/mxv3jhD3kRX3kxn3kBT4lBr7lRr3jAz3jQ7//Pn3kRb/nxz/mBv+lxv5lBr3jxH//fr3jg/2iwr2jQz4njH80p/3khf+mRv/nBz3kBP/+/f816v//Pj5lRv7lhv/+vX5s137zpb4liH3jAr5qEf806H6t2b/+/b81ab6t2f82K34nS/7zJH4oTj4nC33iwn7wn3/mxz6w3/937r2jAz96M75tWH7zpj97Nf958z2iQX82rH7yo33lR/4myv+8N/4mCT6lRr6u2/+6tP3jg7969T4ojn5sFf+7tr++PD6v3j4ozz+9u36uWr2igb+69T82rD6uWz+8+b2iwj+7tz6vXL5pD72jQ75slr4pUD+797/+PD5sFj3liD96dD94sL4nzT+79z95sv//Pr3jxD5tmP+8+X948P93LX3myr7yo/5rlL94sP4qUj94L34pUH5tF/7wn/+7dj7xYX81KP/+fL5qkr6uGn81qj2hQD97Nj///37x4n6xYT95cf3mSf96tL7zZb2hwD+8eH5q03/mhv5rlT6wHn3lyP95cj8z5r7yYz+9Oj4oTf3hwD83LSsdU1lAAAAXHRSTlMABP4B/gL7AQP9/Pv++vX89476GJDqFgT9KI4pLWIDbfz9/v532NMFQY/W1fhe912nqa3sAeeHhu0V97m6zo2oawO/xGthYMLH6++F/Bzq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"
  },
  {
    id: 2,
    name: "ETH",
    avatar:
      "data:image/png;base64,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"
  },
  {
    id: 3,
    name: "USDT",
    avatar:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABHVBMVEUAAAAA//8AqqoAgIAAmZkAmZkAlJQAmZkAkpIAlJQAk5MAlZUAlJQAk5MAlJQAkpIAk5MAkpIAk5MAk5MAkpIAk5MAk5MAk5MAlJQAkpIAk5MAk5MAlJQAk5MAkpJcurpjvb0Ak5NRtbU1qal8yMhxw8NQtbUyqKhyw8OEy8twwsI4qqospaUqpaWIzc2GzMxhvLwioaGP0NBivb0hoaEdn58cn58Ak5Of1tYeoKAZnp6i2NgTm5us3NwPmZkOmZkAk5O14ODC5eUIl5fB5eUAk5MAk5PZ7+/O6urT7OwAk5PV7e0DlJTZ7+8Ak5Pf8fEBk5MBk5Ph8vIAk5Pl9PTw+fnt9/cAk5MAk5MAk5P////+///8/v74/PwAk5OeN/pCAAAAWnRSTlMAAQMGCg8TFBwfLTA3QkpLTmBjb3V4e4KFjZecsrrDyMnJysrLy8vLzM3Nzc3Nzs7Pz9DQ0NLS09TU1NbX2dzc3N3j4+Tk6uvr7Ozu7/Dx8vT19vb3+vr6/f6Pd467AAABnUlEQVR42u1X11JCMRBFFERsWLAgitgrVuyKDXuvEGX//zMcJjBJbrIx5U3Zp8zePWdONjfJSSjUiD8XYBRlTzxAqy8B+OJhWIlPmhMoJUQB/Bis8NAv4cfsCEAjoEDQ2GBVN/gEzAigScD32RMA2kFTggSHL7sQcBJGkU5PUtjOrysBngSDrgQXWgHLK9f1qd+vz35qJMj5K3UL39QM7YHcLtHETKC4SxbwSCtP1sQebO3T8ZcsIZAhhMxhTZwghMgEbWLmXb8Kp2J1tNqEmKhggY3PMlO53HwmzzKLooIIXYZIYArkGTnOK4EpNNf/pDSXXK31+2X6gO2Qo/HbWvqcK02xzZDieb81y8j/T0l+Ow8IWvc+VODKklDUI55IvfKUn/KHFHm5eSd/7Q6eiQm7zdRhdK7jBIZXG0pgerliBOj13mJGEMYNRtiEwMKjKAlsXI6KwNcnmTitBxxeNPNqRQy/7ev2fP2ir+P09ayerrdk75tLPP7VxXl3MnzczbvH6/iYq/s/pvis+/shW8WnfV4gIwBDjXfYP4gf6wzIauusj1UAAAAASUVORK5CYII="
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SelectConverter = () => {
  const [selected, setSelected] = useState(dataList[1]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative w-[30%] flex items-center h-[50%]">
            <Listbox.Button className="relative cursor-pointer h-full w-full rounded-[1.3rem] bg-white pl-2 md:pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img
                  src={selected.avatar}
                  alt=""
                  className="w-3 h-3 sm:w-4 sm:h-4 md:h-5 md:w-5  flex-shrink-0 rounded-full"
                />
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
                      "relative cursor-pointer select-none py-0 sm:py-1 md:py-2 pl-2 md:pl-3 text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem]"
                    }
                    value={dataItem}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className={"flex items-center"}>
                          <img
                            src={dataItem.avatar}
                            alt=""
                            className="w-3 h-3 sm:w-4 sm:h-4 md:h-5 md:w-5 flex-shrink-0 rounded-full"
                          />
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
