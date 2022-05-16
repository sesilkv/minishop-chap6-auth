import axios from 'axios'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import userSlice from '../Store/user'

const Register = () => {

    const {register, handleSubmit, formState} = useForm()
    const [regStatus, setRegStatus] = useState({
        success: false,
        message: ''
    })
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const formSubmitHandler = (data) => {
        const postData = {
            email: data.user_email,
            password: data.user_password,
            firstname: data.user_firstname,
            lastname: data.user_lastname,
            isAdmin: false
        }
        axios.post('http://localhost:4000/register', postData)
        .then(res => {
            //memastikan accessToken ada
            if (typeof res.data.accessToken !== 'undefined'){
                // menyimpan token di localStorage
                localStorage.setItem('minishopAccessToken', res.data.accessToken)
                // menyimpan user di redux store
                const user = jwtDecode(res.data.accessToken)
                axios.get(`http://localhost:4000/users/${user.sub}`)
                .then( res => {
                    dispatch( userSlice.actions.addUser({userData: res.data}))
                    Navigate('/')
                })
            }
        })
        .catch(err => {
            setRegStatus({
                success: false,
                message: 'Sorry, something is wrong. Try again later.'
            })
        })
    }

  return (
    <section>
            <div className="container py-8">
                <div className="max-w-[500px] mx-auto">
                    { (!regStatus.success && regStatus.message) && <p className='text-sm text-red-500 italic'>{regStatus.message}</p> }
                    <form onSubmit={ handleSubmit(formSubmitHandler) }>
                        <div className="mb-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_email', {required: true})} autoComplete="true" />
                            <p className="text-sm text-red-500 italic">{formState.errors.user_email?.type === 'required' && "Email is required"}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="user_password">Password</label>
                            <input type="password" name="user_password" id="user_password" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_password',  {required: true})} autoComplete="true" />
                            <p className="text-sm text-red-500 italic">{formState.errors.user_password?.type === 'required' && "Password is required"}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstname">First Name</label>
                            <input type="firstname" name="firstname" id="firstname" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_firstname', {required: true})} autoComplete="true" />
                            <p className="text-sm text-red-500 italic">{formState.errors.user_firstname?.type === 'required' && "First name is required"}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="lastname" name="lastname" id="lastname" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_lastname', {required: true})} autoComplete="true" />
                            <p className="text-sm text-red-500 italic">{formState.errors.user_lastname?.type === 'required' && "Last name is required"}</p>
                        </div>
                        <div class="mb-8">
                            <button type="submit" className="bg-green-700 px-6 py-2 text-white">Register</button>
                        </div>
                        <p>Already have an account? <Link to="/login" className="text-blue-600">Login Now</Link></p>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Register