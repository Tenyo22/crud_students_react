import React, { useState } from 'react'
import TableRow from './TableRow'
import '../styles/miFormulario.css'
import Swal from 'sweetalert2'
import { addStudents, editStudent, handleChangeCarrera, handleDelete, handleImageChange } from '../js/crudOptions'

const MiFormulario = () => {

    // Opciones del Combobox de Carrera
    const opcionesCarrera = [
        { value: '0', label: '-- Seleccione --' },
        { value: '1', label: 'Lic. en Ingenieria en Sistemas Computacionales' },
        { value: '2', label: 'Lic. en Ingenieria Logistica' },
        { value: '3', label: 'Lic. en Administracion' },
        { value: '4', label: 'Lic. en Ingenieria Industrial' },
        { value: '5', label: 'Lic. en Ingenieria Quimica' },
        { value: '6', label: 'Lic. en Ingenieria Electrica' },
        { value: '7', label: 'Lic. en Ingenieria en TICs' }
    ]

    // Hooks
    const [infoStudent, setInfoStudent] = useState([])
    const [matricula, setMatricula] = useState('') // Hook para matricula del estudiante
    const [nombre, setNombre] = useState('') // Hook para nombre del estudiante
    const [carrera, setCarrera] = useState(opcionesCarrera[0]) // Hook para Carrera
    const [imagen, setFoto] = useState(null) // Hook para Foto
    const [disabled, setDisabled] = useState(false) //Hook para deshabilitar campo de Matricula
    const [enviar, setEnviar] = useState('Guardar Datos') // Hook para modificar boton de enviar

    // Construye objeto de informacion de alumno
    const handleFormSubmit = (event) => {
        event.preventDefault()

        // const id = event.target.matricula.value
        // const name = event.target.nombre.value
        // const carrera = event.target.carrera.value

        // console.log(disabled)
        if (disabled === true) {
            const options = {infoStudent, matricula, carrera, imagen, setInfoStudent, nombre, clean, setDisabled, setEnviar}
            editStudent(options)

        } else if (Number(carrera.value) === 0) {
            // alert('Seleccione una carrera valida!')
            Swal.fire(
                'Selecciona una carrera valida!',
                '',
                'info'
            )
        } else {
            const valMatricula = infoStudent.find(id => id.id === matricula)
            // console.log(valMatricula.id)
            if (valMatricula) {
                // alert('La matricula que ingresaste, ya existe!')
                Swal.fire(
                    'La matricula que ingresaste, ya existe!',
                    '',
                    'info'
                )
            } else {
                // Agregar nuevo alumno
                const datos = { id: matricula, nombre: nombre, carrera: carrera.label, foto: imagen }
                addStudents(datos,clean,setDisabled, setInfoStudent, infoStudent)
            }
        }
    }
    

    const clean = () => {
        setMatricula('')
        setNombre('')
        setCarrera(opcionesCarrera[0])
        setFoto(null)
    }

    const handleEdit = (item) => {
        setMatricula(item.id)
        setNombre(item.nombre)
        setCarrera(opcionesCarrera.find(option => option.label === item.carrera))
        // setCarrera(item.carrera)
        setFoto(item.foto)
        setDisabled(true)
        setEnviar('Actualizar Datos')

        // console.log(item)
    }

    const handleOptions = (item) => {
        Swal.fire({
            title: 'Elige la opcion que desea hacer:',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Edit',
            denyButtonText: `Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // Swal.fire('Saved!', '', 'success')
                handleEdit(item)
            } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
                handleDelete(item, setInfoStudent, infoStudent, clean, setDisabled, setEnviar)
            }
        })
    }

    return (
        <>
            <div className='container'>
                <div className='card'>
                    <h1 className='card-header text-center'>Registro de Alumnos - Linces</h1>
                    <div className='card-body'>
                        <div className='form'>
                            <form onSubmit={handleFormSubmit}>
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Matricula:</span>
                                            <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={matricula} onChange={(e) => setMatricula(e.target.value)} disabled={disabled} required/>
                                        </div>

                                        {/* <label>Matricula: <input type="number" value={matricula} onChange={(e) => setMatricula(e.target.value)} /></label> */}
                                    </div>

                                    <div className='col-md-6'>
                                        <div className="input-group mb-default">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre:</span>
                                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                        </div>

                                        {/* <label>Nombre:
                                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </label> */}
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label> Carrera:
                                        </label>
                                        <select className="form-select" aria-label="Default select example" id='carrera' value={carrera.value} onChange={(e) => handleChangeCarrera(e, setCarrera, opcionesCarrera)}>
                                            {opcionesCarrera.map((opcion) => (
                                                <option key={opcion.value} value={opcion.value}>
                                                    {opcion.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='col-md-6'>
                                        <label className='input-group'>Foto:
                                            <div className="input-group mb-3">
                                                <input type="file" className="form-control" id="inputGroupFile02" accept='image/*' onChange={(e) => handleImageChange(e, setFoto)} />
                                                {/* <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label> */}
                                            </div>
                                            {/* <input type="file" accept='image/*' onChange={(e) => handleImageChange(e)} /> */}
                                        </label>
                                    </div>
                                </div>

                                <div className='row'>
                                    {imagen && <div className='text-center'>Archivo seleccionado: {imagen.name}</div>}
                                </div>

                                <div className='text-center d-grid col-4 mx-auto'>
                                    <button className='btn btn-primary text-align' type="submit">{enviar}</button>

                                </div>
                            </form>
                        </div > {/*Cierra form */}
                    </div> {/* Cierra card-body */}
                </div> {/* Cierra card */}


                <br />
                <div className='row'>
                    {/* Tabla de alumnos */}
                    <h2>Tabla de Estudiantes</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Matricula</th>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Carrera</th>
                                <th scope='col'>Foto</th>   
                                <th scope='col'>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {infoStudent.map((item, index) => (
                                <TableRow key={index} item={item} handleOptions={handleOptions}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}

export default MiFormulario