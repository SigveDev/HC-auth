import './styles/DashboardHeader.css';
import React, { useState, useEffect } from 'react';
import { avatars, getUserConfig, getPFP } from "../lib/appwrite";

import ProfileMenu from './ProfileMenu';

const DashboardHeader = ({ account }) => {
    const [runOnce, setRunOnce] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        if(account) {
            if(!runOnce) {
                setRunOnce(true);
                getUserConfig(account.$id)
                    .then((userConfig) => {
                        if (userConfig.pfp) {
                            getPFP(userConfig.pfp)
                                .then((avatar) => {
                                    setAvatar(avatar);
                                })
                                .catch((error) => console.error(error));
                        } else {
                            setAvatar(avatars.getInitials(account.name));
                        }
                    })
                    .catch((error) => console.error(error));
            }
        }
    }, [account]);

    const toggleMenuHandler = () => {
        setToggleMenu(!toggleMenu);
    }

    const removeMenu = () => {
        setToggleMenu(false);
    }

    return (
        <div className="Header">
            <a href='/dashboard' className='logo'><span>HC</span> Auth</a>
            <button className="Avatar" onClick={() => toggleMenuHandler()}>
                <img src={avatar? avatar.href : ""} alt="Avatar" />
            </button>
            {toggleMenu && <ProfileMenu user={account} avatarUrl={avatar.href} />}
            {toggleMenu && <div className="Backdrop" onClick={() => removeMenu()}></div>}
        </div>
    );
};

export default DashboardHeader;