import _ from 'lodash';
import React, { Component } from 'react';

export default class Board extends Component {
    render() {
        const { board } = this.props;
        return (
            <table className="chessboard">
                <tbody>{this.renderBoard(board)}</tbody>
            </table>
        );
    }

    renderBoard(board) {
        return _.fill(Array(board.size), 'ROW').map((row, rowIndex) => {
            const cells = _.fill(Array(board.size), 'CELL').map((cell, cellIndex) => {
                const piece = board.getPiece(rowIndex, cellIndex);
                return <td key={`cell-${cellIndex}`} className={piece ? piece.toLowerCase() : ''}></td>;
            });
            return <tr key={`row-${rowIndex}`}>{cells}</tr>;
        });
    }
}