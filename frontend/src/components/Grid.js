import React from 'react'

const Grid = ({children}) => {
    return (
        <div className="ui two column centered grid">
        <div className="column">
            {children}
        </div>
      </div>
    )
}

export default React.memo(Grid);
