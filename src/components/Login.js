import React, {useState} from 'react';
import {connect} from "react-redux";
import {login} from "../actions/auth";
import PropTypes from "prop-types";
import setAuthToken from "../utils/setAuthToken";
import {Navigate} from "react-router-dom";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        userinfo_id: '',
        password: ''
    })

    if (localStorage.token) {
        return <Navigate to="/"/>
    }

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        login(formData)
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 sm:p-10 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-5">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block mb-1 font-bold">Username</label>
                        <input type="text" id="username" name="userinfo_id" className="w-full p-2 border rounded-lg"
                               onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 font-bold">Password</label>
                        <input type="password" id="password" name="password" className="w-full p-2 border rounded-lg"
                               onChange={handleChange}/>
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">Login
                    </button>
                </form>
            </div>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);