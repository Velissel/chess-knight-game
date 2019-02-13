export default class Board {
    constructor(size, pieces) {
        this.size = size;
        this.pieces = pieces || new Map();
    }

    /**
     * put a piece into board
     * expect KNIGHT
     * @param {string} name piece
     * @param {number} x    
     * @param {number} y    
     */
    setPiece(name, x, y) {
        if (x >= this.size || y >= this.size) {
            throw new Error('INVALID_PIECE_LOCATION');
        }
        this.pieces.set(`${x},${y}`, name);
    }

    /**
     * get a piece at x,y
     * returns undefined if piece does not exist
     * @param  {number} x 
     * @param  {number} y 
     * @return {string}   name of piece
     */
    getPiece(x, y) {
        return this.pieces.get(`${x},${y}`);
    }

    /**
     * remove a piece from board
     * @param  {number} x 
     * @param  {number} y 
     * @return {boolean}   if a piece is remove, true is returned, otherwise false is returned
     */
    removePiece(x, y) {
        return this.pieces.delete(`${x},${y}`);
    }

    /**
     * returns all possible successors of this board
     * currently only moves of KNIGHT is supported
     * @return {array} array of Board
     */
    getSuccessors() {
        const successors = [];

        for(const [key, piece] of this.pieces) {
            // moves for knight
            if (piece === 'KNIGHT') {
                const x = Number(key.split(',')[0]);
                const y = Number(key.split(',')[1]);

                if (x + 2 < this.size) {
                    if (y + 1 < this.size && !this.pieces.has(`${x+2},${y+1}`)) {
                        successors.push(createSuccessor(this, 'KNIGHT', {x,y}, {x: x+2, y: y+1}));
                    }
                    if (y - 1 >= 0 && !this.pieces.has(`${x+2},${y-1}`)) {
                        successors.push(createSuccessor(this, 'KNIGHT', {x,y}, {x: x+2, y: y-1}));
                    }
                }

                if (x - 2 >= 0) {
                    if (y + 1 < this.size && !this.pieces.has(`${x-2},${y+1}`)) {
                        successors.push(createSuccessor(this, 'KNIGHT', {x,y}, {x: x-2, y: y+1}));
                    }
                    if (y - 1 >= 0 && !this.pieces.has(`${x-2},${y-1}`)) {
                        successors.push(createSuccessor(this, 'KNIGHT', {x,y}, {x: x-2, y: y-1}));
                    }
                }

                if (x + 1 < this.size) {
                    if (y + 2 < this.size && !this.pieces.has(`${x+1},${y+2}`)) {
                        successors.push(createSuccessor(this, 'KNIGHT', {x,y}, {x: x+1, y: y+2}));
                    }
                    if (y - 2 >= 0 && !this.pieces.has(`${x+1},${y-2}`)) {
                        successors.push(createSuccessor(this, 'KNIGHT', {x,y}, {x: x+1, y: y-2}));
                    }
                }

                if (x - 1 >= 0) {
                    if (y + 2 < this.size && !this.pieces.has(`${x-1},${y+2}`)) {
                        successors.push(createSuccessor(this, 'KNIGHT', {x,y}, {x: x-1, y: y+2}));
                    }
                    if (y - 2 >= 0 && !this.pieces.has(`${x-1},${y-2}`)) {
                        successors.push(createSuccessor(this, 'KNIGHT', {x,y}, {x: x-1, y: y-2}));
                    }
                }
            }

            // moves for other pieces...
        }

        return successors;
    }

    /**
     * get clone of self
     * @return {Board} 
     */
    clone() {
        return new Board(this.size, new Map(this.pieces));
    }

    /**
     * equality check, returns true if 2 boards are completely same
     * @param  {Board}  board 
     * @return {Boolean}       
     */
    isEqual(board) {
        if (board.size !== this.size) {
            return false;
        }

        for(const [key, piece] of this.pieces) {
            if (!board.pieces.has(key)) {
                return false;
            }
            if (board.pieces.get(key) !== piece) {
                return false;
            }
        }

        return true;
    }
}

function createSuccessor(board, piece, from, to) {
    const clone = board.clone();
    clone.removePiece(from.x, from.y);
    clone.setPiece(piece, to.x, to.y);
    return clone;
}