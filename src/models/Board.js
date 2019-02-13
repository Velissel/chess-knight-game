export default class Board {
    constructor(size) {
        this.size = size;
        this.pieces = [];
    }

    /**
     * put a piece into board
     * @param {string} name piece
     * @param {number} x    
     * @param {number} y    
     */
    setPiece(name, x, y) {
        if (x >= this.size || y >= this.size) {
            throw new Error('INVALID_PIECE_LOCATION');
        }
        this.pieces[x] = this.pieces[x] || [];
        this.pieces[x][y] = name;
    }

    /**
     * get a piece at x,y
     * returns undefined if piece does not exist
     * @param  {number} x 
     * @param  {number} y 
     * @return {string}   name of piece
     */
    getPiece(x, y) {
        if (!this.pieces[x]) {
            return undefined;
        }
        return this.pieces[x][y];
    }
}