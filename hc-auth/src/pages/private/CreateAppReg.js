import './styles/CreateAppReg.css';
import { useState, useEffect } from 'react';
import { createAppRegistration } from "../../lib/appwrite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

const CreateAppReg = ({ account }) => {
    const [appName, setAppName] = useState('');
    const [appUrl, setAppUrl] = useState('');
    const [appFallbackUrl, setAppFallbackUrl] = useState('');

    useEffect(() => {
        if (account === "error") {
            window.location.href = "/login";
        }
    }, [account]);

    const createAppReg = async (appName, appUrl, appFallbackUrl) => {
        const appReg = await createAppRegistration(appName, account.$id, appUrl, appFallbackUrl);
        console.log(appReg);
        window.location.href = '/dashboard';
    };

    return (
        <div className='CreateAppReg'>
            <div className='CreateAppRegWrapper'>
                <a href="/dashboard" className="backToDashboard"><FontAwesomeIcon icon={faCaretLeft} />Back to Dashboard</a>
                <h1 className="header">Create App Registration</h1>
                <form className='form' onSubmit={(e) => {
                    e.preventDefault();
                    createAppReg(appName, appUrl, appFallbackUrl);
                }}>
                    <label htmlFor='appName'>App Name</label>
                    <input
                        type='text'
                        id='appName'
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                    />
                    <label htmlFor='appUrl'>App URL</label>
                    <input
                        type='url'
                        id='appUrl'
                        value={appUrl}
                        onChange={(e) => setAppUrl(e.target.value)}
                    />
                    <label htmlFor='appFallbackUrl'>App Fallback URL</label>
                    <input
                        type='url'
                        id='appFallbackUrl'
                        value={appFallbackUrl}
                        onChange={(e) => setAppFallbackUrl(e.target.value)}
                    />
                    <button type='submit'>Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAppReg;