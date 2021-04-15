/*
    Traer Usuario local
*/
// import extraerDatos from "../pa_datos/extraerDatos";

const clave = 'dfsUsr'//`dfsUsr${process.env.VUE_APP_VERSION}`

export function local (context) {
    if (localStorage.getItem(clave)) {
        context.commit('actualizar', JSON.parse(localStorage.getItem(clave)))
    }
}

export function enviarLocal (state) {
    localStorage.setItem(clave, JSON.stringify({
        ok: state.ok,
        nombre: state.nombre,
        idEnc: state.idEnc,
        vsEnc: state.vsEnc,
        key: state.key,
        instructor: state.instructor,
        admin: state.admin
    }))
}

// export function cargarAbonados(state) {
// 	let datosCargados = []
// 	state.asociados.forEach(e => {
// 		var datos = new Object
// 		var datos2 = new Object
// 		datos.idEnc = e.idEnc
// 		datos.error = null
// 		datos.cargando = true
// 		datos.campos = []
// 		extraerDatos(datos)
// 		datos2.idEnc = e.idEnc
// 		datos2.data = datos.campos
// 		datosCargados.push(datos2)
// 	});
// }