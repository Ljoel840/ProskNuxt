<template>
	<header>
		<span class="div1">
			<a :href="`${urlPrincipal}/#/`">
				<img src="@/assets/img/logowebprosk.png" alt="logo prosk" class="logo hvr-pulse" >
			</a>
			<button class="botonAceptar botonMenu" v-if="ancho<1000" @click="mostrarMenu=!mostrarMenu"><i class="material-icons">{{!mostrarMenu ? 'menu':'close'}}</i></button>
		</span>
		<nav class="div2" v-if="mostrarMenu|| ancho>1000">
			<div @mouseover="submenu=true" @mouseleave="submenu=false" class="menu" style="padding-right: 0">
				<a :href="`${urlPrincipal}/#/quienes`" class="menu" @mouseover="submenu=true" @mouseleave="submenu=false">QUIENES SOMOS </a>
				<transition name="fade">
					<div class="submenu" v-if="submenu || ancho<1000">
						<a :href="`${urlPrincipal}/#/funcionamiento`">Funcionamiento</a>
						<a :href="`${urlPrincipal}/#/prensa`">Prensa</a>
					</div>
				</transition>
			</div>
			<p>|</p>
			<a :href="`${urlPrincipal}/#/proskers`" class="menu">PROSKERS</a>
			<p>|</p>
			<a :href="`${urlPrincipal}/#/academy`" class="menu">PROSK ACADEMY</a>
			<p>|</p>
			<a @click="ir('Home')" class="menu">BLOG</a>
			<p>|</p>
			<a :href="`${urlPrincipal}/#/contacto`" class="menu">CONTACTO</a>
		</nav>
		<span class="div3" v-if="mostrarMenu || ancho>1000">
			<button class="botonNotificaciones" v-if="usuario.ok" @click="mostrarChat=!mostrarChat"><i class="material-icons">notifications</i></button>
			<span class="nuevaNotificacion" v-if="usuario.ok && nuevoMensaje>0">{{nuevoMensaje}}</span>
			<button class="botonAceptar" v-if="!usuario.ok" @click="cerrarPopup=false">Login</button>
			<button v-else class="botonSalir" @click="salir" @mouseover="icono='clear'" @mouseleave="icono='account_circle'"><i class="material-icons">{{icono}}</i><h4>{{usuario.nombre}}</h4></button>
		</span>
		<login @cerrar="cerrarVentana($event)" v-if="!cerrarPopup"/>
		<chat :datos="proskers.datos[0]" @cerrar="mostrarChat=false" v-if="mostrarChat"/>	</header>
