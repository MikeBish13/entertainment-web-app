import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {reset, login} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

     // Navigate imported from react-router to allow navigation back to dashboard on success
     const navigate = useNavigate()

     // Declare dispatch variable so that the action can be dispatched
     const dispatch = useDispatch()
 
     // Get state from the store
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
     

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        let userData = {
            email,
            password 
        }
        dispatch(login(userData))
    }

  return (
    <section className="login">
        <svg className="logo" width="33" height="27" xmlns="http://www.w3.org/2000/svg"><path d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z" fill="#FC4747"/></svg>
        <div className="auth__container">    
            <h1 className="auth__title">Login</h1>
            <form className="auth__form" onSubmit={onSubmit}>
                <label htmlFor="email" className="sr-only">Email:</label>
                <input className="auth__input" type="text" id="email" name="email" value={email} onChange={onChange} placeholder='Email address'/>
                <label htmlFor="password" className="sr-only">Password:</label>
                <input className="auth__input" type="password" id="password" name="password" value={password} onChange={onChange} placeholder='Password'/>
                <input className="auth__submit btn btn--primary" type="submit" value="Login to your account" />
            </form>
            <p className="auth__text body-md">Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
    </section>
  )
}

export default Login