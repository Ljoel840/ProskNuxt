import extraerCategorias from '../middleware/extraerCategorias'
export const state = () =>({
	datos:[],
	error: null,
	cargando: true
})

export const mutations = {
	cargarCategorias(state, contenido, error){
		if (!error) {
			state.datos = contenido
			state.cargando = false
		}else{
			state.error = error
		}
	},
}

export const actions = {
	async getCategorias({commit}) {
	  await extraerCategorias({idEnc: "hXwuDUKromgcZVpNrNDjfQ=="})
	  .then(contenido =>{
		 commit('cargarCategorias',contenido,null)
	  }).catch(error => {
		commit('cargarCategorias',null,error)
	  })
	},
}