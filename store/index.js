import extraerBlog from '../middleware/extraerBlog'

export const state = () => ({
	// ancho: window.innerWidth,
	// 	scrollY: window.scrollY,
		proskersDestacados:[],
		nuevoMensaje: 0,
		conteoAnteriorMensaje:0,
		ahora: null,
		chatAbierto: {},
		marcadores:[],
		seo:{
			datos:[],
			error: null,
			cargando: true
		}
})


export const mutations = {
	setearHora (state) {
		state.ahora = new Date()
	},
	cargarSeo(state, contenido, error){
		if (!error) {
			state.seo.datos = contenido
			state.seo.cargando = false
		}else{
			state.seo.error = error
		}
	},
}

export const actions = {
	async nuxtServerInit({ commit }) {
		commit('setearHora')
		await extraerBlog({idEnc: ""})
		.then(contenido =>{
		   commit('cargarSeo',contenido,null)
		}).catch(error => {
		  commit('cargarSeo',null,error)
		})
  }
}
