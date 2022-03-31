import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {reset, registerUser} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'



function Register() {
    const [generalErrorMessage, setGeneralErrorMessage] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isSuccess, isError, message} = useSelector((state) => state.auth)

    useEffect(() => {
      if(isError) {
        console.log(message)
      }

      if(isSuccess || user) {
          navigate('/dashboard')
      }

      dispatch(reset())

    }, [user, isSuccess, isError, message, navigate, dispatch])
    
    
    const onSubmit = (data) => {
        if(data.password !== data.password2) {
            setGeneralErrorMessage('Passwords do not match')
        }  else {
            setGeneralErrorMessage('')
            dispatch(registerUser(data))
        }
    }

  return (
    <section className="register">
        <svg className="logo" width="33" height="27" xmlns="http://www.w3.org/2000/svg"><path d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z" fill="#FC4747"/></svg>
        <div className="auth__container">    
            <h1 className="auth__title">Sign Up</h1>
            <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <label htmlFor="email" className="sr-only">Email:</label>
                    <input className="auth__input" type="email" id="email" {...register("email", { required: true })} placeholder='Email address'/>
                    {errors.email && <span className="error-msg body-s">Can't be empty</span>}
                </div>
                <div className="input-container">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input className="auth__input" type="password" id="password" {...register("password", { required: true })} placeholder='Password'/>
                    {errors.password && <span className="error-msg body-s">Can't be empty</span>}
                </div>
                <div className="input-container">
                    <label htmlFor="password2" className="sr-only">Confirm Password</label>
                    <input className="auth__input auth__input--final" type="password" id="password2" {...register("password2", { required: true })} placeholder='Repeat password'/>
                    {errors.password2 && <span className="error-msg body-s">Can't be empty</span>}
                </div>
                <span className="error-msg--general body-s">{generalErrorMessage}</span>
                <input className="auth__submit btn btn--primary" type="submit" value="Create an account" />
            </form>
            <p className="auth__text">Already have an account? <a href="/">Login</a></p>
        </div>
    </section>
  )
}

export default Register
