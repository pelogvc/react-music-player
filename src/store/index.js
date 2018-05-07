import { combineReducers } from 'redux';

import PlayLists from './PlayLists';
import Player from './Player';

export default combineReducers({
    PlayLists,
    Player,
});