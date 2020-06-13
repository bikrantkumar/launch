import {createStore, combineReducers} from 'redux'
import {createForms} from 'react-redux-form'
import {feedBack} from './contact'

import {InitialFeedback} from './forms'

export const configureStore = ()=>{
    const store = createStore(combineReducers({feedBack: feedBack, 
                                ...createForms(
        {
            feedback : InitialFeedback
        }
        )
    })
);
    
    
    return store
}