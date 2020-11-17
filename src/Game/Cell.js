import React from 'react'

export default function Cell(props) {
    const classes = ["grid-item"]
    if (props.winner) {
        classes.push('win')
    }
    return (
        <div className={classes.join(' ')} onClick={props.onClickCell}>
            {props.value === null ? <span>&nbsp;</span> : props.value }
        </div>
    )
}