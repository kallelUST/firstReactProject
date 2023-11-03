// ParentComponent.jsx
import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavContainer = ({ logos, navItems, menuItems, buttons }) => {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              {/* this is included */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* need to be changed here  */}
                  {logos}
                </div>
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                {/* Change need to be made here */}
                {menuItems && navItems}
              </div>
              {!menuItems && navItems}
              {/* below is the profile dropdown. */}
              {/* it is conditional because it must not be visible befpre registration/login */}
              {menuItems && menuItems}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {/* change this data according to nav */}
            {buttons}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavContainer;
