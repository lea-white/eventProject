import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const UserProfile = () => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.userId)
    const editMode = useSelector((state) => state.editMode)

    const [user, setUser] = useState(null)
    const [editUser, setEditUser] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const handleDelete = async () => {
        await axios.delete('/deleteUserProfile')
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await axios.get(`/userProfile/${userId}`)
            setUser(response.data)
            setEditUser(response.data)
        }
        
        fetchUserProfile()
    }, [userId])

    const handleEdit = () => {
        dispatch({
            type: 'EDIT_MODE',
            payload: !editMode,
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    }

    const handleSave = async () => {
        await axios.put(`/updateUserProfile/${userId}`, editUser)
        dispatch({
            type: 'EDIT_MODE'
        })

        const response = await axios.get(`/userProfile/${userId}`);
        setUser(response.data);
        setEditUser(response.data);
    }

    return (
        <div>
            <div>
                <h4>Personal Information:</h4>
                {editUser && editMode && (
                    <div>
                        <p>First Name: 
                            <input 
                                name="firstName" 
                                value={editUser.firstName} 
                                onChange={handleInputChange} />    
                        </p>
                        <p>Last Name: 
                            <input 
                                name="lastName" 
                                value={editUser.lastName} 
                                onChange={handleInputChange} 
                            />
                        </p>
                        <p>Username: 
                            <input 
                                name="username" 
                                value={editUser.username} 
                                onChange={handleInputChange} 
                            /> 
                        </p>
                        <p>Email: 
                            <input 
                                name="email" 
                                value={editUser.email} 
                                onChange={handleInputChange} 
                            /> 
                        </p>
                        <p>Password:
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={editUser.password}
                                onChange={handleInputChange}
                                name="password"
                            />
                        </p>
                        <label>Show Password:
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={togglePasswordVisibility}
                            />
                        </label>
                        <p>Zipcode: 
                            <input 
                                name="zipcode" 
                                value={editUser.zipcode} 
                                onChange={handleInputChange} 
                            />
                        </p>
                        <button onClick={handleEdit}>Cancel</button>
                        <button onClick={handleSave}>Save</button>
                    </div>
                )} 
                {editUser && !editMode && (
                    <div>
                        <p>First Name: {editUser.firstName}</p>
                        <p>Last Name: {editUser.lastName}</p>
                        <p>Username: {editUser.username}</p>
                        <p>Email: {editUser.email}</p>
                        <p>Password: {' '}
                            {showPassword ? editUser.password : '•'.repeat(editUser.password.length)}
                        </p>
                        <p>Zipcode: {editUser.zipcode}</p>
                        <button onClick={handleEdit}>{editMode ? 'Cancel' : 'Edit'}</button>
                        <button onClick={handleDelete}>Delete Account</button>
                    </div>
                )}
            </div>
        <div>
            <h4>Created Events:</h4>
        </div>
        <div>
            <h4>Upcoming Events:</h4>
        </div>
        <div>
            <h4>Favorite Events:</h4>
        </div>
        </div>
    )
}

export default UserProfile