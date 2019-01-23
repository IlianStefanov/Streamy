
import { CREATE_STREAM } from '../actions/types';

const initialState = {
    title: "",
    description: "",
    userId: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CREATE_STREAM: 
        return { 
            ...state,
            title: action.payload.title,
            description: action.payload.description,
            userId: action.payload.userId
        }

        default: 
        return state;
    }
}