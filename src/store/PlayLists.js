import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const CREATE = 'playlist/CREATE';
const LOAD = 'playlist/LOAD';

export const create = createAction(CREATE);
export const load = createAction(LOAD);

const initialState = List([]);

export default handleActions({
    [CREATE]: (state, action) => {
        const lyrics = action.payload.lyrics 
                    && action.payload.lyrics.split('#').map((v) => ({
                        time: v.split('|')[0], 
                        content: v.split('|')[1],
                    }));

        return state.splice(0, 0, Map({
            ...action.payload,
            lyrics,
        }));
    },
}, initialState)