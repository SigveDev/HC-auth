import './Auth.css';
import { useEffect, useState } from 'react';
import { checkAppAuth, createAppAuth, getAppRegByID, avatars, createJWTToken, getUserConfig, getPFP } from '../lib/appwrite';

import Loader from '../components/Loader';

const Auth = ({ account }) => {
    const [onlyRunOnce, setOnlyRunOnce] = useState(true); // This is a hack to make sure the useEffect only runs once
    const [avatar, setAvatar] = useState(null);
    const [appReg, setAppReg] = useState(null);
    const [authId, setAuthId] = useState(null);
    const provider = window.location.pathname.split("/")[2];

    useEffect(() => {
        if(account) {
            getUserConfig(account.$id)
                .then((res) => {
                    if(res.pfp) {
                        getPFP(res.pfp)
                            .then((res) => setAvatar(res))
                            .catch((error) => console.error(error));
                    } else {
                        setAvatar(avatars.getInitials(account.name));
                    }
                })
                .catch((error) => console.error(error));
        } else if (account === "error") {
            window.location.href = `/login/${provider}`;
        }
    }, [account, provider]);

    useEffect(() => {
        if (provider) {
            getAppRegByID(provider)
                .then((res) => setAppReg(res))
                .catch((error) => console.error(error));
        }
    }, [provider]);

    useEffect(() => {
        console.log(account);
        if (account && appReg) {
            console.log("got account and appreg");
            if(onlyRunOnce) {
                setOnlyRunOnce(false);
                console.log("ran");
                checkAppAuth(account.$id, provider)
                        .then((res) => {
                            setAuthId(res.$id);
                            handleJWT();
                        })
                        .catch((error) => {
                            console.error(error);
                            createAppAuth(account.$id, provider)
                                    .then((res) => {
                                        setAuthId(res.$id);
                                    })
                                    .catch((error) => console.error(error));
                        });
            }
        }
    }, [account, provider]);

    const handleJWT = () => {
        createJWTToken(authId)
            .then((res) => {
                window.location.href = appReg.appFallbackUrl + "/" + res;
            })
            .catch((error) => console.error(error));
    };

    const loginAnotherUser = async () => {
        await account.deleteSession('current');
        window.location.href = `/login/${provider}`;
    };

    return (
        <>
        {account && account !== "error" && appReg && authId ? (
            <div className='Auth'>
                <div className='AuthBox'>
                    <h1 className='AuthHeader'>HC Auth</h1>
                    <p className='small'>Logg inn to <span>{appReg && appReg.appName}</span></p>
                    <div className='userInfo'>
                        <div className="AuthAvatar">
                            <img src={avatar ? avatar.href : ""} alt="Avatar" />
                        </div>
                        <div className='AuthAvatarInfo'>
                            <h3 className='UserName'>{account && account.name}</h3>
                            <p className='small'>{account && account.email}</p>
                        </div>
                    </div>
                    <div className='AuthButtons'>
                        <button className='AuthLogin' onClick={() => loginAnotherUser()}>Another user</button>
                        <button className='AuthButton' onClick={() => handleJWT()}>Logg inn</button>
                    </div>
                </div>
            </div>
        ) : (
            <Loader />
        )}
        </>
    )
}

export default Auth;