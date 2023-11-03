import { createContext, useState } from 'react'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState('')

  return (
    <DataContext.Provider
      value={{
        currentAccount,
        setcurrentAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataContext
