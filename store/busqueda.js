export const state = () =>({
	datos: [],
	idFin: null,
	error: null,
	cargando: true,
	hayMas: true,
	marcadores:[]
})

export const mutations = {

	cargarBusqueda(state,contenido){
		state.cargando = true
	
		if(state.datos.map(e=>e.idEnc).indexOf(contenido.frontProsker[0].idEnc)<0){
			contenido.frontProsker.forEach(element => {
				state.datos.push(element)
			});
		}else{
			state.hayMas = false
		}
		if (state.idFin === contenido.finEnc) {
			state.hayMas = false
		}
		if (contenido.frontProsker.length<20) {
			state.hayMas = false
		}
		state.idFin = contenido.finEnc
		state.cargando = false
		state.datos.forEach(e=>{
			var geolocacion = e.SkillGeolocation.split(',')
			state.marcadores.push({
				posicion:{
					lat:parseFloat(geolocacion[0]),
					lng:parseFloat(geolocacion[1])
				},
				titulo: e.nombre
			})
		})
		
	},
	limpiarBusqueda(state){
		state.datos = []
		state.hayMas = true
		state.idFin = ""
		state.cargando = false
		state.marcadores = []
	},
}





