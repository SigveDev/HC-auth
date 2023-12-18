import './styles/ListAuthLogins.css';
import { useEffect, useState } from 'react';
import { getAppAuths, getAppRegByID, deleteAppAuth } from '../lib/appwrite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ListAuthLogins = ({ account }) => {
    const [auths, setAuths] = useState([]);
    const [appData, setAppData] = useState([]);

    useEffect(() => {
        if(account !== undefined) {
            getAppAuths(account.$id)
                .then((auths) => setAuths(auths))
                .catch((error) => console.error(error));
        }
    }, [account]);

    useEffect(() => {
        if (auths.length === 0) {
            setAppData([]);
        } else {
            Promise.all(auths.map((auth) => getAppRegByID(auth.appRegId)))
                .then((res) => setAppData(res))
                .catch((error) => console.error(error));
        }
    }, [auths]);

    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        return formattedDate;
    };

    const deleteAuth = async (authId) => {
        const confirmed = window.confirm("Are you sure you want to delete this authorized app?");
        if (confirmed) {
            await deleteAppAuth(authId);
            window.location.reload();
        }
    };

    return (
        <div className="ListAuthLogins">
            <h2 className='AuthHeader'>Authorized apps:</h2>
            <div className="Auth-Wrapper">
                {auths.length === appData.length && auths.map((auth) => {
                    const app = appData.find((app) => app.$id === auth.appRegId);
                    return (
                        <div className="App" key={app && app.$id}>
                            <button className="delete" onClick={() => deleteAuth(auth.$id)}><FontAwesomeIcon icon={faTrash} /></button>
                            <h3 className='name'>{app && app.appName}</h3>
                            <p className='date'>{app && formatDate(auth.$createdAt)}</p>
                            <a href={app.appUrl} className='url'>{app && app.appUrl}</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListAuthLogins;