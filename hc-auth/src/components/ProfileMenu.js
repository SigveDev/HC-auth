import React from 'react';
import { account } from '../lib/appwrite';

const ProfileMenu = ({ user, avatarUrl }) => {

    const logoutHandler = async () => {
        await account.deleteSessions('current');
        window.location.href = '/';
    }

    const formattedDate = new Date(user.$createdAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="ProfileMenu">
            <div className="UserInfo">
                <div className="AvatarSmall">
                    <img src={avatarUrl ? avatarUrl : ""} alt="Avatar" />
                </div>
                <div className='AvatarInfo'>
                    <h3 className='name'>{user.name}</h3>
                    <p className='small'>{formattedDate}</p>
                </div>
            </div>
            <div className="MenuLinks">
                <a href='/profile'>Settings</a>
                <button onClick={() => logoutHandler()}>Logout</button>
            </div>
        </div>
    );
}

export default ProfileMenu;