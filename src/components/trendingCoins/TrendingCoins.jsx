import React,{useState, useEffect} from 'react'
import axios from 'axios'

const TrendingCoins = () => {
    const[trendingCoins, setTrendingCoins] = useState([])
    const[loading, setLoading] = useState(true)

    const trendingUrl = 'https://api.coingecko.com/api/v3/search/trending'

    useEffect(() => {
        setTimeout(()=> {
            axios.get(trendingUrl).then((response) => {
                const data = response.data.coins
            //   console.log(data)
              setTrendingCoins(data)
              setLoading(false)
            })
        }, 3000)
        }, [trendingUrl])

       
       

    return (
    <div className=' rounded-div my-12 p-8 text-primary'>
        <h1 className='text-2xl font-bold py-4'>Trending Coins</h1>
        {loading && <h1>Loading.......</h1>}
       <div className='grid md:grid-cols-2 ld:grid-cols-3 gap-4'>
            {trendingCoins && trendingCoins.map((coin) => (
                <div key={coin.item.coin_id} className='rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300 '>
                    <div className='flex w-full items-center justify-between'>
                        <div className='flex'>
                            <img className="mr-4 rounded-full" src={coin.item.small} alt={coin.item.coin_id} />
                            <div>
                                <p className='font-bold'>{coin.item.name}</p>
                                <p>{coin.item.symbol}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img className="w-4" src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579' alt="bitcoin_image" />
                            <p>{coin.item.price_btc.toFixed(7)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TrendingCoins