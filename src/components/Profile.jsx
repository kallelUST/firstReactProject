import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function Profile() {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PHONE_NUMBER_REGEX = /^[1-9][0-9]{5,14}$/;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    console.log("token cleared");
    setAccessToken("");
    console.log("token:", localStorage.getItem("accessToken"));
    navigate("/login");
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const submitChange = async (event) => {
    event.preventDefault();
    const updatedUser = {
      email: null,
      phoneNumber: null,
      password: null,
      newPassword: null,
    };

    updatedUser.email = email ? email : null;
    updatedUser.phoneNumber = phoneNumber ? phoneNumber : null;
    updatedUser.password = oldPassword ? oldPassword : null;
    updatedUser.newPassword = newPassword ? newPassword : null;

    console.log(accessToken);

    try {
      await axios.post(
        "http://localhost:8080/api/user/update",
        JSON.stringify(updatedUser),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      handleLogout();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userDetailResponse = await axios.get(
        "http://localhost:8080/api/user/details",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { firstName, lastName, username, nationalId, phoneNumber } =
        userDetailResponse.data;
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(username);
      setIdNumber(nationalId);
      setPhoneNumber(phoneNumber);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const showError = email.length > 0 && email.length < 8;
  const checkPassword = newPassword !== confirmPassword;

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 sm:ml-6">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-2">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              You can update some of the data here.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                First name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                {/* block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm */}
                <input
                  disabled
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={firstName}
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm  disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Last name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  disabled
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  value={lastName}
                  className="block w-full max-w-lg rounded-md  disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="id-number"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                ID Number
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  disabled
                  type="text"
                  name="id-number"
                  id="id-number"
                  value={idNumber}
                  autoComplete="family-name"
                  className="block w-full max-w-lg rounded-md  disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Email
              </label>
              {/* change the border for div red if error and grey if not
                  change the border for input to red when focused,
                  chamge the text color for input when focused 
                  dislay error message bel
              */}
              <div className="mt-1 sm:col-span-2 sm:mt-0 sm:max-w-xs sm:text-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`block w-full max-w-lg rounded-md shadow-sm sm:text-sm ${
                    !EMAIL_REGEX.test(email)
                      ? "border-red text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
                      : "border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 "
                  } `}
                />
              </div>
              {!EMAIL_REGEX.test(email) && (
                <p
                  className="inline w-fit mt-2 text-sm text-red-600"
                  id="email-error"
                >
                  invalid email format
                </p>
              )}
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Phone Number
              </label>
              <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>HK</option>
                    <option>SG</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  className="block w-full max-w-lg rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  placeholder="+(852) 987-6543"
                />
              </div>
              {phoneNumber.length > 0 &&
                !PHONE_NUMBER_REGEX.test(phoneNumber) && (
                  <p
                    className="inline w-fit mt-2 text-sm text-red-600"
                    id="email-error"
                  >
                    Invalid Phone Number{" "}
                  </p>
                )}
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Current Password
                </label>
              </div>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleOldPasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 sm:max-w-xs sm:text-sm  "
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  New Password
                </label>
              </div>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  onChange={handlePasswordChange}
                  value={newPassword}
                  id="new-password"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6
                  sm:max-w-xs sm:text-sm
                  "
                />
              </div>
              {newPassword.length > 0 && !PWD_REGEX.test(newPassword) && (
                <p
                  className="inline w-fit mt-2 text-sm text-red-600"
                  id="email-error"
                >
                  password between 8-24 char.1 uppercase, 1 lowercase, 1 number,
                  1 special char
                </p>
              )}
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <div className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:max-w-xs sm:text-sm"
                />
              </div>
              {checkPassword && (
                <p
                  className="mt-2 overflow-visible text-sm text-red-600"
                  id="confirmation-password-error"
                >
                  Your password and confirm password does not match
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={submitChange}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
