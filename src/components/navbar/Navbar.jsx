import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import ThemeToggle from '../themeToggle/ThemeToggle'
import { UserAuth } from '../../context/AuthContext'


const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }

    const {user, logout} = UserAuth()
    const navigate = useNavigate()

    const handleSignOut = async ()=>{
        try {
         await logout()
          navigate('/');
      }
      catch (error) {
          console.log(error.message)
          
        }
      }

  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold'>
        <Link to='/'>
            <h1 className='text-2xl leading-3'>MyWallet</h1>
        </Link>
        <div className='hidden md:block'>
            <ThemeToggle />
        </div>


            {user?.email ? 
            (
            <div>
            <Link className='p-4' to='/account'>
                Account
            </Link>
            <button onClick={handleSignOut} className=''>Sign out</button>
            </div> 
            )
            : 
            (
                <div className='hidden md:block'>
                <Link to='/signIn' className='p-4 hover:text-accent '>Sign In</Link>
                <Link to='/signUp'className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl '>Sign Up</Link> 
            </div>
            )}

        {/* Menu icon */}
        <div onClick={handleNav} className='block md:hidden cursor-pointer z-10'>
            {!nav ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}
        </div>

        {/* mobile menu */}
        <div className={
            nav ? 'md:hidden fixed left-0 top-20 flex flex-col justify-between items-center w-full h-[90%] bg-primary ease-in duration-300  z-10 overflow-hidden animate__animated animate__backInLeft'
             : 'fixed left-[-100%] top-20 flex flex-col justify-between items-center h-[90%] ease-in duration-300'}>
            <ul className='w-full p-4'>
                <li onClick={() => setNav(false)} className='border-b py-6'>
                    <Link to="/">Home</Link>
                </li>
                <li onClick={() => setNav(false)} className='border-b py-6'>
                    <Link to="account">Account</Link>
                </li>
                <li className='border-b py-6'>
                    <ThemeToggle />
                </li>
            </ul>
            <div className='flex flex-col w-full p-4'>
                <Link onClick={() => setNav(false)} to="/signIn"><button className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'>Sign In</button></Link>
                <Link onClick={() => setNav(false)} to="/signUp"><button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign Up</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar