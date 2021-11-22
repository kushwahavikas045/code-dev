import React from 'react'

const Cards = ({children}) => {
    return (
        <div className="ui cards" style={{margin:'20px 20px'}}>
            {children}
        </div>
    )
}

export default Cards;
