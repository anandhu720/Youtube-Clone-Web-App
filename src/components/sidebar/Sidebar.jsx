import React from 'react'
import "./_sidebar.scss";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom"

import { log_out } from '../../redux/actions/auth.action';

import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp,
    MdHistory,
    MdLibraryBooks,
    MdHome,
    MdSentimentDissatisfied, 
} from 'react-icons/md';



const Sidebar = ({sidebar,handleToggleSidebar}) => {

    const history = useHistory();

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(log_out())
    }

    const handleHomeClick = () => {
        history.push('/')
    }

    return (
        <nav 
            className={sidebar ? "sidebar open" : "sidebar"}
            onClick={() => handleToggleSidebar(false)}
        >
           <li onClick={handleHomeClick}>
               <MdHome size={23} />
               <span>Home</span>
           </li>
           <li>
               <MdSubscriptions size={23} />
               <span>Construction</span>
           </li>
           <li>
               <MdThumbUp size={23} />
               <span>Construction</span>
           </li>
           <li>
               <MdHistory size={23} />
               <span>Construction</span>
           </li>
           <li>
               <MdLibraryBooks size={23} />
               <span>Construction</span>
           </li>
           <li>
               <MdSentimentDissatisfied size={23} />
               <span>I don't know</span>
           </li>
           <hr />
           <li onClick = {handleLogOut}>
               <MdExitToApp size={23} />
               <span>Log Out</span>
           </li>
           <hr/>
        </nav>

    )
}

export default Sidebar
