import React from 'react'

const TableRow = ({item, handleOptions}) => {
    return (
        <>
            {/* <h2>Hola</h2> */}
            <tr>
                <th scope='row' className='align-middle'>{item.id}</th>
                <td className='align-middle'>{item.nombre}</td>
                <td className='align-middle'>{item.carrera}</td>
                <td className='align-middle'>{item.foto ? <img src={URL.createObjectURL(item.foto)} alt='Foto' /> : ''}</td>
                <td className="align-middle">
                    <button type='button' className='btn btn-link' onClick={() => handleOptions(item)}>
                        <i className="fas fa-cogs fs-3" ></i>
                        {/* <i className="fas fa-edit"></i> */}
                    </button>
                </td>
            </tr>
        </>
    )
}

export default TableRow