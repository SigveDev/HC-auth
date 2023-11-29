import './styles/ListAppReg.css';
import { useState, useEffect } from 'react';
import { getAppRegByOwner} from '../lib/appwrite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faClone } from '@fortawesome/free-solid-svg-icons';

const ListAppReg = ({ account }) => {
    const [appReg, setAppReg] = useState([]);

    useEffect(() => {
        if (account !== undefined)  {
            getAppRegByOwner(account.$id)
                .then((appReg) => setAppReg(appReg))
                .catch((error) => console.error(error));
        
        }
    }, [account]);

    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        return formattedDate;
    }

    return (
        <div className='ListAppReg'>
            <div className='AppRegMenu'>
                <h2 className="appRegHeader">Your Apps:</h2>
                <a href="/dashboard/appreg/create" className="createAppReg"><FontAwesomeIcon icon={faPlus} /></a>
            </div>
            <div className='Wrapper'>
                {appReg.map((appReg) => (
                    <div className='AppReg' key={appReg.$id}>
                        <button className='copyId' onClick={() => navigator.clipboard.writeText(appReg.$id)}><FontAwesomeIcon icon={faClone} /></button>
                        <a href={"/dashboard/appreg/edit/" + appReg.$id} className='editIcon'><FontAwesomeIcon icon={faPencil} /></a>
                        <h3 className='name'>{appReg.appName}</h3>
                        <p className='date'>{formatDate(appReg.$createdAt)}</p>
                        <a href={appReg.appUrl} className='url'>{appReg.appUrl}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListAppReg;