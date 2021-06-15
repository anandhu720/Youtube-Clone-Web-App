import * as actions from '../actionTypes';

import request from '../../api';


export const getCommentsOfVideoById = (id) => async (dispatch) => {
    try {

        dispatch({
            type: actions.COMMENT_LIST_REQUEST,
        })

        const {data} = await request.get('/commentThreads',{
            params: {
                part:"snippet",
                videoId:id
            }
        })

        dispatch({
            type: actions.COMMENT_LIST_SUCCESS,
            payload:data.items,
        })
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: actions.COMMENT_LIST_FAIL,
            payload:error.message,
        })
    }
}

export const addComment = (id,text) => async (dispatch,getState) => {
    try {

        const obj = {
            snippet:{
                videoId:id,
                topLevelComment:{
                    snippet:{
                        textOrigin:text
                    }
                }
            }
        }

        await request.post('/commentThreads',obj,{
            params: {
                part:"snippet",
            },            
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`
            },
        })

        dispatch({
            type: actions.CREATE_COMMENT_SUCCESS,
        })

        dispatch(getCommentsOfVideoById(id))
        
    } catch (error) {
        console.log(error);
        dispatch({
            type: actions.CREATE_COMMENT_FAIL,
            payload:error.message,
        })
    }
}