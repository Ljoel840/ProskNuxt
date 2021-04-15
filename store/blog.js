import extraerBlog from '../middleware/extraerBlog'
export const state = () =>({
	datos:[],
	error: null,
	cargando: true
})

export const mutations = {
	cargarBlog(state, contenido, error){
		if (!error) {
			state.datos = contenido
			state.cargando = false
		}else{
			state.error = error
		}
	},
}

export const actions = {
	async getBlog({commit}) {
	  await extraerBlog({idEnc: ""})
	  .then(contenido =>{
		 commit('cargarBlog',contenido,null)
	  }).catch(error => {
		commit('cargarBlog',null,error)
	  })
	},
}