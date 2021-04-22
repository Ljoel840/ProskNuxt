import extraerPublicaciones from '../middleware/extraerPublicaciones'
export const state = () => ({
	datos: [],
	error: null,
	cargando: true,
	idFin: null
})

export const mutations = {
	cargarPublicaciones(state, contenido, error) {
		if (!error&&contenido) {
			state.datos = contenido.frontProsker
			state.idFin = contenido.finEnc
			state.cargando = false
		} else {
			state.error = error
		}
	},
	agregarPublicaciones(state) {
		if (!error&&contenido) {
			contenido.frontProsker.forEach(element => {
				state.datos.push(element)
			});
			state.idFin = contenido.finEnc
			state.cargando = false
		} else {
			state.error = error
		}
	},
}

export const actions = {
	async getPublicaciones({ commit }) {
		await extraerPublicaciones({
			idEnc: "hXwuDUKromgcZVpNrNDjfQ==",
			inicioEnc: "zMFZGK1dnmjF2f1vKUsdmA=="
		}).then(contenido => {
			commit('cargarPublicaciones', contenido, null)
		}).catch(error => {
			commit('cargarPublicaciones', null, error)
		})
	},
	async addPublicaciones(state, { commit }) {
		await extraerPublicaciones({
			idEnc: "hXwuDUKromgcZVpNrNDjfQ==",
			inicioEnc: state.idFin
		}).then(contenido => {
			commit('agregarPublicaciones', contenido, null)
		}).catch(error => {
			commit('agregarPublicaciones', null, error)
		})
	},
}

