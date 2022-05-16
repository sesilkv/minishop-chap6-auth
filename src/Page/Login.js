import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {

    const {register, handleSubmit, formState} = useForm()

    const formSubmitHandler = (data) => {
        const postData = {
            email: data.user_email,
            password: data.user_password
        }
        axios.post('http://localhost:4000/login', postData)
        .then(res => {
            localStorage.setItem('token', res.data.accessToken)
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <section>
            <div className="container py-8">
                <div className="max-w-[500px] mx-auto">
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
                        {/* <div className="mb-4">
                            <label htmlFor="firstname">First Name</label>
                            <input type="firstname" name="firstname" id="firstname" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_firstname', {required: true})} autoComplete="true" />
                            <p className="text-sm text-red-500 italic">{formState.errors.user_firstname?.type === 'required' && "First name is required"}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="lastname" name="lastname" id="lastname" className="leading-loose border border-solid border-slate-500 block w-full" {...register('user_lastname', {required: true})} autoComplete="true" />
                            <p className="text-sm text-red-500 italic">{formState.errors.user_lastname?.type === 'required' && "Last name is required"}</p>
                        </div> */}
                        <div class="mb-8">
                            <button type="submit" className="bg-green-700 px-6 py-2 text-white">Login</button>
                        </div>
                        <p>Don't have an account? <Link to="/register" className="text-blue-600">Register Now</Link></p>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Login