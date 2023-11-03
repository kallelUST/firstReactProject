import { useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import baseURL from '../services/baseURL'
import useAuth from '../hooks/useAuth'

const LOGIN_URL = 'http://localhost:8080/api/auth/authenticate'

const Login = () => {
  const { setAccessToken } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const emailRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')


    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            console.log( JSON.stringify({ email, password:pwd }))
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const accessToken1 = response?.data?.accessToken;
            
            {/* localStorage.setItem("accessToken", accessToken) */}
            setAccessToken(accessToken1)
            setEmail('');
            setPwd('');
            navigate(from, { replace: true }); 
  
        }catch(err){
            if(!err?.response){
                setErrMsg("No server Response")
            }
            else if(err.response?.status === 400){
                setErrMsg('Missing Username or password');
           }else if(err.response?.status === 401){
            setErrMsg('Unauthorized');
            }
           else{
            setErrMsg('Login Failed');
           }
           errRef.current.focus();
        }

  }
  return (
    <section className='w-3/5  mx-auto my-20'>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'
        onSubmit={handleSubmit}
      >
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          className='rounded'
          ref={emailRef}
          autoComplete='off'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor='password' className='mt-4'>
          Password:
        </label>
        <input
          type='password'
          id='password'
          className='rounded'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button
          type='button'
          onClick={handleSubmit}
          className='inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-36 mx-auto mt-4'
        >
          Login
        </button>
      </form>
      <p>
        Do not have an account yet?{' '}
        <Link to='/registration' className='text-blue-500 hover:underline'>
          Register here
        </Link>
        {/* this is an updated version */}
      </p>
    </section>
  )
}

export default Login
