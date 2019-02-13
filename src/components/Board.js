import _ from 'lodash';
import React, { Component } from 'react';

import actions from '../actions';

export default class Board extends Component {
    moveKnight(x, y) {
        const { board, dispatch } = this.props;
        const successors = board.getSuccessors();
        successors.forEach(successor => {
            if (successor.pieces.has(`${x},${y}`)) {
                dispatch(actions.board.setBoardState(successor));
            }
        });
    }

    render() {
        const { board, destination } = this.props;
        return (
            <table className="chessboard">
                <tbody>{this.renderBoard(board, destination)}</tbody>
            </table>
        );
    }

    renderBoard(board, destination) {
        return _.fill(Array(board.size), 'ROW').map((row, rowIndex) => {
            const cells = _.fill(Array(board.size), 'CELL').map((cell, cellIndex) => {
                const piece = board.getPiece(cellIndex, rowIndex);
                let className = '';

                if (rowIndex === destination.y && cellIndex === destination.x) {
                    className = 'destination';
                }
                if (piece) {
                    className = piece.toLowerCase();
                }

                return <td key={`cell-${cellIndex}`} className={className} onClick={() => this.moveKnight(cellIndex, rowIndex)}></td>;
            });
            return <tr key={`row-${rowIndex}`}>{cells}</tr>;
        });
    }
}