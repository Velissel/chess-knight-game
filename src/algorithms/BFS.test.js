import BFS from './BFS';
import Board from '../models/Board';

it('returns correct result', () => {
    const board = new Board(18, new Map([ ['0,0', 'KNIGHT'] ]));
    const goal = new Board(18, new Map([ ['1,2', 'KNIGHT'] ]));

    const result = BFS(
        board,
        goal,
        successor => successor.getSuccessors(),
        (b1, b2) => {
            return b1.isEqual(b2);
        }
    );

    expect(result.length).toBe(2);
    expect(result[0].isEqual(board)).toBe(true);
    expect(result[1].isEqual(goal)).toBe(true);
});