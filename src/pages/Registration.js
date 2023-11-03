import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../services/baseURL";
import useAuth from "../hooks/useAuth";
const REGISTER_URL = "/api/auth/register";

const NAME_REGEX = /^[A-Z][a-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_NUMBER_REGEX = /^[1-9][0-9]{5,14}$/;
const PHONE_CODE_REGEX = /^[0-9]{1,3}$/;
const ID_REGEX = /(^[A-Z]{1,2}[0-9]{6}\([0-9A]\)$|^[STFG]\d{7}[A-Z]$)/;

const Registration = ({}) => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const firstNameRef = useRef();
  const errRef = useRef();

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [firstName, setFirstName] = useState('')
  const [validFirstName, setValidFirstName] = useState(false)
  const [firstNameFocus, setFirstNameFocus] = useState(false)
  const [lastName, setLastName] = useState('')
  const [validLastName, setValidLastName] = useState(false)
  const [lastNameFocus, setLastNameFocus] = useState(false)
  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)
  const [confirmPwd, setConfirmPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [code, setCode] = useState('')
  const [validCode, setValidCode] = useState(true)
  const [codeFocus, setCodeFocus] = useState(false)
  const [phone, setPhone] = useState('')
  const [validPhone, setValidPhone] = useState(false)
  const [phoneFocus, setPhoneFocus] = useState(false)
  const [IDNumber, setIDNumber] = useState('')
  const [validIDNumber, setValidIDNumber] = useState(false)
  const [IDNumberFocus, setIDNumberFocus] = useState(false)

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(firstName)

    setValidFirstName(result)
  }, [firstName])

  useEffect(() => {
    const result = NAME_REGEX.test(lastName)

    setValidLastName(result)
  }, [lastName])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)

    setValidPwd(result)
    setValidMatch(pwd === confirmPwd)
  }, [pwd, confirmPwd])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)

    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PHONE_CODE_REGEX.test(code)

    setValidCode(result)
  }, [code])

  useEffect(() => {
    const result = PHONE_NUMBER_REGEX.test(phone)

    setValidPhone(result)
  }, [phone])

  useEffect(() => {
    const result = ID_REGEX.test(IDNumber)

    setValidIDNumber(result)
  }, [IDNumber])

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, pwd, confirmPwd, email, code, phone, IDNumber]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log("kkkkk");
    try {
      //api call

      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          email,
          password: pwd,
          nationalId: IDNumber,
          phoneNumber: code + phone,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      const accessToken = response?.data?.accessToken

      setAccessToken(accessToken)

      setSuccess(true);
      setCode("");
      setPhone("");
      setIDNumber("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPwd("");
      setConfirmPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing inputs");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="" style={{ marginTop: 0 }}>
      {success ? (
        <section>
          <h1>success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
        </section>
      ) : (
        <section className="w-3/5  mx-auto my-20 mt-8 ">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="mb-1">Register User</h1>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
            onSubmit={handleRegistration}
          >
            <label htmlFor="firstName" className="">
              First name:
            </label>
            <input
              type="text"
              className="rounded w-"
              id="firstName"
              placeholder="First Name"
              ref={firstNameRef}
              autoComplete="off"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              aria-invalid={validFirstName ? "false" : "true"}
              aria-describedby="firstNameNote"
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
            />
            <p
              id="firstNameNote"
              className={
                firstNameFocus && firstName && !validFirstName
                  ? "instructions"
                  : "hidden"
              }
              style={{ color: "#e00016", marginTop: "5px" }}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Alphabetic characters starting with a capitalized one.
            </p>

            <label htmlFor="firstName" className="mt-2">
              Last name:
            </label>
            <input
              type="text"
              className="rounded"
              id="lastName"
              placeholder="Last Name"
              autoComplete="off"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              aria-invalid={validLastName ? "false" : "true"}
              aria-describedby="lastNameNote"
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
            />
            <p
              id="lastNameNote"
              className={
                lastNameFocus && lastName && !validLastName
                  ? "instructions"
                  : "hidden"
              }
              style={{ color: "#e00016", marginTop: "5px" }}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Alphabetic characters starting with a capitalized one.
            </p>

            <label htmlFor="firstName" className="mt-2">
              Password:
            </label>
            <input
              type="password"
              className="rounded"
              id="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "hidden"}
              style={{ marginTop: "5px" }}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="firstName" className="mt-2">
              Confirm Password:
            </label>
            <input
              type="password"
              className="rounded"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPwd(e.target.value)}
              value={confirmPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmpwdnote"
              onFocus={() => setConfirmPwdFocus(true)}
              onBlur={() => setConfirmPwdFocus(false)}
            />
            <p
              id="confirmpwdnote"
              className={
                confirmPwd && confirmPwdFocus && !validMatch
                  ? "instructions"
                  : "hidden"
              }
              style={{ color: "#e00016", marginTop: "5px" }}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Two passwords do not match.
            </p>

            <label htmlFor="firstName" className="mt-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="rounded"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={
                email && emailFocus && !validEmail ? "instructions" : "hidden"
              }
              style={{ color: "#e00016", marginTop: "5px" }}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Not an valid email.
            </p>

            <label htmlFor="firstName" className="mt-2">
              ID:
            </label>
            <input
              type="text"
              id="IDNumber"
              className="rounded"
              placeholder="ID Number"
              onChange={(e) => setIDNumber(e.target.value)}
              value={IDNumber}
              required
              aria-invalid={validIDNumber ? "false" : "true"}
              aria-describedby="idnumbernote"
              onFocus={() => setIDNumberFocus(true)}
              onBlur={() => setIDNumberFocus(false)}
            />
            <p
              id="idnumbernote"
              className={
                IDNumberFocus && !validIDNumber ? "instructions" : "hidden"
              }
              style={{ color: "#e00016", marginTop: "5px" }}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              We only accept HK(including parenthesis) and Singapore ID.
            </p>

            <div className="flex flex-col">
              <label htmlFor="countryCode" className="mt-2">
                Phone Number:
              </label>
              <div className="flex flex-row">
                <select
                  className="w-2/5 rounded mr-2"
                  id="countryCode"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const numericCode = selectedValue.match(/\d+/); // Extract numeric part
                    setCode(numericCode ? numericCode[0] : ""); // Set the extracted numeric code
                  }}
                  required
                  aria-invalid={validCode ? "false" : "true"}
                  aria-describedby="codenote"
                  onFocus={() => setCodeFocus(true)}
                  onBlur={() => setCodeFocus(false)}
                >
                  <option value="" disabled>
                    Select Country Code
                  </option>
                  <option value="+86">+86 (China)</option>
                  <option value="+33">+33 (France)</option>
                  <option value="+49">+49 (Germany)</option>
                  <option value="+852">+852 (Hong Kong)</option>
                  <option value="+81">+81 (Japan)</option>
                  <option value="+65">+65 (Singapore)</option>
                  <option value="+44">+44 (United Kingdom)</option>
                  <option value="+1">+1 (United States)</option>
                </select>

                <input
                  className="w-4/5 rounded"
                  type="text"
                  id="phone"
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                  aria-invalid={validPhone ? "false" : "true"}
                  aria-describedby="phonenote"
                  onFocus={() => setPhoneFocus(true)}
                  onBlur={() => setPhoneFocus(false)}
                  maxLength={12}
                />
              </div>
              <p
                id="codenote"
                className={`${
                  code && codeFocus && !validCode ? "instructions" : "hidden"
                }`}
                style={{ color: "#e00016", marginTop: "5px" }}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                Not a valid phone code.
              </p>
              <p
                id="phonenote"
                className={`${
                  phone && phoneFocus && !validPhone ? "instructions" : "hidden"
                }`}
                style={{ color: "#e00016", marginTop: "5px" }}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                Not a valid phone number.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRegistration}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-36 mx-auto mt-4"
              disabled={
                !validFirstName ||
                !validLastName ||
                !validCode ||
                !validPhone ||
                !validEmail ||
                !validPwd ||
                !validMatch ||
                !validIDNumber
              }
            >
              Sign up
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </section>
      )}
    </div>
  );
};

export default Registration;
