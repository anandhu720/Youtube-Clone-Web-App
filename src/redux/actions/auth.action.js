import firebase from 'firebase/app';
import * as actions from '../actionTypes';

import auth from "../../firebase"

export const login = () => async dispatch => {
    try {

        dispatch({
            type: actions.LOGIN_REQUEST,
        })


        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")
        const res = await auth.signInWithPopup(provider);

        const accessToken = res.credential.accessToken;

        const profile = {
            name:res.additionalUserInfo.profile.name,
            photoUrl:res.additionalUserInfo.profile.picture,
        }

        sessionStorage.setItem("ytc-access-token", accessToken);
        sessionStorage.setItem("ytc-user", JSON.stringify(profile));


        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload:accessToken
        })

        dispatch({
            type:actions.LOAD_PROFILE,
            payload:profile
        })


    }catch (err){
        console.log(err);
        dispatch({
            type:actions.LOGIN_FAIL,
            payload:err.message,
        })
    }
}


export const log_out = () => async dispatch => {
    try{
        await auth.signOut()
        .then(() =>{
            console.log("Sign Out Successfully");
        })

        dispatch({
            type:actions.LOG_OUT
        })

        sessionStorage.removeItem('ytc-access-token');
        sessionStorage.removeItem('ytc-user');


    }catch (err){
        console.log(err);
    }
}