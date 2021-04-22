import extaerProskers from '../middleware/extraerProskers'

export const state = () => ({
	datos: [],
	error: null,
	cargando: true,
	cantidad: 0,
	proskersDestacados: []
})

export const mutations = {
	cargarProskers(state, contenido, error) {
		if (!error) {
			state.datos = contenido
			state.cargando = false
			if (contenido) {
				state.cantidad = contenido.length
				contenido.forEach(e => {
					var registroDatos = {}
					e.Categories.forEach(e2 => {
						if (e2.SkillFeaturedOrder != 0) {
							registroDatos.idCat = e2.WorkFieldId
							registroDatos.nombreCategoria = e2.WorkFieldName
						}
					})
					if (registroDatos.idCat) {
						registroDatos.nombre = e.nombre
						registroDatos.idEnc = e.idEnc
						registroDatos.foto = e.UserPhotoImageUrl
						state.proskersDestacados.push(registroDatos)
					}
				})
			}

		} else {
			state.error = error
		}
	},
}


export const actions = {
	async getProskers({ commit }) {
		await extaerProskers({ idEnc: "hXwuDUKromgcZVpNrNDjfQ==" })
			.then(contenido => {
				commit('cargarProskers', contenido, null)
			}).catch(error => {
				commit('cargarProskers', null, error)
			})
	},
}