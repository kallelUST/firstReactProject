import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { Link } from 'react-router-dom'

const cardList = [{ number: '123-456789-113', name: 'savings', balance: 1000 }]

export default function CreditCardTable() {
  const [accountArr, setAccountArr] = useState([])
  const [user, setUser] = useState([])
  const { accessToken } = useAuth()
  const [numOfActiveCards, setNumOfActiveCards] = useState(0)

  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false)
  const [createdCreditCard, setCreatedCreditCard] = useState(false)

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }


  const handleCreateCreditCard = async(e) =>{
    e.preventDefault()
    try{
      const response = await axios.get("http://localhost:8080/creditcard/createcreditcard", {
        headers,
      });
      setCreatedCreditCard(!createdCreditCard)
      
    }
    catch(err){
      if(err.response.status === 403){
       
      }
      else{
        console.log(err)
      }
    }
    finally{
      setIsCreditCardModalOpen(false)
    }
  }

  const fetchAccount = async () => {
    try {
      const accountResponse = await axios.get(
        'http://localhost:8080/creditcard',
        {
          headers,
        }
      )
      const tempArr = []
      let activateAccCounter = 0
      for (let i = 0; i < accountResponse.data.length; i++) {
        
        
        const { creditCardId, creditCardNumber, balance, active, user } =
          accountResponse.data[i];
        if (accountResponse.data[i].active) {
          activateAccCounter++;
        }

        if (i === 0) {
          const { firstName, lastName, phoneNumber, nationalId, email } = user
          setUser({ firstName, lastName, phoneNumber, nationalId, email })
        }
        tempArr.push({ creditCardId, creditCardNumber, balance, active});
       
        setNumOfActiveCards(activateAccCounter)
      }

      setAccountArr([...tempArr])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  useEffect(() => {
    fetchAccount()
  }, [createdCreditCard])

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <p className='mt-2 text-sm text-gray-700'>
              this is the list of all your credit cards details
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
            <button
              type='button'
              onClick={() => {
                setIsCreditCardModalOpen(true)
              }}
              className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
            >
              Request new credit card
            </button>
          </div>
        </div>

      </div>
      <div className="mt-8 flex flex-col">
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
                      Account Number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Card Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {accountArr.map((card) => (
                    <tr key={card. creditCardNumber}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <Link to= {`/creditcard/${card.creditCardNumber}`} >
                        {card.creditCardNumber}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {card.active?"active":"deactivated"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {card.balance + " HKD"}
                      </td>
                    </tr>))}
                </tbody>
                  {/*
                  // <tbody className='divide-y divide-gray-200 bg-white'>
                  //   => (
                  //     <tr key={card.number}>
                  //       <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                  //         {card.number}
                  //       </td>
                  //       <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                  //         {card.name}
                  //       </td>
                  //       <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                  //         {card.balance + ' HKD'}
                  //       </td>
                  //     </tr>
                  //   ))}
                  // </tbody> */}
                </table>
              </div>
            </div>
          </div>
        </div>
     

      {isCreditCardModalOpen && (
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
                        {numOfActiveCards >= 3
                          ? 'You cannot have more than three credit cards!'
                          : 'Add new credit card'}
                      </h3>
                      <div
                        class={
                          (numOfActiveCards >= 3 ? 'hidden ' : '') + 'mt-2'
                        }
                      >
                        <p class='text-sm text-gray-500'>
                          {
                            'A new credit card will be issued. You cannot have more than three credit cards.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type='button'
                    onClick={(e) => {
                      numOfActiveCards >= 3
                        ? setIsCreditCardModalOpen(false)
                        : handleCreateCreditCard(e)
                    }}
                    class='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                  >
                    {numOfActiveCards >= 3 ? 'Close' : 'Add'}
                  </button>
                  <button
                    type='button'
                    class={
                      (numOfActiveCards >= 3 ? 'hidden ' : ' ') +
                      'mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                    }
                    onClick={() => {
                      setIsCreditCardModalOpen(false)
                    }}
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
  )
}
