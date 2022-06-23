import React, {useState, useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {doc, onSnapshot, updateDoc,} from 'firebase/firestore'
import { db } from '../../firebase-config'
import { UserAuth } from '../../context/AuthContext'

const SavedCoin = () => {
    const[coins, setCoins] = useState([])
    const {user} = UserAuth()

    useEffect(() => {
      onSnapshot(doc(db, 'users', `${user.email}`),(doc) => {
          setCoins(doc.data()?.watchList)
      })
    }, [user.email])

    const coinPath = doc(db, 'users', `${user?.email}`)

    const handleDelete = async(id) => {
        try{
            const result = coins.filter((item) => item.id !== id)
            await updateDoc(coinPath, {
                watchList: result
            })
        }catch (e){
            console.log(e.message)
        }
    }
    
  return (
    <div className='rounded-div my-8 py-8'>
       {coins && coins.length === 0 ? (<p>You dont have any coins saved. Please save a coin to add it to your watch list.<Link className='text-accent' to="/">Click here to search for coins now</Link></p>)
       : 
       (
            <table className='w-full border-collapse text-center'>
                <thead className=''>
                    <tr className='border-b'>
                        <th className='px-4'>Rank #</th>
                        <th className='text-left'>Coin </th>
                        <th className='text-left'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {coins && coins.map((coin)=> (
                        <tr key={coin.id} className="h-[60px] overflow-hidden">
                            <td>{coin?.rank}</td>
                            <td>
                                <Link to={`/coin/${coin.id}`}>
                                    <div className='flex items-center'>
                                        <img className='w-8 mr-4' src={coin?.image} alt="/" />
                                        <div>
                                            <p className='hidden sm:table-cell'>{coin?.name}</p>
                                            <p className='text-gray-500 text-left text-sm'>{coin?.symbol.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td onClick={() => handleDelete(coin.id)} className='pl-8'>
                                <AiOutlineClose className='cursor-pointer'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
       )}
    </div>
  )
}

export default SavedCoin