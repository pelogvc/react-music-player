import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const PLAY = 'player/PLAY';
const REPEAT = 'player/REPEAT';
const RANDOM = 'player/RANDOM';
const SET_PROGRESS = 'player/SET_PROGRESS';
const PLAY_FUNCTION = 'player/PLAY_FUNCTION';
const TOGGLE_PLAYLIST = 'player/TOGGLE_PLAYLIST';

export const play = createAction(PLAY);
export const repeat = createAction(REPEAT);
export const random = createAction(RANDOM);
export const set_progress = createAction(SET_PROGRESS);
export const play_function = createAction(PLAY_FUNCTION);
export const toggle_playlist = createAction(TOGGLE_PLAYLIST);

const initialState = Map({
                        'playing': false,
                        'playfunction': false,
                        'progress': 0,
                        'playIndex': 0,
                        'repeat': false,
                        'random': false,
                        'volume': 1.0,
                        'playlist': false,
                    });

export default handleActions({
    [PLAY]: (state, action) => {
        return state.set('playing', action.payload);
    },
    [PLAY_FUNCTION]: (state, action) => {
        return state.set('playfunction', action.payload);
    },
    [REPEAT]: (state, action) => {
        return state.set('repeat', action.payload);
    },
    [RANDOM]: (state, action) => {
        return state.set('random', action.payload);
    },
    [SET_PROGRESS]: (state, action) => {
        return state.set('progress', action.payload);
    },
    [TOGGLE_PLAYLIST]: (state, action) => {
        return state.set('playlist', action.payload);
    }
}, initialState)