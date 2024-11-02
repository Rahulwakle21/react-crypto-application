import './App.css'
import Header from './component/Header'
import HomePage from './pages/HomePage'
import Coin from './pages/Coin'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CryptoContext from './CryptoContext'

function App() {

 

  return (
    <>
     <BrowserRouter>
     <CryptoContext>

      <div style={{backgroundColor:"#14161a",color:"white",minHeight:'100vh'}}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/coins/:id' element={<Coin/>}/>
        </Routes>
      </div>
     </CryptoContext>
     </BrowserRouter>
    </>
  )
}

export default App
