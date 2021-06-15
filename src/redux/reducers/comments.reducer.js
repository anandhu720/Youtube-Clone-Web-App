import * as actions from '../actionTypes';

const initialState = {
    loading: true,
    comments:null
}

export const commentListReducer = (prevState = initialState,action) => {

    const {type,payload} = action;

    switch (type) {
        case actions.COMMENT_LIST_REQUEST:
            return{
                ...prevState,
                loading: true
            }
        case actions.COMMENT_LIST_SUCCESS:
            return{
                ...prevState,
                loading:false,
                comments:payload
            }
        case actions.COMMENT_LIST_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        default:
            return prevState;
    }
}