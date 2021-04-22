<template>
	<section>
		<div class="fondoTitulo">
		</div>
			<div class="busqueda">
				<buscar  @opcion="seleccion($event)"/>
			<h1>{{data2.nombre}}</h1>
			</div>
		<div class="cortina" v-if="mostrarMapa" @click="mostrarMapa=false"></div>
		<mapa :latitude="miPosicion.posicion.coords.latitude" :longitude="miPosicion.posicion.coords.longitude" :title="miPosicion.titulo" @cerrar="mostrarMapa=false" :marcadores="busqueda.marcadores" v-if="mostrarMapa"/>
		<img src="@/assets/img/separador2.png" alt="separador" class="separador">
		<!-- <publicidad728x90/> -->
		<span class="subcategorias">
			<button :class="opc===null ? 'botonActivo' : null" @click="filtrarSubcategoria(null)">TODOS</button>
			<button v-for="(d,index) in data2.subcategoria" :key="index" :class="index == opc ? 'botonActivo' : null" @click="filtrarSubcategoria(index)">{{d.nombre}}</button>
		</span>
		<!-- <div class="contenedorPrincipal">
			<div class="div1">
				<publicidad160x600 v-if="ancho>600"/>
				<publicidad300x250 v-if="ancho<=600"/>
			</div>
			<div class="div2"> -->
				<span class="contenedor">
					<span class="ubicacion" v-if="existe">
						<button @click="mostrarMapa=true">
							<img src="@/assets/img/i_ubicacion.png" alt="icono ubicacion">
						</button>
					</span>
					<barra v-if="cargandoBusqueda" />
					<span v-if="!existe" class="existe">No se encuentran publicaciones en esa Categoría</span>
					<publicacion v-for="(d,index) in busqueda.datos" :key="index" :d="d"/>
					<span class="contenedorBoton" v-if="!busqueda.cargando&&busqueda.hayMas && existe">
						<button class="verMas" @click="cargarMas()"><i class="material-icons">expand_more</i></button>
					</span>
				</span>
			<!-- </div>
		<div class="div3">
			<publicidad160x600 v-if="ancho>600"/>
			<publicidad300x250 v-if="ancho<=600"/>
		</div>
		</div> -->
	</section>
</template>
<script>
import extraer from '../middleware/extraerPublicaciones'
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'

