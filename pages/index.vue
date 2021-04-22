<template>
	<article class="home">
		<img alt="imagenHome" :src="slider[opcion].imagen" class="imagenHome">
		<div class="fondo">
			<div class="derecha">
				<div class="textoTitulo">
					<h1 v-html="slider[opcion].titulo"></h1>
				</div>
				<div class="buscar">
					<buscar @opcion="seleccion($event)"/>
				</div>
			</div>
		</div>
			<span class="botones">
				<button v-for="(idx,index) in slider.length" :key="index" :style="opcion===index ? 'background-color:#fff': null" @click="opcion=index"></button>
			</span>
		<redesSociales/>
		<proskerDestacados/>
		<categorias />
		<publicaciones :datos="datosPublicaciones.datos" v-if="!datosPublicaciones.cargando"/>
		<div class="banner">
			<div>
				<h2>Trabajas de forma independiente, querés empezar a hacerlo o trabajas en relación de dependencia y querés tener ingresos extras/ complementarios?</h2>
				<h3>Querés manejar tus horarios? sos proactivo, innovador?, trabajas por tu cuenta y estás necesitando una red para contactar con nuevos clientes? Descargate Prosk, ármate tu perfil, publicá tus servicios y comenzá a ganar.</h3>
				<br>
				<button class="botonAceptar" @click="ir('Funcionamiento')">Conoce más</button>
			</div>
		</div>
	</article>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
