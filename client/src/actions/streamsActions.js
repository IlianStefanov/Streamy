import { CREATE_STREAM, GET_ALL_STREAMS } from './types';
import streams from '../api/streams';

export const createStream = streamData => {
    // const {userId, title, description} = streamData;
    

    return dispatch => {
        streams.post("/streams", streamData).then(res => {
            dispatch({type: CREATE_STREAM});
        }).catch(err => console.log(err));
    }

    // return {
    //     type: CREATE_STREAM,
    //     payload: {
    //         userId,
    //         title,
    //         description
    //     }
    // }
}

export const getAllStreams = () => {

}