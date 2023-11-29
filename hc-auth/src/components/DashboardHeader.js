import './styles/DashboardHeader.css';
import React, { useState, useEffect } from 'react';
import { avatars } from "../lib/appwrite";

import ProfileMenu from './ProfileMenu';

const DashboardHeader = ({ account }) => {
    const [avatar, setAvatar] = useState(null);
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        if(account) {
            setAvatar(avatars.getInitials(account.name));
        }
    }, [account]);

    const toggleMenuHandler = () => {
        setToggleMenu(!toggleMenu);
    }

    return (
        <div className="Header">
            <a href='/dashboard' className='logo'><span>HC</span> Auth</a>
            <button className="Avatar" onClick={() => toggleMenuHandler()}>
                <img src={avatar? avatar.href : ""} alt="Avatar" />
            </button>
            {toggleMenu && <ProfileMenu user={account} avatarUrl={avatar.href} />}
        </div>
    );
};

export default DashboardHeader;