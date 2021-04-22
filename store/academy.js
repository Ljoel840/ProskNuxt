import extraerAcademy from '../middleware/extraerAcademy'
export const state = () =>({
	datos:[],
	error: null,
	cargando: true
})

export const mutations = {
	cargarAcademy(state, contenido, error){
		if (!error) {
			state.datos = contenido
			state.cargando = false
		}else{
			state.error = error
		}
	},
}

export const actions = {
	async getAcademy({commit}) {
	  await extraerAcademy({idEnc: ""})
	  .then(contenido =>{
		 commit('cargarAcademy',contenido,null)
	  }).catch(error => {
		commit('cargarAcademy',null,error)
	  })
	},
}
