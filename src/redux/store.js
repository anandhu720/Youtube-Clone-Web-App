import { createStore , applyMiddleware , combineReducers } from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { authReducer } from "../redux/reducers/auth.reducer";
import { homeVideosReducer,relatedVideoReducer,searchedVideoReducer,selectedVideoReducer } from '../redux/reducers/videos.reducer';
import { selectedChannelReducer } from '../redux/reducers/channel.reducer';
import { commentListReducer } from './reducers/comments.reducer';

const rootReducer = combineReducers({
    auth : authReducer,
    homeVideos : homeVideosReducer,
    selectedVideo : selectedVideoReducer,
    selectedChannel : selectedChannelReducer,
    commentsList : commentListReducer,
    relatedVideos : relatedVideoReducer,
    searchedVideos : searchedVideoReducer,
})


const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;