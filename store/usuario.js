import {local, enviarLocal} from '../middleware/x_local'
import login from '../middleware/x_login'
import logout from '../middleware/x_logout'
import registro from '../middleware/x_registro'

export const state = () => ({
	ok: false,
	nombre: null,
	idEnc: null,
	vsEnc: null,
	key: null,
	admin: false,
	asociados: [],
  })

export const mutations = {
	actualizar (state, usuario) {
		state.ok = usuario.ok
		state.nombre = usuario.nombre
		state.idEnc = usuario.idEnc
		state.vsEnc = usuario.vsEnc
		state.key = usuario.key
		state.admin = usuario.admin
		state.asociados = usuario.asociados
		if(process.browser){
			enviarLocal (state)
		}
	},
}

export const actions = {
	login, logout, local, registro
}