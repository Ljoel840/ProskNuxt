<template>
	<aside>
		<h2>LOGIN</h2>
		<label>
			<img src="@/assets/img/i_mail.png" alt="icono mail">
			<input type="email" name="email" id="email" v-model="email" placeholder="Correo">
		</label>
		<label>
			<img src="@/assets/img/i_contrasena.png" alt="icono pass">
			<input type="password" name="pass" id="pass" v-model="pass" placeholder="Contraseña"> 
		</label>
		<button class="botonAceptar" @click="ingresar()">Aceptar</button>
		<button class="botonCancelar" @click="cancelar()">Cancelar</button>
		<barra v-if="enviando"/>
		<p v-if="this.error">Error</p>
	</aside>
</template>
<script>
export default {
	name: 'popuplogin',
	components: {
        barra: () => import('../barra')
    },
	data() {
		return {
			email:'',
			pass:'',
			error:null,
			enviando: false
		}
	},
	computed: {
		usuario () {
			return this.$store.state.usuario
		},
	},
	methods: {
		async ingresar () {
			try {
				this.error = null
				this.enviando = true
				await this.$store.dispatch('usuario/login', {
					email: this.email,
					pass: this.pass,
				})
				this.$emit('cerrar', true)
			} catch (error) {
				this.error = error
			}
			this.enviando = false
		},
		cancelar(){
			this.$emit('cerrar', true)
		}
	},
}
</script>
<style scoped>
	aside{
		width: 250px;
		height: 290px;
		position: fixed;
		top: 100px;
		right: 50px;
		background-color: #fff;
		border-radius: 7px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		text-align: center;
		animation: subir .8s ease;
		z-index: 10;
	}
	h2{
		color: var(--b-color);
		margin: 20px 0;
		font-size: 1.5em;
	}
	label{
		width: 230px;
		height: 40px;
		margin: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: var(--d-color);
	}
	label img{
		width: 30px;
		height: 30px;
		margin: 5px
	}
	label input{
		width: 180px;
		height: 30px;
		border: none;
		background-color: var(--d-color);
	}
</style>