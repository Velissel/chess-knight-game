import _ from 'lodash';
import React, { Component } from 'react';

export default class Board extends Component {
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
                const piece = board.getPiece(rowIndex, cellIndex);
                let className = '';

                if (piece) {
                    className = piece.toLowerCase();
                }
                if (rowIndex === destination.y && cellIndex === destination.x) {
                    className = 'destination';
                }

                return <td key={`cell-${cellIndex}`} className={className}></td>;
            });
            return <tr key={`row-${rowIndex}`}>{cells}</tr>;
        });
    }
}