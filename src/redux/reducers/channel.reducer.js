import * as actions from '../actionTypes';

const initialState = {
    loading: true,
    channel:{},
    subscriptions:false
}

export const selectedChannelReducer = (prevState = initialState,action) => {

    const {type,payload} = action;

    switch (type) {
        case actions.SELECTED_CHANNEL_REQUEST:
            return{
                ...prevState,
                loading:true
            }
        case actions.SELECTED_CHANNEL_SUCCESS:
            return{
                ...prevState,
                channel:payload,
                loading:false,
                
            }
        case actions.SELECTED_CHANNEL_FAIL:
            return{
                ...prevState,
                loading:false,
                channel:null,
                error:payload,
            }
        case actions.SET_SUBSCRIPTION_DETAILS:
            return{
                ...prevState,
                subscription:payload,
                loading:false,

            }
    
        default:
            return prevState;
    }
}