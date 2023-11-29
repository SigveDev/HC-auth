import './styles/LoginRegister.css';
import React from 'react';
import { useState } from 'react';
import { account, ID } from "../../lib/appwrite";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');

    const login = async (email, password) => {
        await account.createEmailSession(email, password);

        if(await account.get()) {
            window.location.href = '/dashboard';
        }
    };

    const register = async(email, password, name) => {
        if(password !== password2) {
            alert('Passwords do not match');
            return;
        }
        await account.create(ID.unique(), email, password, name);

        login(email, password);
    };

    return (
        <div className='Register'>
            <h1 className="header">Register</h1>
            <form className='form' onSubmit={(e) => {
                e.preventDefault();
                register(email, password, name);
            }}>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='password'>Repeat Password</label>
                <input
                    type='password'
                    id='password'
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}

export default Register;