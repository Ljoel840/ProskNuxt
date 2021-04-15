<template>
	<aside>
		<span class="cabecera">
			<img :src="datos.ConversationWithUserPhoto" alt="">
			<h4>{{datos.ConversationWithUserName}}</h4>
			<button class="botonCerrar" @click="$emit('cerrar')"><i class="material-icons">clear</i></button>
		</span>
		<div id="contenedorMensajes" class="contenedorMensajes" v-if="!mensajes.cargando" >
			<div class="mensaje" v-for="(m,index) in mensajes.datos" :key="index" :class="!m.MessageFromConversationUser ? 'izquierda':null" >
				<p>{{m.MessageText}}</p>
				<p class="hora">{{m.MessageDate | hora2}}</p>
			</div>
		</div>
		<span  class="enviarMensaje">
			<label>
				<input type="text" v-model="nuevoMensaje" class="form-control" placeholder="Mensaje" v-on:keyup.enter="enviarMensaje(nuevoMensaje)">
			</label>
			<button @click="enviarMensaje(nuevoMensaje)">
				<img src="@/assets/img/i_enviar.png" alt="">
			</button>
		</span>
	</aside>
</template>
<script>
import enviar from '../../middleware/enviarMensaje'
export default {
	props: {
		datos:{
			type: Object
		}
	},
	name: 'salaChat',
	data() {
		return {
			nuevoMensaje:'',
			errorEnvio: null,
			enviandoMensaje: false
		}
	},
	created() {
		this.$store.dispatch('conversaciones/getMensajes',{
			idEnc: this.usuario.idEnc,
			idEncWith: this.datos.ConversationWithUserId
		})
	},
	mounted() {
		},
	updated() {
		this.scrollFinal()
	},
	computed: {
		usuario(){
			return this.$store.state.usuario
		},
		mensajes(){
			return this.$store.state.conversaciones.mensajes
		},
		ahora(){
			return this.$store.state.ahora
		}
	},
	filters: {
		hora(value) {
			if (!value) return ''
			value = value.toString()
			return value.slice(-5)
		},
		hora2(value) {
			var options = {hour: "numeric", minute:"numeric"}
			var date = new Date(value)
			if (!value) return ''
			return date.toLocaleTimeString("es-ES", options)
		},
	},
	methods: {
		scrollFinal(){
			var div = document.getElementById('contenedorMensajes');
    		div.scrollTop = '9999';
		},
		async enviarMensaje(mensaje){
			try{
				let data = {
					idEnc: this.usuario.idEnc,
					idEncWith: this.datos.ConversationWithUserId,
					NewMessage: mensaje,
					MessageFromConversationUser: true,
					MessageStatus: 'Read',
					MessageDate: this.ahora.toISOString()
				}
				this.errorEnvio = null
				this.enviandoMensaje = true
				await enviar({
					idEnc: this.usuario.idEnc,
					idEncWith: this.datos.ConversationWithUserId,
					NewMessage: mensaje
				})
				this.$store.dispatch('conversaciones/getMensajes',{
					idEnc: this.usuario.idEnc,
					idEncWith: this.datos.ConversationWithUserId
				})
				this.nuevoMensaje=''
				this.scrollFinal()
			}
			catch (error){
				this.errorEnvio = error
				console.log(this.errorEnvio)
			}
		}
	},
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
		width:300px
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
		height: 370px;
		min-height: 370px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
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


	/* input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { 
	-webkit-appearance: none; 
	margin: 0; 
	}

	input[type=number] { -moz-appearance:textfield; } */

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
		min-width: 100px;
		margin: 10px;
		box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
	}
	.mensaje p{
		color:  var(--c-color);
		font-size: .9em;
		font-weight: 400;
		font-family: sans-serif;
	}
	.botonCerrar{
		margin: 0;
	}

	.izquierda{
		align-self: flex-start;
		background-color:  var(--e-color);
		
	}
	.mensaje .hora{
		font-size: .7em;
		text-align: right;
		/* font-weight: 600; */
		color:  var(--h-color);
		font-family: sans-serif;
		padding-top: 5px;
	}
</style>