</template>
<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
export default {
	name: 'menupc',
	mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
	components: {
		login: () => import('@/components/popupLogin'),
		// salaChat: () => import('@/components/chat/salaChat'),
		chat: () => import('@/components/chat'),
	},
	data() {
		return {
			cerrarPopup: true,
			icono: 'account_circle',
			submenu: false,
			mostrarMenu:false,
			mostrarChat: false,
			tiempo: null,
			error: null,
			intervalo: 1,
			contadorBusqueda: 0,
		}
	},
	created() {
		// console.log('nuevo Mensaje:',this.nuevoMensaje)
	},
	
	computed: {
		urlPrincipal(){
			return 'https://prosk.org'
			// return 'http://localhost:8080'
		},
		usuario () {
			return this.$store.state.usuario
		},
		ancho(){
			return this.$vssWidth
		},
		proskers(){
			return this.$store.state.proskers
		},
		nuevoMensaje(){
			return this.$store.state.conversaciones.nuevoMensaje
		},
		conteoAnteriorMensaje(){
			return this.$store.state.conteoAnteriorMensaje
		},
		chatAbierto(){
			return this.$store.state.conversaciones.chatAbierto
		},
		conversaciones(){
			return this.$store.state.conversaciones.conversacion
		},
		academy(){
			return this.$store.state.academy
		}
		
	},
	
	methods: {
		comenzarCuentaRegresiva(){
			this.tiempo = setInterval(()=>this.verNuevosMensajes(), 10000*this.intervalo);
		},
		ir (pag,para) {
			let titleAcademy= ''
			if (pag==='Home') {
				this.$router.push({path: '/'})
			}else{
				if (this.ancho<1000) {
					this.mostrarMenu=false
				}
				this.$router.push({
					name: pag, 
					params: {para,titleAcademy}
				}).catch(() => {})	
			}
		},
		quitarEspacios(nombre){
			return nombre.replace(/ /g, "-").toLowerCase()
		},
		salir (e) {
            e.preventDefault()
            this.$store.dispatch('usuario/logout')
			this.$emit('cerrar')
			this.$router.push({path: '/'})
		},
		cerrarVentana(e){
			this.cerrarPopup= e
			this.cargarMensajes()
		},
		verNuevosMensajes(){
			clearInterval(this.tiempo)
			this.actualizarMensajes()
		},
		async cargarMensajes(){
			try{
				await this.$store.dispatch('conversaciones/getConversaciones',this.usuario.idEnc)
				this.comenzarCuentaRegresiva()
			}
			catch (error) {
				this.error = error
			}
		},
		async actualizarMensajes(){
			try{
				await this.$store.dispatch('conversaciones/getConversaciones',this.usuario.idEnc)
				this.contadorBusqueda++
				this.comenzarCuentaRegresiva()
				if (this.contadorBusqueda===60) {
					this.intervalo++
					this.contadorBusqueda=0
				}
				if (this.NuevoMensaje>this.conteoAnteriorMensajes && this.chatAbierto) {
					this.contadorBusqueda=0
					this.intervalo=1
					this.conversaciones.datos.forEach(element => {
						if (element.ConversationWithUserId===this.chatAbierto.ConversationWithUserId && element.ConversationUnreadMessages>this.chatAbierto.ConversationUnreadMessages) {
							this.$store.dispatch('mensajes/getMensajes',{
								idEnc: this.usuario.idEnc,
								idEncWith: this.chatAbierto.ConversationWithUserId
							})
						}
					});
				}
			}
			catch (error) {
				this.error = error
			}
		}
	},
}
</script>
<style scoped>
	header{
		width: 100%;
		height: 80px;
		display: grid;
		grid-template-columns: 20% 65% 15%;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		align-items: center;
		/* background-color: #000; */
	}
	.div1 { grid-area: 1 / 1 / 2 / 2; }
	.div2 { grid-area: 1 / 2 / 2 / 3; }
	.div3 { grid-area: 1 / 3 / 2 / 4; }

	.div1{
		text-align: right;
	}
	.logo{
		height: 10vh;
		width: auto;
		margin-top: 1%;
		max-height: 60px;
		margin-left: 5px;
	}
	.div2{
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}
	.div3{
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}
	nav .menu{
		/* width: 120px; */
		padding: 12px;
		text-align: center;
		text-decoration: none;
		font-size: 12px;
		font-weight: 600;
		color: #fff;
		line-height: 1.5em;
		font-style: normal;
		letter-spacing: 1.5px;
		cursor: pointer;
		
	}

	nav .menu:hover{
		/* transform: scale(1.1); */
		color: var(--f-color);
	}

	p{
		padding: 12px 0;
		font-size: 12px;
		font-weight: 500;
		color: #fff;

	}
	i{
		font-size: 2em;
		color: var(--a-color);
	}

	.flecha{
		color: var(--e-color);
		
		
	}
	.buscar{
		border: none;
		background-color: #fff;
		width: 100px;
		margin-top: 5px;

	}
	.usuarioOk{
		display: flex;
		justify-content:center;
		align-items: center;
		color: #fff;
	}
	.botonSalir{
		font-size: 1.4em;
		width: auto;
		height: 30px;
		padding: 0;
		border-radius: 15px;
		border: none;
		background-color: transparent;
		display: flex;
		align-items: center;
		color: #fff;
	}
	.botonSalir h4{
		font-size: 1em;
		text-shadow: 2px 2px 8px rgb(88, 88, 88);
	}
	.botonSalir i{
		color: #fff;
		font-size: 1.6em;
		margin: 0 5px;
		text-shadow: 2px 2px 8px rgb(88, 88, 88);
	}
	.botonAceptar{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
	.botonNotificaciones{
		font-size: 1.4em;
		width: 30px;
		height: 30px;
		padding: 0;
		border-radius: 20px;
		border: none;
		background-color: transparent;
		color: #fff;
		background-color: var(--d-color);
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		outline: none;
	}
	.botonNotificaciones i {
		
		font-size: 1em;
		margin: 0 5px;
	}
	.submenu{
		margin: 0 0 5px 0;
		padding: 10px 0;
		background-color: rgba(53, 52, 52, 0.3);
		position: absolute;
		display: flex;
		flex-direction: column;
	}
	.submenu a{
		padding: 5px 10px;
		text-decoration: none;
		color: #fff;
		
	}
	.submenu a:hover{
		background-color: var(--f-color);
		color: var(--c-color)
	}
	.botonMenu{
		padding: 10px 0;
		width: 50px;
		margin-right: 20px;
	}
	.botonMenu i {
		color: var(--e-color)
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
		margin-top: -7px;
		margin-left: -7px
	}

	@media (max-width:1000px) {
		header {
			position: absolute;
			top: 0;
			grid-template-columns: 1fr;
			grid-template-rows: 80px repeat(2, 1fr);
			z-index: 100;
		}

		.div1 { grid-area: 1 / 1 / 2 / 2; }
		.div2 { grid-area: 2 / 1 / 3 / 2; }
		.div3 { grid-area: 3 / 1 / 4 / 2; }

		.div1{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.div2{
			width: 100%;
			/* max-width: 300px; */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: var(--c-color);
			padding: 2em 0;
		}
		p{
			display: none;
		}
		.div3{
			background-color: var(--c-color);
			justify-content: center;
			padding: 0 0 1em ;
		}
		.menu{
			display: flex;
			justify-content: center;
			align-items: center;
		}
		div.menu{
			padding: 0;
			flex-direction: column;
		}
		.submenu{
			position: relative;
			background-color: transparent;
			color: var(--f-color);
		}
	}
</style>