export default {
	name:'mostrarCategorias',
	mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],

	props:{
		data: {
			type: Object,
		}

	},
	components: {
		barra: () => import('@/components/barra'),
		buscar: () => import('@/components/buscar'),
		publicacion: () => import('@/components/publicaciones/publicacion'),
		mapa: () => import('@/components/googleMap'),
		// publicidad728x90: () => import('@/components/adsense/publicidad728x90'),
		// publicidad160x600: () => import('@/components/adsense/publicidad160x600'),
		// publicidad300x250: () => import('@/components/adsense/publicidad300x250'),

	},
	data() {
		return {
			datos: [],
			error: null,
			opc: null,
			publicaciones: [],
			fin: '',
			cargandoBusqueda: false,
			mostrarMapa: false,
			subcategoria: '',
			existe: true,
			data2: {}
		}
	},
	created() {
		if (!this.data) {
			this.dataUsuario = this.categorias.datos[0].idEnc
			this.data2 = this.categorias.datos[0]

		}else{
			this.dataUsuario = this.data.idEnc
			this.data2 = this.data
		}
		this.$store.commit('busqueda/limpiarBusqueda')
		this.extraer(this.dataUsuario,"","")
	},
	computed: {
		ancho(){
			return this.$vssWidth
		},
		busqueda(){
			return this.$store.state.busqueda
		},
		miPosicion(){
			return this.$store.state.miPosicion
		},
		categorias(){
			return this.$store.state.categorias
		}


	},
	methods: {
		filtrarSubcategoria(id){
			this.opc = id
			this.$store.commit('busqueda/limpiarBusqueda')
			if (!id) {
				this.subcategoria = ''
			}else{
				this.subcategoria= this.data.subcategoria[id].idEnc
			}
			this.extraer(this.dataUsuario,this.subcategoria,"")
		},
		async extraer(idCat,idSub,inicio){
			try {
				this.existe = true
				this.cargandoBusqueda = true
				this.datos = await extraer({
					idCatEnc:  idCat,
  					idSubCatEnc: idSub,
  					inicioEnc: inicio, 
				})
				this.$store.commit('busqueda/cargarBusqueda',this.datos)
				this.cargandoBusqueda = false
				

			} catch (error) {
				this.error = error
				this.cargandoBusqueda = false
				if (this.error==='Publicaciones no disponibles.') {
					this.existe = false
				}
			}
		},
		cargarMas(){
			this.extraer(this.dataUsuario,this.subcategoria,this.busqueda.idFin)
		},

		ir(pag,data){
			this.$router.push({
				name: pag, 
				params: {data}
			}) 
		},
		seleccion(opc){
			if (opc.tipo==='Categorias') {
				this.dataUsuario = opc.datos.idEnc
				this.data2 = opc.datos
				this.$store.commit('busqueda/limpiarBusqueda')
				this.extraer(this.dataUsuario,"","")
			}else{
				// this.ir("Prosker",opc.datos.idEnc)

			}
		},
	},

}
</script>
<style scoped>
	section{
		width: 100%;
		min-height: 85vh;
	}
	h1{
		font-size: 2em;
		color: var(--d-color);
		font-weight: 800;
		margin-top: 1em;
	}
	.fondoTitulo{
		width: 100%;
		height: 200px;
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
		margin-top: -30px;
		height: 50px;
		width: 100%;
		/* height: auto; */
		background-color: transparent;
		border: none;
	}
	.busqueda {
		width: 100%;
		padding: 2em 0;
		
	}
	.busqueda h1{
		text-align: center;
		margin-top: 80px;
	}
	.subcategorias {
		width: 50%;
		margin: auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	button{
		background-color: var(--c-color);
		color: var(--e-color);
		padding: 10px;
		margin: 5px;
		border: none;
		outline: none;
	}
	
	
	.contenedorPrincipal {
		display: grid;
		grid-template-columns: 180px 1fr 180px;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.div1 { grid-area: 1 / 1 / 2 / 2; }
	.div2 { grid-area: 1 / 2 / 2 / 3; }
	.div3 { grid-area: 1 / 3 / 2 / 4; }

	.div1, .div3{
		text-align: center;
	}
	.contenedor{
		width: 100%;
		margin: auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.cargando {
		width: 100%;
		height: 100px;
		margin: 0 auto;
	}

	.contenedorBoton{
		width: 80%;
		text-align: center;
		display: flex;
		justify-content: center;
		margin: 0 auto 2em;
	}
	.verMas{
		width: 100%;
		background-color: var(--d-color);
		color: var(--a-color);
		padding: 0;
		cursor: pointer;
	}

	.verMas:hover{
		background-color: var(--b-color);
	}

	.verMas:hover i{ 
		color: #fff;
	}

	.verMas:active{
		background-color: var(--c-color);
	}


	.verMas i{
		font-size: 3em;
	}
	.ubicacion {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.ubicacion button{
		background-color: transparent;
		width: 50px;
		height: 50px;
		color: var(--a-color);
		margin-right: 50px;
		cursor: pointer;

	}
	.ubicacion button:hover img {
		filter: grayscale(100%);
	}
	.ubicacion img{
		width: 40px;
		height: 40px;
	}
	.cortina{
		min-width: 100%;
		min-height: 100%;
		background-color: rgba(0, 0, 0, .7);
	}
	.existe{
		font-size: 2em;
		font-weight: 800;
		margin: 2em 0
	}
	@media (max-width: 1000px) {
		.busqueda{
			margin-top: 60px;
		}
		/* .fondoTitulo{
			height: 120px;
		} */
	}
	@media (max-width: 600px) {
		.busqueda h1{
			font-size: 2em
		}
		.fondoTitulo{
			height: 180px;
		}
		.contenedorPrincipal {
			grid-template-columns: 1fr;
			grid-template-rows: 260px 1fr 260px;
		}

		.div1 { grid-area: 1 / 1 / 2 / 2; }
		.div2 { grid-area: 2 / 1 / 3 / 2; }
		.div3 { grid-area: 3 / 1 / 4 / 2; }
	}

</style>