import * as actionTypes from './actionTypes'

export const feedBack = (state={
    isLoading : false,
    feedBack: [],
    errMess : null
    },action) =>{
    switch(action.type){
        case actionTypes.ADD_FEEDBACK:
            var newfeedback = action.payload

            return {...state, feedBack: state.feedBack.concat(newfeedback)}
        default:
            return state 
    }

}