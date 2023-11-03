import NavContainer from '../containers/NavContainer'
import { NavLink } from 'react-router-dom'

export default function NavForNonAuthenticated() {
  return (
    <NavContainer
      logos={
        <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
          <div className='flex flex-shrink-0 items-center'>
            <img
              className='hidden h-8 w-auto sm:block'
              src='fdmb.png'
              alt='FDMBank'
            />
          </div>
        </div>
      }
      navItems={
        <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
          {/* Profile dropdown*/}
          <div className='hidden sm:block sm:relative sm:h-full sm:space-x-8'>
            <NavLink
              to='/registration'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'border-indigo-500 text-gray-900'
                    : 'text-gray-500 hover:border-gray-300 border-transparent hover:text-gray-700'
                }  inline-flex items-center font-medium  border-b-2 px-1 pt-1 h-full
                 `
              }
            >
              Register
            </NavLink>

            <NavLink
              to='/login'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'border-indigo-500 text-gray-900'
                    : 'text-gray-500 hover:border-gray-300 border-transparent hover:text-gray-700'
                }  inline-flex items-center font-medium  border-b-2 px-1 pt-1 h-full
                 `
              }
            >
              Login
            </NavLink>
          </div>
          <img
            className='block h-8 w-auto sm:hidden'
            src='fdmb.png'
            alt='FDMBank'
          />
        </div>
      }
      buttons={
        <div className='space-y-1 pt-2 pb-4'>
          {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
          <NavLink
            to='/registration'
            className={({ isActive }) =>
              `${
                isActive
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
            }
          >
            Register
          </NavLink>
          <NavLink
            to='/login'
            className={({ isActive }) =>
              `${
                isActive
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
            }
          >
            Login
          </NavLink>
        </div>
      }
    ></NavContainer>
  )
}
