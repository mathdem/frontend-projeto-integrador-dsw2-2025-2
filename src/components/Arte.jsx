import React from 'react'

const Arte = ({ arte }) => {
    return (
        <div className='col-3 p-0'>
            <div className='p-0 m-1'>
                <div className="card p-1 ">
                    <img src="placeholder.gif" alt="..." />
                    <strong className='text-truncate'>{arte.id} - {arte.descricao}</strong>
                </div>
            </div>
        </div>
    )
}

export default Arte