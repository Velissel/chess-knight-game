import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, ButtonToolbar, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import _ from 'lodash';

import actions from '../actions';
import Board from '../components/Board';
import BoardModel from '../models/Board';
import BFS from '../algorithms/BFS';

class BoardGame extends Component {
    constructor(props) {
        super(props);
        this.onGameSetupSubmit = this.onGameSetupSubmit.bind(this);
        this.help = this.help.bind(this);

        this.state = {
            size: ''
        };
    }

    onGameSetupSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { size } = this.state;

        if (_.isFinite(Number(size)) && Number(size) > 0) {
            dispatch(actions.board.setBoardSize(Number(size)));
            dispatch(actions.board.putRandomPiecesOnBoard());
        }
    }

    help(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { board, destination } = this.props.board;
        const goal = new BoardModel(board.size);
        goal.setPiece('KNIGHT', destination.x, destination.y);

        const path = BFS(board, goal, item => {
            return item.getSuccessors();
        }, (item1, item2) => {
            return item1.isEqual(item2);
        });
        console.log(path);
        if (!path) {
            alert('Unable to find solution...');
        } else {
            path.forEach((board, i) => {
                setTimeout(() => {
                    dispatch(actions.board.setBoardState(board));
                }, 1000 * i);
            });
        }
    }

    render() {
        const { dispatch } = this.props;
        const { board, destination } = this.props.board;
        return (
            <Container>
                <h1>Simple Chess Game</h1>
                <div className="mb-3">
                    <Form onSubmit={this.onGameSetupSubmit}>
                        <InputGroup>
                            <FormControl placeholder="Board size, eg. 18" onChange={e => this.setState({size: e.target.value})} value={this.state.size}/>
                            <InputGroup.Append>
                                <Button type="submit">Start</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </div>
                { board && <div className="mb-3"><Board board={board} destination={destination} dispatch={dispatch}/></div>}
                { board && <ButtonToolbar><Button onClick={this.help}>Help</Button></ButtonToolbar>}
            </Container>
        );
    }
}

export default connect(state => {
    return {
        board: state.board
    };
})(BoardGame);