export default {
	name: 'Home',
	mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
	components: {
		publicaciones: () => import('@/components/publicaciones'),
		categorias: () => import('@/components/categorias'),
		buscar: () => import('@/components/buscar'),
		proskerDestacados: () => import('@/components/proskersDestacados'),
		redesSociales: () => import('@/components/redesSociales'),
		// publicidad728x90: () => import('@/components/adsense/publicidad728x90'),
		// publicidad300x250: () => import('@/components/adsense/publicidad300x250'),
		// publicidad160x600: () => import('@/components/adsense/publicidad160x600'),
		// publicidad320x50: () => import('@/components/adsense/publicidad320x50'),
	},
	data() {
		return {
			tiempo: null,
			opcion: 0,
			idx: 0,
			slider:[
				{
					imagen:	require('@/assets/img/slider1.jpg'),
					titulo: 'La nueva app para promoción y contratación de profesionales independientes'
				},
				{
					imagen:	require('@/assets/img/slider2.jpg'),
					titulo: '¿Sos profesional independiente? <br>Registrate, mostrá lo que sabes hacer y contactá nuevos clientes'
				},
				{
					imagen:	require('@/assets/img/slider3.jpg'),
					titulo: '¿Necesitas contratar un profesional de confianza? <br>Descargate prosk y encontralo!'
				},
				{
					imagen:	require('@/assets/img/slider4.jpg'),
					titulo: 'Contratá gente apasionada por su trabajo, encontrá profesionales de cientos de categorías'
				},
				{
					imagen:	require('@/assets/img/slider5.jpg'),
					titulo: 'Descargate la app y convertite en prosker para contactar con tu próximo cliente'
				},
			]
		}
	},
	mounted() {
		this.comenzarCuentaRegresiva()
	},
	computed: {
		datosPublicaciones () {
			return this.$store.state.publicaciones
		},
		ancho(){
			return this.$vssWidth
		},
	},

	methods: {
		comenzarCuentaRegresiva(){
			this.tiempo = setInterval(()=>this.cambiarOpcion(), 5000);
		},
		seleccion(opc){
			if (opc.tipo==='Categorias') {
				this.ir("mostrarCategorias",opc.datos)
			}else{
				this.ir("Prosker",opc.datos.idEnc)

			}
		},
		ir(pag,data){
			this.$router.push({
				name: pag, 
				params: {data}
			}) 
		},
		cambiarOpcion(){
			clearInterval(this.tiempo)
			if (this.opcion===this.slider.length-1) {
				this.opcion=0
				
			}else{
				this.opcion++
			}
			this.comenzarCuentaRegresiva()
		}
	},

}
</script>
<style scoped>
	article{
		width: 100%;
		/* text-align: center; */
	}
	img{
		width: 100%;
		height: auto;
	}
	h1{
		color: var(--e-color);
		font-weight: 900;
		font-size: 2em;
		margin-left: 40px;
	}
	.imagenHome{
		width: 100%;
		height: 400px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		animation: aparecer2 2s ease;
		object-fit: cover;
	}
	.fondo{
		width: 100%;
		height: 280px;
		padding-top: 20px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		z-index: 1;
		text-align: center;
		/* background-color: red; */
	}
	.fondo div{
		margin-bottom: 30px;
	}
	.fondo .derecha{
		width: 60%;
		justify-content: center;
		margin-left: 6vw;
	}
	.fondo .izquierda{
		width: 30%;
		display: flex;
		justify-content: flex-end;
	}
	.banner{
		background-image: url('@/assets/img/banner.jpg');
		background-position: left;
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		min-height: 500px;
		margin-top:-80px; /*Activar cuando no haya publicidad*/
		z-index: -1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.banner div{
		width: 40%;
		margin: 0 80px;
		text-align: right;
	}
	.banner div h2{
		font-size: 1.6em;
		color: var(--c-color);
	}
	.banner div h3{
		font-size: 1.2em;
		color: var(--c-color);
		font-weight: 200;
		line-height: 1.5;
	}
	.banner div button{
		width: 160px;
	}
	.banner2 {
		background-color: var(--d-color);
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.div1 { grid-area: 1 / 1 / 2 / 2; }
	.div2 { grid-area: 1 / 2 / 2 / 3; }

	.div1,.div2{
		min-height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.div1 div{
		width: 80%;
		margin-left: 120px;
	}
	.div1 div h2{
		font-size: 2.1em;
		color: var(--c-color);
	}
	.div1 div h3{
		font-size: 1.4em;
		color: var(--c-color);
		font-weight: 200;
		line-height: 1.5;
	}
	.contenedorPublicidad {
		display: grid;
		grid-template-columns: 1fr 180px;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.pub1 { grid-area: 1 / 1 / 2 / 2; }
	.pub2 { grid-area: 1 / 2 / 2 / 3; }
	.pub2{
		padding-top: 3em;
	}

	.contenedorPublicidad2 {
		display: grid;
		grid-template-columns: 1fr 310px;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.pub21 { grid-area: 1 / 1 / 2 / 2; }
	.pub22 { grid-area: 1 / 2 / 2 / 3; }

	.pub22 { 
		background-color: var(--d-color); 
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.contenedorPublicidad3{
		position: -webkit-sticky;
		position: sticky;
		bottom: 0;
	}

	.botones{
		width: 100%;
		margin: auto;
		display: flex;
		justify-content: center;
		margin-top: -10px;
		margin-bottom: 20px;
	}
	.botones button{
		width: 10px;
		height: 10px;
		padding: 5px;
		border-radius: 10px;
		border: 2px solid #fff;
		background-color: transparent;
		outline: none;
	}
	.buscar{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.espacio{
		min-height: 20vh
	}
	.textoTitulo{
		min-height: 120px;
		display: block;
		/* padding-top: 10px; */
		/* align-items: center;
		justify-content: center;
		min-width: 100%; */
	}
	.mostrarProskers{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 2em;
	}

	.categorias{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	@media (max-width: 1000px) {
		.fondo{
			padding-top: 100px;
			/* width: 70%; */
			margin: auto;
			justify-content: center;
		}
		.derecha{
			margin-left: 0;
		}
		h1{
			margin-left: 0;
			font-size: 1.8em;
		}
		.banner{
			background-position: right;
		}
		.banner div{
			width: 100%;
			margin: 0 50px;
			text-align: center;
		}
		.banner2 {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(2, 1fr);
		}

		.div1 { grid-area: 1 / 1 / 2 / 2; }
		.div2 { grid-area: 2 / 1 / 3 / 2; }
		.div1 div{
			width: 100%;
			margin: 50px;
			text-align: center;
		}
		.div1 div h2{
			font-size: 1.6em;
		}
		.div1 div h3{
			font-size: 1.2em;
		}
	}

	@media (max-width: 900px) {
		.fondo{
			padding-top: 100px;
			flex-wrap: wrap;
			
		}
		.fondo .izquierda{
			width: 100%;
		}
	}
		
	@media (max-width: 550px) {
		.fondo{
			padding-top: 100px;
			width: 90%;
		}
		.fondo .derecha {
			width: 100%;
			margin-left: 0;
		}

		.derecha div{
			width: 100%;
		}
		.banner{
			width: 100%;
		}
		.banner div{
			margin: 0;
			text-align: center;
		}
		.div1 div{
			margin: 10px;
		}
		.textoTitulo{
			width: 100%;
		}
		.textoTitulo h1{
			min-height: 160px;
			font-size: 1.7em;
			width: 100%;
		}
		.botones{
			margin-top: 0;
		}
		.contenedorPublicidad {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 5px;
		}
		.pub1 { grid-area: 1 / 1 / 2 / 2; }
		.pub2 { grid-area: 2 / 1 / 3 / 2; }
		.contenedorPublicidad2 {
			grid-template-columns: 100%;
			grid-template-rows: 1fr 260px;
		}
		.pub21 { grid-area: 1 / 1 / 2 / 2; }
		.pub22 { grid-area: 2 / 1 / 3 / 2; }
	}
	@media (max-width: 1200px) {
		.banner{
			margin-top: -40px;
		}

	}

</style>