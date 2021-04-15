import extraerTagsBlog from '../middleware/extraerBlogTags'
export const state = () =>({
	datos:[],
	error: null,
	cargando: true
})

export const mutations = {
	cargarTagsBlog(state, contenido, error){
		if (!error) {
			state.datos = contenido
			state.cargando = false
		}else{
			state.error = error
		}
	},
}

export const actions = {
	async getTagsBlog({commit}) {
	  await extraerTagsBlog({idEnc: ""})
	  .then(contenido =>{
		 commit('cargarTagsBlog',contenido,null)
	  }).catch(error => {
		commit('cargarTagsBlog',null,error)
	  })
	},
}