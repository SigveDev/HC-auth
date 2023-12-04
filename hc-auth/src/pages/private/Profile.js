import './styles/Profile.css';
import React, { useState, useEffect } from 'react';
import { avatars, updateUserEmail, updateUserPhone, updatePFP, getPFP, getUserConfig, updateUserName, updatePass } from "../../lib/appwrite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from "react-drag-drop-files";

import DashboardHeader from '../../components/DashboardHeader';

const Profile = ({ account }) => {
    const [runOnce, setRunOnce] = useState(false);
    const [avatar, setAvatar] = useState(null);
    
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");

    const [pfpFile, setPfpFile] = useState(null);

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
                setEmail(account.email);
                setPhone(account.phone);
                setName(account.name);
            }
        } else if (account === "error") {
            window.location.href = '/login';
        }
    }, [account]);

    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        return formattedDate;
    };

    const showModal = () => {
        const modal = document.getElementById('modal');
        const modalBg = document.getElementById('modal-bg');
        modal.classList.add('show');
        modalBg.classList.add('show');
    };

    const removeModal = async () => {
        const modal = document.getElementById('modal');
        const modalBg = document.getElementById('modal-bg');
        modal.classList.remove('show');
        modalBg.classList.remove('show');
    };

    const saveAccountChanges = async () => {
        if (pass) {
            if (email !== account.email) {
                await updateUserEmail(email, pass)
                    .then(() => {
                        removeModal();
                    })
                    .catch((error) => console.error(error));
            }
            if (phone !== account.phone) {
                await updateUserPhone(phone, pass)
                    .then(() => {
                        removeModal();
                    })
                    .catch((error) => console.error(error));
            }
            window.location.reload();
        }
    };

    const handlePFP = async (file) => {
        setPfpFile(file);
        if(account) {
            await updatePFP(account.$id, file)
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => console.error(error));
        }
    };

    const changePFPModal = () => {
        const modal = document.getElementById('changePFPModal');
        const modalBg = document.getElementById('pfpmodal-bg');
        modal.classList.add('show');
        modalBg.classList.add('show');
    };

    const removePFPModal = () => {
        const modal = document.getElementById('changePFPModal');
        const modalBg = document.getElementById('pfpmodal-bg');
        modal.classList.remove('show');
        modalBg.classList.remove('show');
    };

    const saveName = async () => {
        if (name) {
            await updateUserName(name)
                .then(() => {
                    removeModal();
                    window.location.reload();
                })
                .catch((error) => console.error(error));
        }
    };

    const changeNameModal = () => {
        const modal = document.getElementById('name-modal');
        const modalBg = document.getElementById('name-modal-bg');
        modal.classList.add('show');
        modalBg.classList.add('show');
    };

    const removeNameModal = () => {
        const modal = document.getElementById('name-modal');
        const modalBg = document.getElementById('name-modal-bg');
        modal.classList.remove('show');
        modalBg.classList.remove('show');
    };

    const savePassword = async () => {
        if (oldPass && newPass) {
            await updatePass(newPass, oldPass)
                .then(() => {
                    removePasswordModal();
                    window.location.reload();
                })
                .catch((error) => console.error(error));
        }
    };

    const changePasswordModal = () => {
        const modal = document.getElementById('password-modal');
        const modalBg = document.getElementById('password-modal-bg');
        modal.classList.add('show');
        modalBg.classList.add('show');
    };

    const removePasswordModal = () => {
        const modal = document.getElementById('password-modal');
        const modalBg = document.getElementById('password-modal-bg');
        modal.classList.remove('show');
        modalBg.classList.remove('show');
    };

    return (
        <div className='Profile'>
            <DashboardHeader account={account} />
            <main>
                <div className="profile">
                    <div className="profile-avatar">
                        <img src={avatar? avatar.href : ""} alt="Avatar"  onClick={changePFPModal}/>
                    </div>
                    <div className="profile-details">
                        <h1 className='name'>{account.name}</h1>
                        <p className='createdAt'>{formatDate(account.$createdAt)}</p>
                        <div className='buttons'>
                            <button className='button edit' onClick={changeNameModal}>Edit Name</button>
                            <button className="button changePassword" onClick={changePasswordModal}>Change Password</button>
                        </div>
                    </div>
                </div>
                <div className="profile-info">
                    <h2 className='infoHeader'>Account Info</h2>
                    <form className='infoForm'onSubmit={(e) => {
                            e.preventDefault();
                            showModal();
                    }}>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" placeholder="member@hcklikk.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone: </label>
                            <input type="tel" id="phone" name="phone" placeholder="+4712345678" pattern="^\+?[1-9]\d{1,14}$" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <button type='submit' className='button save'>Save</button>
                    </form>
                </div>
            </main>
            <div id="modal">
                <button className="close" onClick={() => removeModal()}><FontAwesomeIcon icon={faXmark} /></button>
                <h3 className="modal-header">Please provide Password to save changes</h3>
                <form className="modal-form" onSubmit={(e) => {
                    e.preventDefault();
                    saveAccountChanges();
                }}>
                    <input type="password" name="password" id="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    <button type="submit" className="button save">Save</button>
                </form>
            </div>
            <button id="modal-bg" onClick={() => removeModal()}></button>

            <div id="changePFPModal">
                <button className="close" onClick={() => removePFPModal()}><FontAwesomeIcon icon={faXmark} /></button>
                <h3 className="modal-header">Change Profile Picture</h3>
                <FileUploader handleChange={handlePFP} name="file" types={["JPG", "JPEG", "PNG"]} />
            </div>
            <button id="pfpmodal-bg" onClick={() => removePFPModal()}></button>

            <div id="name-modal">
                <button className="close" onClick={() => removeNameModal()}><FontAwesomeIcon icon={faXmark} /></button>
                <h3 className="modal-header">Change Name</h3>
                <form className="modal-form" onSubmit={(e) => {
                    e.preventDefault();
                    saveName();
                }}>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <button type="submit" className="button save">Save</button>
                </form>
            </div>
            <button id="name-modal-bg" onClick={() => removeNameModal()}></button>

            <div id="password-modal">
                <button className="close" onClick={() => removePasswordModal()}><FontAwesomeIcon icon={faXmark} /></button>
                <h3 className="modal-header">Change Password</h3>
                <form className="modal-form" onSubmit={(e) => {
                    e.preventDefault();
                    savePassword();
                }}>
                    <label htmlFor="oldPassword">Old Password: </label>
                    <input type="password" name="oldPassword" id="oldPassword" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
                    <label htmlFor="newPassword">New Password: </label>
                    <input type="password" name="newPassword" id="newPassword" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                    <button type="submit" className="button save">Save</button>
                </form>
            </div>
            <button id="password-modal-bg" onClick={() => removePasswordModal()}></button>
        </div>
    );
};

export default Profile;