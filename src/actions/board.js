export default {
    SET_BOARD_SIZE: 'SET_BOARD_SIZE',
    setBoardSize(size) {
        return {
            type: this.SET_BOARD_SIZE,
            payload: size
        };
    },
    PUT_RANDOM_PIECES_ON_BOARD: 'PUT_RANDOM_PIECES_ON_BOARD',
    putRandomPiecesOnBoard() {
        return {
            type: this.PUT_RANDOM_PIECES_ON_BOARD
        };
    }
};