import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';
import BoardModel from '../models/Board';

it('can render without crashing', () => {
    const board = new BoardModel(18, new Map([ ['11,11', 'KNIGHT'] ]));
    const destination = {x: 5, y: 17};

    const div = document.createElement('div');

    ReactDOM.render(<Board board={board} destination={destination}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});