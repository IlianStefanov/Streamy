import { LOG_IN_WITH_GOOGLE, LOG_OUT } from './types';

export const logInWithGoogle = userId => {
    return {
        type: LOG_IN_WITH_GOOGLE,
        payload: userId
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT
    }
}