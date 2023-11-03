import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import NavContainer from "../containers/NavContainer";
import useAuth from "../hooks/useAuth";
import baseURL from "../services/baseURL";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavAuthenticated() {
  const { accessToken, setAccessToken } = useAuth();
  const handleLogout = async (e) => {
    console.log("token cleared");
    setAccessToken("");
    console.log("token:", localStorage.getItem("accessToken"));
  };

  const handleSettings = async (e) => {};
  return (
    <NavContainer
      logos={
        <div>
          <img className="block h-8 w-auto lg:hidden" src="p" alt="FDMBank" />
          <img
            className="hidden h-8 w-auto lg:block"
            src="fdmb.png"
            alt="FDMBank"
          />
        </div>
      }
      navItems={
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-indigo-500 text-gray-900"
                  : "text-gray-500 hover:border-gray-300 border-transparent hover:text-gray-700"
              }  inline-flex items-center font-medium  border-b-2 px-1 pt-1
                 `
            }
          >
            Dashboard
          </NavLink>
          {/* "inline-flex items-center border-b-2
             border-indigo-500 px-1 pt-1 text-sm font-medium
             text-gray-900" */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-indigo-500 text-gray-900"
                  : "text-gray-500 hover:border-gray-300 border-transparent hover:text-gray-700"
              }  inline-flex items-center font-medium  border-b-2 px-1 pt-1
               `
            }
          >
            Accounts
          </NavLink>
        </div>
      }
      menuItems={
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {/* Profile dropdown*/}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1586374579358-9d19d632b6df?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Your Profile
                    </NavLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Settings
                    </NavLink>
                  )}
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                  {({ active }) => (
                    <NavLink
                      to="/login"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Sign out
                    </NavLink>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      }
      buttons={
        <div className="space-y-1 pt-2 pb-4">
          {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
            }
          >
            Accounts
          </NavLink>
        </div>
      }
    ></NavContainer>
  );
}
