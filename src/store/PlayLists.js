import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const CREATE = 'playlist/CREATE';
const LOAD = 'playlist/LOAD';

export const create = createAction(CREATE);
export const load = createAction(LOAD);

const initialState = List([
    //Map({'aa':'a'})
]);

export default handleActions({
    [CREATE]: (state, action) => {
        //console.log(action.payload);
        return state.splice(0, 0, Map(action.payload));
    },
    /*
    [LOAD]: (state, action) => {
        return fromJS(action.payload);
    },*/
}, initialState)