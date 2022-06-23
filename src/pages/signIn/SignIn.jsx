import React, {useState} from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import {signIn, UserAuth } from '../../context/AuthContext'


const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password:''
  })
  const [error, setError] = useState('')

 const {signIn} = UserAuth()
  const navigate = useNavigate()


  const handleForm = (e)=>{
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e)=> {
    e.preventDefault()
    setError('')
    try {
      await signIn(form.email,form.password)
      navigate('/account');
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    }
    
}



  return (
    <div className='rounded-div my-8 py-8 animate__animated animate__backInRight'>
        <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-12'>
            <h1 className='text-2xl font-bold'>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className='my-4'>
                  
                  <label>Email</label>
                <div className=' w-full my-2 relative rounded-2xl shadow-xl'>
                  <input className='w-full  p-2 bg-primary border border-input rounded-2xl' name='email' type="email" onChange={handleForm}/>
                  <AiOutlineMail className='absolute right-2 top-3 text-gray-400' size={20} />
                </div>
                {error && <p className='text-xs text-red-500 mt-1'>Wrong email/password</p>}
                </div>
                    <label>Password</label>
                <div className=' w-full my-2 relative rounded-2xl shadow-xl'>
                    <div >
                      <input className='w-full  p-2 bg-primary border border-input rounded-2xl' name='password' type="Password" onChange={handleForm} />
                      <AiFillLock size={20} className='absolute right-2 top-3 text-gray-400' />
                    </div>
                </div>
                <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign In</button>
            </form>
            <p className='my-4'>Don't have an account? <Link className='text-accent' to='/signUp'>Sign Up</Link></p>
        </div>
    </div>
  )
}

export default SignIn