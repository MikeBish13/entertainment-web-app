import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {reset, register} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'


function Register() {
    // Local state to capture data entered into the form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    })

    // Destructure the state so each variable can be used independently
    const { email, password, password2} = formData

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
    
    // Update local state when the user types into the form fields
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    
    // On submit, check passwords match and then dispatch the action to the reducer
    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== password2) {
            console.log('Passwords do not match')
        } else {
            let userData = {
                email,
                password
            }
            dispatch(register(userData))
        }
    }

  return (
    <section className="register">
        <svg className="logo" width="33" height="27" xmlns="http://www.w3.org/2000/svg"><path d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z" fill="#FC4747"/></svg>
        <div className="auth__container">    
            <h1 className="auth__title">Sign Up</h1>
            <form className="auth__form" onSubmit={onSubmit}>
                <label htmlFor="email" className="sr-only">Email:</label>
                <input className="auth__input"type="text" id="email" name="email" value={email} onChange={onChange} placeholder='Email address'/>
                <label htmlFor="password" className="sr-only">Password</label>
                <input className="auth__input"type="password" id="password" name="password" value={password} onChange={onChange} placeholder='Password'/>
                <label htmlFor="password2" className="sr-only">Confirm Password</label>
                <input className="auth__input auth__input--final" type="password" id="password2" name="password2" value={password2} onChange={onChange} placeholder='Repeat password'/>
                <input className="auth__submit btn btn--primary" type="submit" value="Create an account" />
            </form>
            <p className="auth__text">Already have an account? <a href="/">Login</a></p>
        </div>
    </section>
  )
}

export default Register


/*
Process
=======

1. User enters details into the form fields
2. The local state in the Register component is updated accordingly
3. On submit, a userData object is created based on local state and this becomes the payload of an action called 'auth/register', which is then dispatched
4. As an asynchronous request to the server is required, the register asyncthunk is created to make the API call
5. When the data is returned from the API call, the register reducer updates state depending on the status of the request and the data it receives back
6. The Register component uses useSelector to receive the various pieces of state (user, isLoading, isSuccess) and in a useEffect hook it reacts accordingly
*/