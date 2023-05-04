const { default: Swal } = require("sweetalert2")

// Evento que cambia la carrera
module.exports.handleChangeCarrera = (e, setCarrera, opcionesCarrera) => {
    // setCarrera(event.target.value);
    // Expresion de busqueda, devuelve el objeto de la opcion que coincida con
    // el valor seleccionado por el usuario
    setCarrera(opcionesCarrera.find(option => option.value === e.target.value))
    // console.log(e.target.value);
}

// Verificar que el archivo sea una imagen
module.exports.handleImageChange = (e, setFoto) => {
    const file = e.target.files[0]

    // console.log(file)
    if (file && file.type.substr(0, 5) !== 'image') {
        setFoto(null)
        // alert('Seleccione una imagen valida!')
        Swal.fire(
            'Selecciona una imagen valida!',
            '',
            'info'
        )
    } else if (file && file.name) {
        setFoto(file)
    } else {
        setFoto(null)
    }
}


module.exports.addStudents = (datos, clean, setDisabled, setInfoStudent, infoStudent) => {
    // console.log(datos)
    setInfoStudent([...infoStudent, datos])
    clean()
    setDisabled(false)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Alumno agregado',
        showConfirmButton: false,
        timer: 1500
    })
}

module.exports.editStudent = (options) => {
    // Se obtiene el indice con la bisqueda de la mtricula
    const infoStudentIndex = options.infoStudent.findIndex(student => student.id === options.matricula)
    // console.log(infoStudentIndex)
    // Respaldo y modificacion de la nueva informacion
    const datosAct = options.infoStudent[infoStudentIndex]

    datosAct.nombre = options.nombre
    datosAct.carrera = options.carrera.label
    datosAct.foto = options.imagen

    // Copia del hook del arreglo de informacion del alumno
    const copyInfoStudent = [...options.infoStudent]

    // Se actualiza el arreglo de la informacion
    copyInfoStudent[infoStudentIndex] = datosAct
    options.setInfoStudent(copyInfoStudent)

    // console.log(datosAct)
    // console.log(infoStudent)
    // Se actualiza el hook
    options.setInfoStudent(options.infoStudent)
    // setInfoStudents([...infoStudent])

    options.clean()
    options.setDisabled(false)
    options.setEnviar('Guardar Datos')
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos Actualizados',
        showConfirmButton: false,
        timer: 1500
    })
}

module.exports.handleDelete = (item, setInfoStudent, infoStudent, clean, setDisabled, setEnviar) => {
    // console.log(item)
    // const confirmation = window.confirm('Are you sure you want to delete this item?')
    Swal.fire({
        title: 'Are you sure?',
        text: "No podras revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            setInfoStudent(infoStudent.filter(student => student.id !== item.id))
            // console.log(infoStudent)

            clean()
            setDisabled(false)
            setEnviar('Guardar Datos')
            Swal.fire(
                'Deleted!',
                'El registro ha sido eliminado.',
                'success'
            )
        }
    })
}