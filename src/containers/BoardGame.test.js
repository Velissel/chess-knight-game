import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from '../utils/store';
import Board from '../models/Board';
import BoardGame from './BoardGame';

it('can render without crashing', () => {
    const board = new Board(18, new Map([ ['11,11', 'KNIGHT'] ]));
    const destination = {x: 5, y: 17};
    const div = document.createElement('div');
    const store = createStore({
        board: {
            board,
            size: 18,
            destination
        }
    });

    ReactDOM.render(<Provider store={store}><BoardGame/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});