import React from 'react';
import './App.css';
import HomePage from './pages/homePage/HomePage'
import Account from './pages/account/Account'
import CoinPage from './pages/coinPage/CoinPage'
import SignIn from './pages/signIn/SignIn'
import SignUp from './pages/signUp/SignUp'
import {ThemeProvider} from './context/ThemeContext'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Footer from './components/footer/Footer';

function App() {
  const [coins, setCoins] = useState([])



  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true'

  useEffect(() => {
   axios.get(url).then((response)=> {
     const data = response.data;
     setCoins(data)
   })
  }, [url])

  
  


  

  return (
    <ThemeProvider>
       <Navbar />
        <Routes>
         
            <Route path='/' element={<HomePage coins={coins} />}/>
            <Route path='/account' element={<Account />}/>
            <Route path='/signIn' element={<SignIn />}/>
            <Route path='/signUp' element={<SignUp />}/>
            <Route path="/coin/:coinId" element={<CoinPage />}>
                <Route path=":coinId" />
            </Route>
        </Routes>
        <Footer />
    </ThemeProvider>
  );
}

export default App;
