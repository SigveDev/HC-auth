import './styles/Register.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { account, ID, createUserConfig, checkAdmin } from "../../lib/appwrite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

const RegisterNewUser = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const register = async(email, name) => {
        const newUser = await account.create(ID.unique(), email, "changeme", name);
        console.log(newUser);
        await createUserConfig(newUser.$id);
        window.location.href = '/dashboard';
    };

    useEffect(() => {
        const checkIfAdmin = async () => {
            checkAdmin()
                .then((res) => {
                    if (!res) {
                        window.location.href = '/dashboard';
                    }
                })
                .catch((error) => console.error(error));
        }
        checkIfAdmin();
    }, []);

    return (
        <div className='Register'>
            <div className="RegisterWrapper">
                <a href="/dashboard" className="backToDashboard"><FontAwesomeIcon icon={faCaretLeft} />Back to Dashboard</a>
                <h1 className="header">Register New User</h1>
                <form className='form' onSubmit={(e) => {
                    e.preventDefault();
                    register(email, name);
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
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterNewUser;