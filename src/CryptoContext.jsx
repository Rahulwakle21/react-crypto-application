import React, { createContext, useEffect, useState } from 'react'


export const Crypto = createContext()

const CryptoContext = ({children}) => {

    const[currency,setCurrency] = useState("INR");
    const[symbol,setSymbol] = useState("rupee")

    useEffect(()=>{
        if(currency === "INR"){
            setSymbol("Rs.")
        }else if(currency === "USD"){
            setSymbol("💲")
        }
    },[currency])
  return (
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
            {children}
    </Crypto.Provider>
  )
}

export default CryptoContext
