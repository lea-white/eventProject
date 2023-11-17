import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const UserRegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [zipcode, setZipcode] = useState('')

    const [showForm, setShowForm] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const interestOptions = ['Music', 'Football','Baseball','Theatre','Food','Festivals','']

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const createNewUser = async (e) => {
        e.preventDefault()

        const registerNewUser = await axios.post('/register', { 
            username, 
            email, 
            password, 
            confirmPassword, 
            firstName, 
            lastName, 
            zipcode
        })
            .then(res => {
                dispatch({
                    type: 'createUser'
                })

                setShowForm(false)

                // .catch(err => {
                //     if(err.response && err.response.status === 400){
                //         setRegistrationError('User already exists. Please choose another username')
                //     } else {
                //         console.log('Registration failed', err)
                //         setRegistrationError('Registration failed. Please try again.')
                //     }
                    
                // })
            })
    }
  return (
    <div>
        {showForm && (
            <form id='registerUserForm' onSubmit={createNewUser}>
                <h4>Sign Up Information:</h4>
                <label>Username:</label>
                    <input 
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                <label>Password:</label>
                    <input 
                        placeholder='Password'
                        type={showPassword ? 'text': 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                <label>Confirm password:</label>
                    <input 
                        placeholder='Confirm password'
                        type={showPassword ? 'text': 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={true}
                    />
                <label>Show Password</label>
                    <input 
                        type='checkbox'
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                    />
                <label>First Name:</label>
                    <input 
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required={true}
                    />
                <label>Last Name:</label>
                    <input 
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required={true}
                    />
                <label>Email:</label>
                    <input 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                <label>Zipcode:</label>
                    <input 
                        placeholder='Zipcode'
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required={true}
                    />
                <h4>Select up 5 types of events you are intersted in:</h4>
                <button type='submit'>Create Account</button>
            </form>
        )}
        {!showForm && (
            <div>
                <p>Account Created!</p>
                <p>Please login!</p>
            </div>
        )}
    </div>
  )
}

export default UserRegisterForm
