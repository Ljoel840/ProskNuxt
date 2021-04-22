<template>
	<section>
		<div class="fondoTitulo">
			<h1>Contacto</h1>
		</div>
		
		<div class="contenedor">
			<img src="@/assets/img/separador2.png" alt="separador" class="separador">
			<div class="formulario">
				<h4>Complete los siguientes datos y nos contactaremos con Ud.</h4>
				<label>
					<img src="@/assets/img/i_user.png" alt="icono Usuario" class="iconoForm">
					<input type="text" class="form-control " placeholder="Nombre y Apellido" autocomplete="off" v-model="datos.nombre">
				</label>
					<p v-if="errorNombre">{{errorNombre}}</p>
				<label>
					<img src="@/assets/img/i_mail.png" alt="icono email" class="iconoForm">
					<input type="mail" class="form-control " placeholder="Correo Electrónico" autocomplete="off" v-model="datos.correo">
				</label>
					<p v-if="errorCorreo">{{errorCorreo}}</p>
				<label>
					<img src="@/assets/img/i_phone.png" alt="icono Teléfono" class="iconoForm">
					<input type="tel" class="form-control" placeholder="Nro. de Teléfono" autocomplete="off" v-model="datos.telefono">
				</label>	
					<p v-if="errorTelefono">{{errorTelefono}}</p>
				<label>
					<img src="@/assets/img/i_message.png" alt="icono Mensaje" class="iconoForm">
					<textarea v-model="datos.mensaje" class="form-control" placeholder="Comentario" rows="4" ></textarea> 
				</label>
					<p v-if="errorMensaje">{{errorMensaje}}</p>
				<br>
				<button class="botonAceptar" @click="enviar()">Enviar</button>					
			</div>
		</div>
		<div id="snackbar">{{mensajeEnvio}}</div>
	</section>
</template>
<script>
import valida from '../middleware/validar'
// let emailjs = require("emailjs-com");
export default {
	name: 'contacto',

	components: {
		barra: () => import('@/components/barra'),
		buscar: () => import('@/components/buscar')
	},
	data() {
		return {
			datos:{
				nombre: '',
				correo: '',
				telefono: '',
				mensaje: '',
			},
			errorNombre: null,
			errorCorreo: null,
			errorTelefono: null,
			errorMensaje: null,
			mensajeEnvio: null,
			errors: false,

		}
	},
	created() {
		// emailjs.init("user_pj5Hm73JqlMX245SMzc7H");
	},
	methods: {
		snack() {
			var x = document.getElementById("snackbar");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		},
		enviar(){
			valida(this)
			if (!this.errors) {
				this.enviarCorreo()
				
				this.limpiarDatos()
			}
		},
		limpiarDatos(){
			this.datos.nombre = ''
			this.datos.correo = ''
			this.datos.telefono = ''
			this.datos.mensaje = ''
		},
		
		async enviarCorreo(){
			try{
				let msg = {
					nombre: this.datos.nombre,
					correo: this.datos.correo,
					telefono: this.datos.telefono,
					mensaje:this.datos.mensaje,
				}
				// await emailjs.send("default_service", "template_7n5q3gb", msg)
				await console.log('Enviado')
				this.mensajeEnvio='Gracias por Escribirnos'
				this.snack()
			}
			catch(error){
				this.mensajeEnvio='Error al enviar el formulario'
				this.snack()
			}
		}


	},


}
</script>
<style scoped>
	section{
		width: 100%;
		height: auto;
		min-height: 75vh;
	}
	section img {
		width: 100%;
		height: auto;
	}
	h1{
		font-size: 3em;
		color: var(--d-color);
		font-weight: 800;
		/* margin-top: 1.5em; */
	
	}
	h2{
		font-size: 2em;
	}
	h3{
		color: var(--a-color);
		font-size: 1.2em;
	}
	.fondoTitulo{
		width: 100%;
		height: 150px;
		position: absolute;
		top: 0;
		z-index: -1;
		background-color: var(--a-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 3em;
	}
	.separador{
		margin-top: -50px;
		width: 100%;
		height: 50px;
		background-color: transparent;
		border: none;
	}
	.contenedor{
		width: 100%;
		height: 100%;
		min-height: 75vh;
		background-image: url('@/assets/img/f_contacto.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		margin-top: 130px;
	}

	.formulario{
		display: grid;
		grid-template-columns: 1fr;
		justify-items: center;
		background-color:var(--d-color);
		margin: 3em auto;
		width: 100%;
		max-width: 500px;
		padding: 2em 30px ;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	.formulario h4{
		color: var(--c-color);
		margin: 1em 0 2em 0;
		text-align: center;
	}

	.formulario label{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 10px;
	}

	.formulario input,textarea{
		padding: 10px;
	}
	.formulario div{
		display: flex;
		padding: 5px
	}
	.formulario p{
		font-size: .8em;
		color: var(--a-color);
	}

	.form-control{
		width: 80%;
		background-color:var(--e-color);
		color: var(--c-color);
		border: none;
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


	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { 
	-webkit-appearance: none; 
	margin: 0; 
	}

	input[type=number] { -moz-appearance:textfield; }

	.iconoForm{
		width: 30px;
		height: 30px;
		padding: 5px 20px;
		
	} 
	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 150px;
		}
		.contenedor{
			margin-top: 180px;
		}
		h1{
			margin: 0;
		}
		.separador{
			margin-top: -5px;
		}
	}

	#snackbar {
		visibility: hidden;
		min-width: 250px;
		margin-left: -125px;
		background-color: var(--b-color);
		color: #fff;
		text-align: center;
		border-radius: 2px;
		padding: 16px;
		position: fixed;
		z-index: 1;
		left: 50%;
		Bottom: 30px;
		font-size: 17px;
	}

	#snackbar.show {
		visibility: visible;
		-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
		animation: fadein 0.5s, fadeout 0.5s 2.5s;
	}


	@media (max-width: 600px) {
		.formulario{
			max-width: 300px;
		}
	}

</style>