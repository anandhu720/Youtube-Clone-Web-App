import * as actions from '../actionTypes';


const initialState = {
    videos:[],
    nextPageToken:null,
    loading:false,
    activeCategory:"All"
}

const initialStateSelected = {
    loading:true,
    video:null
}

const initialStateRelated = {
    loadingRelatedVideo:true,
    relatedVideo:null
}

const initialStateSearch = {
    loadingSearchedVideo:true,
    searchedVideo:null
}


export const homeVideosReducer = ( prevState = initialState,action) => {

    const {type,payload} = action;

    switch (type) {
        case actions.HOME_VIDEOS_REQUEST:
            return {
                ...prevState,
                loading:true
            }
        case actions.HOME_VIDEOS_SUCCESS:
            return {
                ...prevState,
                videos:
                
                    prevState.activeCategory === payload.category?
                    [...prevState.videos,...payload.videos]:
                    payload.videos
                
                
                ,
                nextPageToken:payload.nextPageToken,
                loading:false,
                activeCategory:payload.category
            }
        case actions.HOME_VIDEOS_FAIL:
            return {
                ...prevState,
                loading:true,
                error:payload
            }
    
        default:
            return prevState;
    }

}


export const selectedVideoReducer = (prevState = initialStateSelected,action) => {

    const {type,payload} = action;

    switch (type) {
        case actions.SELECTED_VIDEO_REQUEST:
            return{
                ...prevState,
                loading:true
            }
        case actions.SELECTED_VIDEO_SUCCESS:
            return{
                ...prevState,
                video:payload,
                loading:false,
                
            }
        case actions.SELECTED_VIDEO_FAIL:
            return{
                ...prevState,
                error:payload,
                loading:false,
                video:null
            }
    
        default:
            return prevState;
    }
}


export const relatedVideoReducer = (prevState = initialStateRelated,action) => {

    const {type,payload} = action;

    switch (type) {
        case actions.RELATED_VIDEOS_REQUEST:
            return{
                ...prevState,
                loadingRelatedVideo:true
            }
        case actions.RELATED_VIDEOS_SUCCESS:
            return{
                ...prevState,
                relatedVideo:payload,
                loadingRelatedVideo:false,
                
            }
        case actions.RELATED_VIDEOS_FAIL:
            return{
                ...prevState,
                error:payload,
                loadingRelatedVideo:false,
                relatedVideo:null
            }
    
        default:
            return prevState;
    }
}


export const searchedVideoReducer = (prevState = initialStateSearch,action) => {

    const {type,payload} = action;

    switch (type) {
        case actions.SEARCH_VIDEOS_REQUEST:
            return{
                ...prevState,
                loadingSearchedVideo:true
            }
        case actions.SEARCH_VIDEOS_SUCCESS:
            return{
                ...prevState,
                searchedVideo:payload,
                loadingSearchedVideo:false,
                
            }
        case actions.RELATED_VIDEOS_FAIL:
            return{
                ...prevState,
                error:payload,
                loadingSearchedVideo:false, 
                searchedVideo:null
            }
    
        default:
            return prevState;
    }
}