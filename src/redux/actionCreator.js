import * as actionTypes from  './actionTypes'

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType,message) =>(dispatch) =>{

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }
    newFeedback.date = new Date().toISOString();

    dispatch(addFeedback(newFeedback));
}

export const addFeedback = (feedBack)=>({
    type: actionTypes.ADD_FEEDBACK,
    payload: feedBack
});