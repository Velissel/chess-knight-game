import actions from '../actions';
import Board from '../models/Board';

const initState = {
    board: null,
    size: null
};
const {
    SET_BOARD_SIZE
} = actions.board;

export default (state = initState, action) => {
    switch (action.type) {
        case SET_BOARD_SIZE:
            const size = action.payload;
            return Object.assign({}, state, {
                board: new Board(size),
                size
            });
        default:
            return state
    }
}