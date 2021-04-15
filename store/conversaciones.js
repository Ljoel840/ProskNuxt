import extraerConversaciones from '../middleware/extraerConversaciones'
import extraerMensajes from '../middleware/extraerMensajes'
export const state = () => ({
	conversacion:{
		datos:[],
		error: null,
		cargando: true
	},
	nuevoMensaje: 0,
	mensajes:{
		datos:[],
		error: null,
		cargando: true,
	},
	chatAbierto: {},
})


export const mutations = {
	cargarConversaciones(state, contenido, error){
		if (!error) {
			state.conversacion.datos = contenido
			if (state.conversacion.cargando) {
				state.conversacion.cargando = false
			}
		}else{
			state.error = error
		}
	},
	incrementarNuevoMensaje(state,cantidad){
		state.nuevoMensaje = state.nuevoMensaje + cantidad
	},
	inicializarNuevoMensaje(state){
		state.nuevoMensaje = 0
	},
	cargarConversacione(state, contenido, error){
		if (!error) {
			state.conversacion.datos = contenido
			state.conversacion.cargando = false
		}else{
			state.conversacion.error = error
		}
	},	
	cargarMensajes(state, contenido, error){
		if (!error) {
			state.mensajes.datos = contenido
			state.mensajes.cargando = false
		}else{
			state.mensajes.error = error
		}
	},
	sumarNuevoMensaje(state){
		state.nuevoMensaje++
		state.conteoAnteriorMensaje++
	},
	restarNuevoMensaje(state,cuantos){
		state.nuevoMensaje = state.nuevoMensaje - cuantos
		state.conteoAnteriorMensaje = state.nuevoMensaje
	},
	actualizarConversaciones(state,datos){
		state.conversacion.datos.forEach(e=>{
			if (e.ConversationWithUserId===datos.ConversationWithUserId) {
				e.ConversationUnreadMessages = 0
			}
		})
	},
	cargarChatAbierto(state,datos){
		state.chatAbierto = datos
	}
}

export const actions = {
	async getConversaciones({commit},id) {
	  await extraerConversaciones({idEnc: id})
	  .then(contenido =>{
		 commit('cargarConversaciones',contenido,null)
		 commit('inicializarNuevoMensaje')
		 contenido.forEach(e=>{
			commit('incrementarNuevoMensaje',e.ConversationUnreadMessages)
		})
	  }).catch(error => {
		commit('cargarConversaciones',null,error)
	  })
	},
	
	async getMensajes({commit},data) {
		await extraerMensajes(data)
		.then(contenido =>{
		   commit('cargarMensajes',contenido,null)
		}).catch(error => {
		  commit('cargarMensajes',null,error)
		})
	  },



}







// verActualizacionesMensajes(state,id){
// 	extraerConversaciones({idEnc: id})
// 	.then(contenido =>{
// 		state.conversaciones.datos = contenido
// 		state.nuevoMensaje = 0
// 		state.conversaciones.datos.forEach(e=>{
// 			state.nuevoMensaje = state.nuevoMensaje+e.ConversationUnreadMessages
// 		})
// 	}).catch(error => {
// 		state.conversaciones.error = error
// 	})
// },
// cargarChatAbierto(state,datos){
// 	state.chatAbierto = datos
// },
// borrarChatAbierto(state){
// 	state.chatAbierto = {}
// },