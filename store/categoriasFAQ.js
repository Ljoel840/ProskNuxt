import extraerCategoriasFAQ from '../middleware/extraerCategoriasFAQ'
export const state = () =>({
	datos:[],
	error: null,
	cargando: true
})

export const mutations = {
	cargarCategoriasFAQ(state, contenido, error){
		if (!error) {
			state.datos = contenido
			state.cargando = false
		}else{
			state.error = error
		}
	},
}

export const actions = {
	async getCategoriasFAQ({commit}) {
	  await extraerCategoriasFAQ({idEnc: "3CzpM62xZWsziwYYlxaz7zvEQ7UH2B3BDeasIAQyls4="})
	  .then(contenido =>{
		 commit('cargarCategoriasFAQ',contenido,null)
	  }).catch(error => {
		commit('cargarCategoriasFAQ',null,error)
	  })
	},
}
