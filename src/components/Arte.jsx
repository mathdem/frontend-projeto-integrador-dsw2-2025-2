import React from 'react'

const Arte = ({ arte }) => {
    return (
        <div className='col-4 p-0 bg-purple m-1'>
            <div className="card m-1 p-1 ">
                <img src="placeholder.gif" alt="..." />
            <strong>{arte.id} - {arte.descricao}</strong>
            </div>
        </div>
    )
}

export default Arte