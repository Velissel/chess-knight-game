import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import _ from 'lodash';

import actions from '../actions';
import Board from '../components/Board';

class BoardGame extends Component {
    constructor(props) {
        super(props);
        this.onGameSetupSubmit = this.onGameSetupSubmit.bind(this);

        this.state = {
            size: ''
        };
    }

    onGameSetupSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { size } = this.state;

        if (_.isFinite(Number(size))) {
            dispatch(actions.board.setBoardSize(Number(size)));
            dispatch(actions.board.putRandomPiecesOnBoard());
        }
    }

    render() {
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
                { board && <Board board={board} destination={destination}/>}
            </Container>
        );
    }
}

export default connect(state => {
    return {
        board: state.board
    };
})(BoardGame);
