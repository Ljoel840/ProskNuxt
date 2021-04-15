<template>
	<aside>
		<span class="cabecera">
			<h4>Mensajes</h4>
			<button class="botonCerrar" @click="$emit('cerrar')"><i class="material-icons">clear</i></button>
		</span>
		<div class="contenedorMensajes">
			<div class="cargando" v-if="conversaciones.cargando">
				<spinner-circular v-if="conversaciones.cargando"/>
			</div> 
			<div class="proskers" v-for="(m,index) in conversaciones.datos" :key="index" @click="sala(m)">
				<img :src="m.ConversationWithUserPhoto" alt=""  @error="replaceByDefault">
				<div class="textos">
					<h4>{{m.ConversationWithUserName}}</h4>
				</div>
				<span class="nuevaNotificacion" v-if="m.ConversationUnreadMessages>0">{{m.ConversationUnreadMessages}}</span>
			</div>
		</div>
		<salaChat :datos="datosChat" @cerrar="mostrarSalaChat=false" v-if="mostrarSalaChat"/>
	</aside>
</template>
<script>
export default {
	name: 'chat',
	components: {
		salaChat: () => import('./salaChat'),
		spinnerCircular: () => import('../spinnerCircular'),
	},
	props:{
		datos:{
			type: Object
		}
	},
	data() {
		return {
			mostrar: false,
			mostrarSalaChat: false,
			datosChat:{}

		}
	},
	created() {
		// this.$store.commit('reiniciarNuevoMensaje')
	},
	computed: {
		mensajes(){
			return this.$store.state.conversaciones.mensajes
		},
		conversaciones(){
			return this.$store.state.conversaciones.conversacion
		}

	},
	methods:{
		sala(datos){
			this.datosChat = datos
			this.$store.commit('conversaciones/restarNuevoMensaje',datos.ConversationUnreadMessages)
			this.$store.commit('conversaciones/actualizarConversaciones',datos)
			this.$store.commit('conversaciones/cargarChatAbierto',datos)
			this.mostrarSalaChat= true
		},
		replaceByDefault(e){
			e.target.src = require('../../assets/img/usuario.png')
		}
	}
}
</script>
<style scoped>
	aside{
		width: 350px;
		height: 500px;
		background-color: var(--e-color);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		position: fixed;
		bottom: 0;
		right: 40px;
		z-index: 10000;
	}
	.cabecera, .enviarMensaje{
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.enviarMensaje{
		height: 80px;
	}
	.cabecera img{
		width: 40px;
		height: 40px;
		min-width: 40px;
		min-height: 40px;
		object-fit: contain;
		border-radius: 20px;
		border: 1px solid var(--a-color);
		margin: 5px;
	}
	.cabecera h4{
		color: var(--c-color);
		width:300px;
		margin-left: 20px
	}
	label{
		width: 300px;
		padding: 10px;
	}
	input{
		padding: 10px;
	}
	.contenedorMensajes{
		background-color: var(--d-color);
		width:100%;
		height: 450px;
		min-height: 450px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		overflow-y: scroll ;
	}

	.form-control{
		width: 100%;
		background-color: var(--d-color);
		color: var(--c-color);
		border: 1px solid var(--h-color);
		border-radius: 7px;
	}

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	color: var(--h-color);
	opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 */
	color:  var(--h-color);
	}

	::-ms-input-placeholder { /* Microsoft Edge */
	color:  var(--h-color);
	}

	button{
		width: 50px;
		height: 50px;
		background-color: transparent;
		border: none;
		outline: none;
		margin: 5px;
		cursor: pointer;
	}
	button img{
		width: 25px;
		height: 25px;
	}
	.mensaje{
		background-color:  var(--j-color);
		border-radius: 7px;
		padding: 10px;
		max-width: 200px;
		margin: 10px;
	}
	.mensaje p{
		color:  var(--c-color);
		font-size: .9em;
	}
	.botonCerrar{
		margin: 0;
	}

	.proskers{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.proskers img{
		width: 40px;
		height: 40px;
		min-width: 40px;
		min-height: 40px;
		object-fit: contain;
		border-radius: 20px;
		border: 1px solid var(--a-color);
		margin: 5px;
	}
	.proskers .textos{
		padding-left: 10px;
	}
	.proskers .textos h4{
		color: var(--a-color);
		font-size: .9em;
	}
	.proskers .textos p{
		color: var(--c-color);
		font-size: .9em;
	}
	.nuevaNotificacion {
		width: 20px;
		height: 20px;
		position: absolute;
		border-radius: 10px;
		background-color: red;
		color: #fff;
		font-size: .7em;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -30px;
		margin-left: 35px
	}
	.cargando{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>