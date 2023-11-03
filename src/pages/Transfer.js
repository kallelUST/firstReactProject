import { useState, useContext, useEffect} from 'react'
// import DataContext from '../context /DataContext.js'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
const Transfer = ({}) => {

  const [isTransferSuccess, setTransferSuccess] = useState(false)

  
  const { id } = useParams()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [otherAccounts, setOtherAccounts] = useState([])
  const [selctedToAccount, setSelectedToAccount] = useState()
  const [transferAmount, setTransferAmount] = useState(0)


  const accessToken = localStorage.getItem('accessToken')
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json' 
  };

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }


  const fetchUserAccounts = async () => {
    try {
      
      const response = await axios.get("http://localhost:8080/account", {headers})
     
      const entryWithCorrectAccountId = response.data.find(
        (entry) => entry.accountNumber == id
      )
      const others = response.data.filter(
        (entry) => 
          entry.accountNumber != id && entry.active
      )
      setOtherAccounts(others)
      setSelectedAccount(entryWithCorrectAccountId)
      setSelectedToAccount(others[0].accountNumber)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    
    fetchUserAccounts()
  },[])
  useEffect(() => {
    
    fetchUserAccounts()
  },[id, navigate, accessToken, isTransferSuccess])



  const handleTransfer = async (e) => {
    // Here, you can perform the transfer logic and update the state when it's successful
    // For this example, we're just simulating a successful transfer.
    e.preventDefault()

    try{
      const response = await axios.post(`http://localhost:8080/account/${id}/transfer`,
      JSON.stringify({
        transactionType:2,
        accountNumber: parseFloat(selctedToAccount),
        amount: parseFloat(transferAmount),
        description:`interaccount transfer from ${id} to ${selctedToAccount}`,
        currency:"SGD"
     }),
       {headers})

       setTransferSuccess(true)
     
    }
    catch(err){
      console.log(err)
    }
    
  }

  //post transfer from current account

  return (
    <>
      {isTransferSuccess ? (
        <div>
          <div>Transaction was successful</div>
          <br></br>
          <div>Transaction ID:</div>
          <div>Backend doesn't support this feature.</div>
          <br></br>
          <div>From Account:</div>
          <div>{selectedAccount==undefined ?"":selectedAccount.accountNumber}</div>
          <br></br>
          <div>To Account:</div>
          <div>{selctedToAccount}</div>
          <br></br>
          <div>Amount Transferred:</div>
          <div>${transferAmount}</div>
          <br></br>
          <div>New Balance:</div>
          <div>${selectedAccount.balance}</div>
          <br></br>

          <span className='sm:ml-3'>
           
              <button
                type='button'
                className='inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={(e)=> {
                  navigate(`/account/${id}`)
                }}
              >
                Back to Account
              </button>
           
          </span>

          <span class='sm:ml-3'>
           
              <button
                type='button'
                class='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover.bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={(e) => {setTransferSuccess(false)
                  setIsModalOpen(false)
                                setTransferAmount(0)
                                setSelectedToAccount(otherAccounts[0].accountNumber)}}
              >
               Make another transfer
              </button>
          </span>
        </div>
      ) : (
        <div className='Transfer'>
          <div className='Transfer'> Transfer page</div>
        {selectedAccount==undefined? 
          <p> Account {id} not found</p>:
        <>
          <div>
            <div>Account:</div>
            <p>{selectedAccount.accountNumber}</p>
            <br></br>
          </div>

          <div>
            <div>Account Balance:</div>
            <p>${selectedAccount.balance}</p>
            <br></br>
          </div>

          <form className='w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-state'
                >
                  Accounts
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-state'
                    disabled = {otherAccounts.length===0}
                    value = {selctedToAccount}
                    onChange={(e)=>  {console.log(e.target.value) 
                      setSelectedToAccount(e.target.value)}
                    }
                  >
                    {
                      otherAccounts.map(
                        entry => {
                          return (<option key={entry.accountId}> {entry.accountNumber} </option>)
                        }
                      )
                    }
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>

              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Transfer Amount
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  placeholder='$0.00'
                  type='number'
                  max={selectedAccount.balance}
                  min="0"
                  value={transferAmount}
                  onChange={(e) => {
                    setTransferAmount(e.target.value)}}
                />
              </div>
            </div>

            <div className='md:flex md:items-center '>
              <div className='md:w-2/3'>
                <Link to={`/account/${id}`}>
                  <button
                    className='shadow bg-gray-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mr-2 rounded'
                    type='button'
                  >
                    Back to Accounts
                  </button>
                </Link>

                <button
                  onClick={openModal}
                  className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                  type='button'
                  disabled={transferAmount<=0 || transferAmount > selectedAccount.balance}
                >
                  Transfer
                </button>
              </div>
            </div>
          </form>

          </>
      }
        

          {isModalOpen && (
            <div
              class='relative z-10'
              aria-labelledby='modal-title'
              role='dialog'
              aria-modal='true'
            >
              <div class='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

              <div class='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div class='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <div class='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                    <div class='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                      <div class='sm:flex sm:items-start'>
                        <div class='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                          <h3
                            class='text-base font-semibold leading-6 text-gray-900'
                            id='modal-title'
                          >
                            Complete Transfer?
                          </h3>
                          <div class='mt-2'>
                            <p class='text-sm text-gray-500'>
                              Would you like to transfer: ${transferAmount}
                            </p>
                            <p class='text-sm text-gray-500'>From account: {selectedAccount.accountNumber}</p>
                            <p class='text-sm text-gray-500'>To account: {selctedToAccount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                      <button
                        type='button'
                        class='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                        onClick={handleTransfer}
                      >
                        Transfer
                      </button>
                      <button
                        type='button'
                        class='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
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
      )}
    </>
  )
}

export default Transfer
