import * as actions from '../actionTypes';

import request from '../../api';

export const getPopularVideos = () => async (dispatch,getState) => {
    try {

        dispatch({
            type: actions.HOME_VIDEOS_REQUEST
        })

        const {data} = await request.get("/videos" ,{
            params: {
                part:"snippet,contentDetails,statistics",
                chart:"mostPopular",
                regionCode:"IN",
                maxResults:20,
                pageToken:getState().homeVideos.nextPageToken,
            }
        })

        dispatch({
            type:actions.HOME_VIDEOS_SUCCESS,
            payload:{
                videos : data.items,
                nextPageToken : data.nextPageToken,
                category:"All",
            }
        })
        
    } catch (error) {
        console.log(error)

        dispatch({
            type:actions.HOME_VIDEOS_FAIL,
            payload:error
        })
    }
}

export const getVideosByCategory = (keyword) => async (dispatch,getState) => {
    try {

        dispatch({
            type: actions.HOME_VIDEOS_REQUEST
        })

        const {data} = await request.get("/search" ,{
            params: {
                part:"snippet",
                maxResults:20,
                pageToken:getState().homeVideos.nextPageToken,
                q:keyword,
                type:"video"
            }
        })

        dispatch({
            type:actions.HOME_VIDEOS_SUCCESS,
            payload:{
                videos : data.items,
                nextPageToken : data.nextPageToken,
                category:keyword,
            }
        })
        
    } catch (error) {
        console.log(error)

        dispatch({
            type:actions.HOME_VIDEOS_FAIL,
            payload:error
        })
    }
}


export const getVideoById = (id) => async dispatch  => {
    try {

        dispatch({
            type:actions.SELECTED_VIDEO_REQUEST
        })

        const {data} = await request.get('/videos',{
            params:{
                part:"snippet,statistics",
                id:id
            }
        })

        // console.log(data.items[0]);

        dispatch({
            type:actions.SELECTED_VIDEO_SUCCESS,
            payload:data.items[0]
        })
        
    } catch (error) {
        console.log(error);

        dispatch({
            type:actions.SELECTED_VIDEO_FAIL,
            payload:error
        })
    }
}


export const getRelatedVideoById = (id) => async dispatch  => {
    try {

        dispatch({
            type:actions.RELATED_VIDEOS_REQUEST
        })

        const {data} = await request.get('/search',{
            params:{
                part:"snippet",
                relatedToVideoId:id,
                maxResults:15,
                type:'video'
            }
        })

        // console.log(data.items[0]);

        dispatch({
            type:actions.RELATED_VIDEOS_SUCCESS,
            payload:data.items
        })
        
    } catch (error) {
        console.log(error);

        dispatch({
            type:actions.RELATED_VIDEOS_FAIL,
            payload:error
        })
    }
}



export const getVideosBySearch = (keyword) => async (dispatch,getState) => {
    try {

        dispatch({
            type: actions.SEARCH_VIDEOS_REQUEST
        })

        const {data} = await request.get("/search" ,{
            params: {
                part:"snippet",
                maxResults:20,
                q:keyword,
                type:"video"
            }
        })

        dispatch({
            type:actions.SEARCH_VIDEOS_SUCCESS,
            payload:data.items,
        })
        
    } catch (error) {
        console.log(error)

        dispatch({
            type:actions.SEARCH_VIDEOS_FAIL,
            payload:error
        })
    }
}
