import './styles/ListAuthLogins.css';
import { useEffect, useState } from 'react';
import { getAppAuths, getAppRegByID, deleteAppAuth } from '../lib/appwrite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ListAuthLogins = ({ account }) => {
    const [auths, setAuths] = useState(null);
    const [appData, setAppData] = useState([]);

    useEffect(() => {
        if(account !== undefined) {
            getAppAuths(account.$id)
                .then((auths) => setAuths(auths))
                .catch((error) => console.error(error));
        }
    }, [account]);

    useEffect(() => {
        if (auths) {
            setAppData([]);
            auths.forEach((auth) => {
                getAppRegByID(auth.appRegId)
                    .then((res) => setAppData(a => [...a, res]))
                    .catch((error) => console.error(error));
            });
        }
    }, [auths])

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
            <div className="Wrapper">
                {(appData.length > 0 && auths) && auths.map((auths) => {
                    const app = appData.find((app) => app.$id === auths.appRegId);
                    return (
                        <div className="App" key={app.$id}>
                            <button className="delete" onClick={() => deleteAuth(auths.$id)}><FontAwesomeIcon icon={faTrash} /></button>
                            <h3 className='name'>{app.appName}</h3>
                            <p className='date'>{formatDate(auths.$createdAt)}</p>
                            <a href={app.appUrl} className='url'>{app.appUrl}</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListAuthLogins;