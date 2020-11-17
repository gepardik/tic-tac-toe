import React, {Component} from 'react'
import './App.css'
import Cell from './Game/Cell'

class App extends Component {
    state = {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        currentPlayer: false,    //true => x, false => 0
        winner: false,
        winnerCells: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]

    }

    newGameHandler = () => {
        this.setState({
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            winner: false,
            winnerCells: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ]
        })
    }

    cellClickHandler = (x, y) => {
        if (this.state.winner || this.state.board[x][y]) {
            return
        }
        const currentPlayer = !this.state.currentPlayer
        const board = [...this.state.board]

        currentPlayer ? board[x][y] = 'x' : board[x][y] = 'o'

        const winner = this.checkWinner(x, y, board)

        this.setState({
            board,
            currentPlayer,
            winner
        })
    }

    checkNeighbors = (x, y, board, currentValue, kindOfNeighbors) => {
        let xCoord
        let yCoord
        let winnerCells = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]

        for (let i = 0; i < board.length; i++) {
            switch (kindOfNeighbors) {
                case 'horizontal':
                    xCoord = x
                    yCoord = i
                    break;
                case 'vertical':
                    xCoord = i
                    yCoord = y
                    break;
                case 'diagonal1':
                    xCoord = i
                    yCoord = i
                    break;
                case 'diagonal2':
                    xCoord = i
                    yCoord = board.length - i - 1
                    break;
                default:
                    break;
            }

            if (board[xCoord][yCoord] !== currentValue) {
                winnerCells = []
                return false
            }

            winnerCells[xCoord][yCoord] = 1

            if(i === board.length - 1) {
                this.setState({
                    winnerCells
                })

                return true
            }

        }
        return false
    }

    checkWinner = (x, y, board) => {
        const currentValue = board[x][y]

        if (this.checkNeighbors(x, y, board, currentValue, 'horizontal')) return true
        if (this.checkNeighbors(x, y, board, currentValue, 'vertical')) return true

        if(x === y || ((x === 0 || x === board.length - 1) && (y === 0 || y === board.length-1))) {
            if (this.checkNeighbors(x, y, board, currentValue, 'diagonal1')) return true
            if (this.checkNeighbors(x, y, board, currentValue, 'diagonal2')) return true
        }
        return false
    }

    render() {
        return (
            <div className={'wrapper'}>
                <h1 style={{textAlign: 'center'}}>Tic Tac Toe</h1>
                <div className="grid-container">
                    {
                        this.state.board.map((row, indexX) => {
                            return row.map((cell, indexY) => {
                                let winnerCell = false
                                if(this.state.winner && this.state.winnerCells[indexX][indexY]) {
                                    winnerCell = true
                                }
                                return (
                                    <Cell
                                        value={cell}
                                        key={indexX + '_' + indexY}
                                        onClickCell={this.cellClickHandler.bind(this, indexX, indexY)}
                                        winner={winnerCell}
                                    />
                                )
                            })
                        })
                    }
                </div>
                <div style={{textAlign: 'center'}}>
                    <h3>
                        {this.state.winner
                            ? (
                                <span>
                                    Congratulations! The winner is: <h1>{this.state.currentPlayer ? 'x' : 'o'}</h1>
                                    <button onClick={() => this.newGameHandler() }>New Game</button>
                                </span>
                            )
                            : (<strong> {this.state.currentPlayer ? 'o' : 'x'}, your turn!</strong>)}

                    </h3>
                </div>
            </div>
        )
    }
}

export default App;
