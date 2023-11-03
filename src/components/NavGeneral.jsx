import NavAuthenticated from './NavAuthenticated'
import NavForNonAuthenticated from './NavForNonAuthenticated'
import useAuth from '../hooks/useAuth'
// localStorage.getItem("accessToken")

export default function NavGeneral() {
  const { accessToken } = useAuth()
  return accessToken ? <NavAuthenticated /> : <NavForNonAuthenticated />
}
