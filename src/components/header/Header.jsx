import React, { useState } from 'react'
import './_header.scss';
import YouTubeLogo from "../../images/youtube-logo.png";
// import Profile from "../../images/profile.jpg";


import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import {MdNotifications , MdApps } from "react-icons/md";

import {useSelector} from 'react-redux';
import { useHistory } from 'react-router';


const Header = ({handleToggleSidebar}) => {

    const [input,setInput] = useState('');
    const {user} = useSelector(state => state.auth)

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${input}`)
        setInput('')

    }

    return (
        <div className="header">
            <FaBars 
                className="header_menu"
                size={26}
                onClick={() => handleToggleSidebar()}
            />
            <img 
                src={YouTubeLogo}
                alt="youTube-logo"
                className="header_logo" 
            />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)}/>
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header_icons">
                <MdNotifications size={28} />
                <MdApps size={28} />
                <img 
                    src={user?.photoUrl}
                    alt="profile" 
                />
            </div>

        </div>
    )
}

export default Header
