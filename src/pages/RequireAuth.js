import { useLocation, Navigate, Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
const RequireAuth = ({}) => {
  const location = useLocation()
  const { accessToken } = useAuth()
  console.log('requireAuth:', accessToken)
  //   return (accessToken ?
  //     <Outlet />
  //  :
  //  <Navigate to='/login' state={{ from: location }} replace />
  //   )

  return <Outlet />
}

export default RequireAuth
