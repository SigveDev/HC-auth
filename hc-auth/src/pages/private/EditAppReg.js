import './styles/EditAppReg.css';
import { useEffect, useState } from 'react';
import { getAppRegByID, updateAppRegistration, deleteAppRegistration } from '../../lib/appwrite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

const EditAppReg = ({ account }) => {
    const [appRegId, setAppRegId] = useState(""); // window.location.pathname.split("/")[4]
    const [appName, setAppName] = useState("");
    const [appUrl, setAppUrl] = useState("");
    const [appFallbackUrl, setAppFallbackUrl] = useState("");

    useEffect(() => {
        if (account === "error") {
            window.location.href = "/login";
        }
    }, [account]);

    useEffect(() => {
        setAppRegId(window.location.pathname.split("/")[4]);
    }, []);

    useEffect(() => {
        if (account && appRegId) {
            getAppRegByID(appRegId)
                .then((res) => {
                    setAppName(res.appName);
                    setAppUrl(res.appUrl);
                    setAppFallbackUrl(res.appFallbackUrl);
                })
                .catch((error) => console.error(error));
        }
    }, [account, appRegId]);

    const updateAppReg = async (appName, appUrl, appFallbackUrl) => {
        const appReg = await updateAppRegistration(appRegId, appName, appUrl, appFallbackUrl);
        console.log(appReg);
        window.location.href = '/dashboard';
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this app registration?");
        if (confirmed) {
            await deleteAppRegistration(appRegId);
            window.location.href = '/dashboard';
        }
    };

    return (
      <div className='EditAppReg'>
          <div className='EditAppRegWrapper'>
                <a href="/dashboard" className="backToDashboard"><FontAwesomeIcon icon={faCaretLeft} />Back to Dashboard</a>
                <h1 className="header">Edit App Registration</h1>
                <form className='form' onSubmit={(e) => {
                    e.preventDefault();
                    updateAppReg(appName, appUrl, appFallbackUrl);
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
                    <div className="formButtons">
                        <button type='submit'>Update</button>
                        <button type='button' onClick={() => handleDelete()} className='warning'>Delete</button>
                    </div>
                </form>
            </div>
      </div>
    );
};

export default EditAppReg;