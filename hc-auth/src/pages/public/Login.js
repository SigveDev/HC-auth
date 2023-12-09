import './styles/Login.css';
import React from 'react';
import { useState } from 'react';
import { account } from "../../lib/appwrite";

const Login = ({ provider }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const id = window.location.pathname.split('/')[2];

    const login = async (email, password) => {
        await account.createEmailSession(email, password);

        if(await account.get()) {
            if(provider) {
                window.location.href = `/auth/${id}`;
            } else {
                window.location.href = '/dashboard';
            }
        }
    };

    return (
        <div className='Login'>
            <h1 className="header">Login</h1>
            <form className='form' onSubmit={(e) => {
                e.preventDefault();
                login(email, password);
            }}>
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
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;
