import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import axios from "axios";

const Accounts = () => {
  const cardList = [];
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deactivatedAccount, setDeactivatedAccount] = useState(false);
  // const { currentAccount, setcurrentAccount } = useContext(DataContext);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);
  const [accountTransactionArr, setAccountTransactionArr] = useState([]);

  // const accessToken = localStorage.getItem('accessToken')
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const dateFormatter = (datetime) => {
    const dateObj = new Date(datetime);

    // Get the date components
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Months are zero-based
    const day = dateObj.getDate();

    // Get the time components
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchAccountTransactions = async () => {
    try {
      const transactionsResponse = await axios.get(
        `http://localhost:8080/account/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const transactionArr = [];

      if (transactionsResponse.data.length) {
        for (let i = 0; i < transactionsResponse.data.length; i++) {
          const transactionObject = {
            id: transactionsResponse.data[i].transactionId,
            date: dateFormatter(transactionsResponse.data[i].dateTime),
            from: transactionsResponse.data[i].fromAccountNumber,
            to: transactionsResponse.data[i].toAccountNumber,
            type: transactionsResponse.data[i].transactionType,
            amount: transactionsResponse.data[i].amount,
            currency: transactionsResponse.data[i].currency,
          };
          transactionArr.push(transactionObject);
        }
      }
      console.log(transactionArr);
      setAccountTransactionArr([...transactionArr]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeactivateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/account/${id}/deactivate`,
        {
          headers,
        }
      );

      setDeactivatedAccount(!deactivatedAccount);
    } catch (err) {
      if (err.response.status === 400) {
        console.log("account is already deactivated");
      } else {
        console.log(err);
      }
    } finally {
      closeModal();
      navigate("/dashboard");
    }
  };

  const setSelectedAccountData = (account) => {
    setSelectedAccount(account);
  };

  //set account state
  // useEffect(() => {
  //   localStorage.setItem("currentAccount", id);
  //   setcurrentAccount(id);
  // }, [id, setcurrentAccount]);

  // Function to get user accounts
  const fetchUserAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/account", {
        headers,
      });
      const entryWithCorrectAccountId = response.data.find(
        (entry) => entry.accountNumber == id
      );
      setSelectedAccountData(entryWithCorrectAccountId);
    } catch (err) {
      console.log(err);
    }
  };

  const mockdata = {
    accountNumber: "123-456-789",
    accountType: "Savings Account",
    balance: "9999",
  };

  useEffect(() => {
    fetchAccountTransactions();
  }, []);

  useEffect(() => {
    fetchUserAccounts();
  }, [id, navigate, accessToken, deactivatedAccount]);

  // Get all transactions for the account

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2
              className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
              style={{ color: "#3f3f3f", fontSize: "24px" }}
            >
              Savings Accounts
            </h2>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="sm:ml-3">
              <Link to={`/account/transfer/${id}`}>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg
                    className="-ml-0.5 mr-1.5 h-5 w-5 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Transfer Money
                </button>
              </Link>
            </span>

            <span className="sm:ml-3">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <svg
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                Close Account
              </button>
            </span>
          </div>
        </div>
      </div>

      <div
        className="bg-white shadow-2xl rounded pb-8 pt-6 mx-6"
        style={{ marginTop: "20px" }}
      >
        {selectedAccount ? (
          <div className="flex justify-center px-4 sm:px-6 lg:px-8">
            <div
              className="grid grid-cols-3 gap-28"
              style={{ color: "#3f3f3f" }}
            >
              <div>
                Account:{" "}
                <b style={{ fontSize: "15px" }}>
                  {selectedAccount.accountNumber}
                </b>
              </div>
              <div>
                Type:{" "}
                <b style={{ fontSize: "15px" }}>
                  {selectedAccount.accountType}
                </b>
              </div>
              <div>
                Balance:{" "}
                <b style={{ fontSize: "15px" }}>${selectedAccount.balance}</b>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>No data available for the selected account.</p>
          </div>
        )}

        <div className="px-4 sm:px-6 lg:px-8 " style={{ marginTop: "20px" }}>
          <div className="mt-0 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Transaction
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          From
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          To
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {accountTransactionArr.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-4 px-3 text-sm font-medium text-gray-900 text-center"
                          >
                            No transactions made
                          </td>
                        </tr>
                      ) : (
                        accountTransactionArr.map((trx, index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {trx.date}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {trx.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {trx.from}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {trx.to}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {trx.amount + " " + trx.currency}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        class="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        class="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Deactivate account
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleDeactivateAccount}
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
