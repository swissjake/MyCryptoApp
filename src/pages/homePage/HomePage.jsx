import React from 'react'
import CoinSearch from '../../components/coinSearch/CoinSearch'
import TrendingCoins from '../../components/trendingCoins/TrendingCoins'

const HomePage = ({coins}) => {
  return (
    <div>
        <CoinSearch coins={coins}/>
        <TrendingCoins />
    </div>
  )
}

export default HomePage