import { Route, Routes } from "react-router-dom";
// pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import RequireAuth from "./pages/RequireAuth";
import Missing from "./pages/Missing";
//Layout
import Layout from './pages/Layout'
import Accounts from './pages/Accounts'
import Transfer from './pages/Transfer'
import Creditcard from './pages/creditcard'
import Paybill from './pages/paybill'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />

        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/Account/:id' element={<Accounts />} />
          <Route exact path='/Account/transfer/:id' element={<Transfer />} />
          <Route exact path='/creditcard/:id' element={<Creditcard />} />
          <Route exact path='creditcard/paybill/:id' element={<Paybill />} />S
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
