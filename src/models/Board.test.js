import _ from 'lodash';
import Board from './Board';

it('can be initialised', () => {
    const board = new Board(18);
});

it('can set piece on board', () => {
    const board = new Board(18);
    board.setPiece('KNIGHT', 11, 11);
    expect(board.pieces.has(`11,11`)).toBe(true);
    expect(board.pieces.get('11,11')).toBe('KNIGHT');
});

it('can remove piece on board', () => {
    const board = new Board(18);
    board.setPiece('KNIGHT', 11, 11);
    expect(board.pieces.has(`11,11`)).toBe(true);
    expect(board.pieces.get('11,11')).toBe('KNIGHT');

    board.removePiece(11, 11);
    expect(board.pieces.has(`11,11`)).toBe(false);
});

it('can clone self', () => {
    const b1 = new Board(18);
    const b2 = b1.clone();

    expect(b1 === b1).toBe(true);
    expect(b2 === b1).toBe(false);
});

it('isEqual returns true only if 2 boards are same', () => {
    const pieceSet1 = [ ['11,11', 'KNIGHT'] ];
    const pieceSet2 = [ ['1,1', 'KNIGHT'] ];
    const b1 = new Board(18, new Map(pieceSet1));
    const b2 = b1.clone();
    const b3 = new Board(18, new Map(pieceSet2));

    expect(b1.isEqual(b1)).toBe(true);
    expect(b1.isEqual(b2)).toBe(true);
    expect(b1.isEqual(b3)).toBe(false);
});

it('can get correct successors', () => {
    const testSuceessors = [
        new Board(18, new Map([ ['1,2', 'KNIGHT'] ])),
        new Board(18, new Map([ ['1,-2', 'KNIGHT'] ])),
        new Board(18, new Map([ ['-1,2', 'KNIGHT'] ])),
        new Board(18, new Map([ ['-1,-2', 'KNIGHT'] ])),
        new Board(18, new Map([ ['2,1', 'KNIGHT'] ])),
        new Board(18, new Map([ ['2,-1', 'KNIGHT'] ])),
        new Board(18, new Map([ ['-2,1', 'KNIGHT'] ])),
        new Board(18, new Map([ ['-2,-1', 'KNIGHT'] ])),
    ];

    const board = new Board(18, new Map([ ['0,0', 'KNIGHT'] ]));
    const successors = board.getSuccessors();

    expect(!!_.find(successors, findBoard(testSuceessors[0]))).toBe(true);
    expect(!!_.find(successors, findBoard(testSuceessors[1]))).toBe(false);
    expect(!!_.find(successors, findBoard(testSuceessors[2]))).toBe(false);
    expect(!!_.find(successors, findBoard(testSuceessors[3]))).toBe(false);
    expect(!!_.find(successors, findBoard(testSuceessors[4]))).toBe(true);
    expect(!!_.find(successors, findBoard(testSuceessors[5]))).toBe(false);
    expect(!!_.find(successors, findBoard(testSuceessors[6]))).toBe(false);
    expect(!!_.find(successors, findBoard(testSuceessors[7]))).toBe(false);

    function findBoard(board) {
        return (successor) => {
            return successor.isEqual(board);
        };
    }
});