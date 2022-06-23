import React, {useState, useEffect} from 'react';
import { lazy, Suspense } from 'react';
import './App.css';
import {ThemeProvider} from './context/ThemeContext'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import axios from 'axios';
import Footer from './components/footer/Footer';
import loader2 from './assets/loader2.svg'
const HomePage = lazy(() =>import('./pages/homePage/HomePage'))
const Account = lazy(() =>import( './pages/account/Account'))
const CoinPage = lazy(() =>import ('./pages/coinPage/CoinPage'))
const Signin = lazy(() => import ('./pages/signIn/SignIn'))
const SignUp = lazy(() => import ('./pages/signUp/SignUp'))

function App() {
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true'

  useEffect(() => {
   setTimeout(()=>{
    axios.get(url).then((response)=> {
      const data = response.data;
      setCoins(data)
    })
   }, 2000)
  }, [url])

  
  


  

  return (
    <div className=''>
    <Suspense fallback = {<div className='fixed h-full w-full transition duration-300 ease-linear flex'><img src={loader2} className='m-auto' alt="/"/></div>}>
    <ThemeProvider>
      
       <Navbar />
      
        <Routes>
         
            <Route path='/' element={<HomePage coins={coins} />}/>
           <Route path='/account' element={<Account />}/>
            <Route path='/signIn' element={<Signin />}/>
            <Route path='/signUp' element={<SignUp />}/>
            <Route path="/coin/:coinId" element={<CoinPage />}>
                <Route path=":coinId" />
            </Route>
        </Routes>
        <Footer />
       
    </ThemeProvider>
    </Suspense>
    </div>
  );
}

export default App;
