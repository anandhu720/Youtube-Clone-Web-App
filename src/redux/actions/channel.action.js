import * as actions from '../actionTypes'

import request from '../../api';


export const getChannelById = (id) => async (dispatch) => {
    try {

        dispatch({
            type:actions.SELECTED_CHANNEL_REQUEST
        })

        const {data} = await request.get('/channels',{
            params:{
                part:"snippet,statistics,contentDetails",
                id:id
            }
        })

        dispatch({
            type:actions.SELECTED_CHANNEL_SUCCESS,
            payload:data.items[0]
        })
        
    } catch (error) {
        console.log(error);

        dispatch({
            type:actions.SELECTED_CHANNEL_FAIL,
            payload:error
        })
    }
}

export const checkChannelSubscription = (id) => async (dispatch,getState) => {
    try {
        const {data} = await request.get('/subscriptions',{
            params:{
                part:"snippet",
                forChannelId:id,
                mine:true
            },
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`
            },
        })

        dispatch({
            type:actions.SET_SUBSCRIPTION_DETAILS,
            // payload:data.items.length !== 0,
        })

        console.log(data);
        
    } catch (error) {
        console.log(error.message.data); 
    }
}