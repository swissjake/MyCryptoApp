import React from 'react'
import { useState } from 'react';
import CoinItem from '../coinItem/CoinItem';
import loader from '../../assets/loader.svg'

const CoinSearch = ({coins, loading}) => {
    const[search, setSearch] = useState('');
    // console.log(coins)
  return (
    <div className='rounded-div my-4 p-8 animate__animated animate__zoomInDown animate__delay-2s'>
        <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
            <h1 className='text-2xl font-bold my-2 '>Search Crypto</h1>
            <form action="">
                <input type="search" value={search} placeholder='Search coin here...' onChange={(e)=>setSearch(e.target.value)} className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"/>
            </form>
            </div>
           
            <table className='w-full border-collapse text-center'>
                <thead>
                    <tr className='border-b'>
                        <th></th>
                        <th className='px-4'>#</th>
                        <th className='text-left'>Coin</th>
                        <th></th>
                        <th>Price</th>
                        <th>24h</th>
                        <th className='hidden md:table-cell'>24h Volume</th>
                        <th className='hidden sm:table-cell'>Market</th>
                        <th>Last 7 days</th>
                    </tr>
                </thead>
                <tbody>
                    {coins && coins.filter((value)=>{
                        if(search ===''){
                            return value;
                        }else if(
                            value.name.toLowerCase().includes(search.toLowerCase())
                            
                        )
                        {
                            return value;
                        }
                       
                    }).map((coin) => (  
                        <CoinItem loading={loading} coin = {coin} key={coin.id}/>
                    ))}
                </tbody>
            </table>
   
    </div>
  )
}

export default CoinSearch