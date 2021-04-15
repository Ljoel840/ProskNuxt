import extraerCategoriasBlog from '../middleware/extraerBlogCategorias'
export const state = () =>({
	datos:[],
	error: null,
	cargando: true
})

export const mutations = {
	cargarCategoriasBlog(state, contenido, error){
		if (!error) {
			state.datos = contenido
			state.cargando = false
		}else{
			state.error = error
		}
	},
}

export const actions = {
	async getCategoriasBlog({commit}) {
	  await extraerCategoriasBlog({idEnc: ""})
	  .then(contenido =>{
		 commit('cargarCategoriasBlog',contenido,null)
	  }).catch(error => {
		commit('cargarCategoriasBlog',null,error)
	  })
	},
}