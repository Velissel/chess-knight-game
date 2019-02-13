import _ from 'lodash';

import actions from '../actions';
import Board from '../models/Board';

const initState = {
    board: null,
    size: null
};
const {
    SET_BOARD_SIZE,
    PUT_RANDOM_PIECES_ON_BOARD
} = actions.board;

export default (state = initState, action) => {
    if (action.type === SET_BOARD_SIZE) {
        const size = action.payload;
        return Object.assign({}, state, {
            board: new Board(size),
            size
        });
    }

    if (action.type === PUT_RANDOM_PIECES_ON_BOARD) {
        const board = state.board;
        const size = board.size;
        const destination = generateRandomPosition(size);
        const knight = generateRandomPosition(size, [destination]);

        board.setPiece('DESTINATION', destination.x, destination.y);
        board.setPiece('KNIGHT', knight.x, knight.y);

        return Object.assign({}, state, {
            board
        });
    }
    
    return state;
}

function generateRandomPosition(range, avoid = []) {
    const x = Math.round(Math.random() * (range - 1));
    const y = Math.round(Math.random() * (range - 1));

    const isFound = !!_.find(avoid, pos => {
        return pos.x === x && pos.y === y;
    });

    if (isFound) {
        return generateRandomPosition(range, avoid);
    }
    return {x, y};
}