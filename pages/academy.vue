<template>
	<section>
		<div class="fondoTitulo">
		</div>
		<div class="contenedorPrincipal">
			<img src="@/assets/img/f_academy.jpg" alt="video" class="fondovideo">
			<div class="titulos">
				<h1>Prosk Academy</h1>
				<h3>Aprende a ser más eficiente en Prosk</h3>
			</div>
			<div class="flag">
			</div>
			<barra v-if="academy.cargando"/>
			<div class="contenedor" v-if="!academy.cargando">
				<h2 class="noDatos" v-if="academy.datos.length<=0">No hay Datos</h2>
				<div class="videos" v-for="(d,index) in academy.datos" :key="index">
					<iframe class="tipo" width="100%" height="315" :src="cambiarUrl(d.VideoPostUrl)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-if="d.VideoPostType===1"></iframe>
					<video class="tipo" width="100%" height="315" :src="d.VideoPostUrl" v-else controls ></video>
					<h3 class="titulovideo"><strong>{{d.VideoPostTitle}}</strong></h3>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'

export default {
	name: 'Academy2',
	mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
	props:{
		data:{
			type: String,
			default: null
		}
	},
	components: {
		barra: () => import('@/components/barra'),
	},
	data() {
		return {
			error: null,
			cargandovideo: false,
			datos: [],
			options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12:"false" },
			prueba:[],
			opcion: null,
			mostrar: false,
			posicion: 0,
			rutaEmbed: 'https://www.youtube.com/embed/',
			titulo: this.$route.params.titleAcademy
		}
	},
	created() {
		// window.scrollTo(0, 0)
		if (this.academy.cargando){
			this.$store.dispatch('academy/cargarAcademy')
		}
		this.opcion=this.data
	},
	computed: {
		ancho(){
			return this.$vssWidth
		},
		alto(){
			return this.ancho*(this.ancho>1000 ? 0.7 : 0.9)*0.56
		},
		anterior(){
			return this.posicion>0 ? this.posicion-- : 0
		},
		siguiente(){
			return this.posicion<this.academy.datos.length ? this.posicion++ : 0
		},
		academy(){
			return this.$store.state.academy
		}
	},
	methods: {
		cambiarUrl(url){
			return this.rutaEmbed+url.slice(url.indexOf('watch?v=')+8)
		},
		cambiarFecha(fecha2){
			let fecha = new Date(fecha2);
			return fecha.toLocaleDateString('es-ES',this.options);
		},
		ir (pag,data) {
			var titlevideo = ''
			if (pag==='Detalle video') {
				titlevideo=this.quitarEspacios(data.videoPostTitle)
			}
			this.$router.push({
				name: pag, 
				params: {data,titlevideo}
			}).catch(() => {})
		},
		quitarEspacios(nombre){
			return nombre.replace(/ /g, "-").toLowerCase()
		}
	},
}
</script>
<style scoped>
	section{
		width: 100%;
		min-height: 45vh;
		
	}
	h1{
		font-size: 3em;
		color: var(--d-color);
		font-weight: 800;
		margin-top: 1.5em;
	}
	h2{
		font-size: 2em;
		color: var(--c-color);
		font-weight: 800;
		padding: 1em 0;
		/* text-align: left;
		margin-left: 10vw; */
	}
	h3{
		margin-top: .5em;
		font-size: 1.5em;
		color: var(--d-color);
		font-weight: 800;
	}
	.fondoTitulo{
		width: 100%;
		height: 100px;
		position: absolute;
		top: 0;
		z-index: -1;
		background-color: var(--a-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.separador{
		margin-top: -60px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
	}
	.contenedorPrincipal{
		width: 100%;
		background-color: var(--d-color);
		/* margin-top: 100px; */
		text-align: center;
		padding-bottom: 3em;
	}
	.contenedor {
		width: 100%;
		margin: 2em auto 0 ;
		padding: 2em 0 4em;
		
		/* column-count: 2;
        column-gap: 2em; */
		display: flex;
		justify-content: space-around;	
		text-align: justify;	
		flex-wrap: wrap;
	}
	.fechavideo  {
		padding: 10px 0;
		margin: 0;
		color: #a8a8a8
	}

	.titulovideo{
		color: var(--a-color);
	}
	.textovideo  {
		padding: 5px 0;
		
	}
	.noDatos{
		margin-top: .5em;
		font-size: 2em;
		color: var(--a-color);
		font-weight: 800;
		text-align: center;
	}

	.imgvideo {
		width: 95%;
		height: 200px;
		margin: 5px;
		border: 2px solid var(--d-color);
		border-radius: 7px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		object-fit: cover;
		cursor: pointer;
	}
	.videos {
		width: 100%;
		max-width: 450px;
		padding: 20px;
	}
	.videos h3{
		text-shadow: none
	}

	.videos button{
		float: right;
		width: 100px;
		padding: 10px;
	}

	.imgvideo:hover{
		opacity: .5;
		text-decoration: none;
	}
	.fondovideo{
		width: 100%;
		height: 300px;
		object-fit: cover;
		margin: auto;
		
	}


	.flag{
		width: 100%;
		height: 50px;
		box-sizing: content-box;
		/* padding-top: 15px; */
		position: relative;
		background: transparent;
		color: white;
		font-size: 11px;
		letter-spacing: 0.2em;
		text-align: center;
		text-transform: uppercase;
		margin-top: -53px;
	}
	.flag:after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0;
		height: 0;
		border-top: 60px solid transparent;
		border-left: 50vw solid var(--d-color);
		border-right: 50vw solid var(--d-color);
    }
	.contenedorPrincipal .titulos{
		width: 50%;
		position: absolute;
		margin: auto;
		margin-top: -250px;
		z-index: 10000;
		color: #fff;
		text-align: center;
		left: 50vw;
		margin-left: -25vw;
	}
	.titulos h1,h3{
		margin: 0;
		color: var(--d-color);
		text-shadow: 0 0 7px rgb(97, 97, 97)
	}
	.tags{
		background-color: var(--c-color);
		color: var(--e-color);
		padding: 10px;
		margin: 5px;
		border: none;
		outline: none;
		cursor: pointer;
	}
	.categorias{
		background-color: var(--h-color);
		color: var(--e-color);
		padding: 10px;
		margin: 3px;
		border: none;
		outline: none;
		border-radius: 7px;
		cursor: pointer;
		text-transform: uppercase;
	}

	@media (max-width: 700px) {
		.contenedorPrincipal .titulos{
			width: 90%;
			left: 50vw;
			margin-left: -45vw;
			margin-top: -220px;
		}
		.videos {
			width: 100%;
			max-width: 350px;
		}
		.titulos h1{
			font-size: 2em;
		}
		.titulos h3{
			font-size: 1.4em;
		}
	}
</style>