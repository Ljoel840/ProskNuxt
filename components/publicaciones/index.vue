<template>
	<section>
		<h1>Últimas Publicaciones</h1>
		<span class="contenedor" v-if="datos.length>0">
			<publicacion v-for="(d,index) in datos" :key="index" :d="d"/>
		</span>
		<button class="verMas" @click="agregarDatos()">
			<img src="@/assets/img/i_mas.png" alt="boton mas">
		</button>
		<img class="separador" src="@/assets/img/separador.png" alt="">
	</section>
</template>
<script>
export default {
	name: 'publicaciones',
	props: {
		datos:{
			type: Array
		}
	},
	components: {
		spinnerCircular: () => import('@/components/spinnerCircular'),
		barra: () => import('@/components/barra'),
		publicacion: () => import('./publicacion'),
	},
	data() {
		return {
			tiempo: null,
			cargando:false,
			error: null,
			sinFoto: require ('@/assets/img/usuario.png'),
			cortina: true
		}
	},
	computed: {
		datosPublicaciones () {
			return this.$store.state.publicaciones
		},
		rout () {
			return this.$route
		},

	},
	methods: {
		ir (pag,data) {
			this.$router.push({
				name: pag, 
				params: {data}
			}) 
		},
		
		agregarDatos(){
			this.$store.dispatch('publicaciones/addPublicaciones')
		}	
	},
}
</script>
<style scoped>
	section{
		width: 100%;
		text-align: center;
		margin: 1em 0 0 0;
	}
	h1{
		font-size: 2em;
		color: var(--c-color);
		text-align: left;
		margin-left: 5vw
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
	.contenedor .dPublicaciones {
		width: 100%;
		height: auto;
		max-width: 250px;
		max-height: 300px;
		margin: 20px;
		padding: 10px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

	}
	.contenedor .fondo{
		width: 100%;
		height: 200px;
		/* background-image: url('@/assets/imagen1.jpg'); */
		background-size: 320px auto ;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		
	}


	/* .contenedor .fondo span{
		width: 100%;
		height: 30px;
		background-color: rgba(0, 0, 0, .8);
		color: #fff;
		font-size: .8;
		overflow: hidden;

	} */

	.contenedor div img{
		width: 100%;
		height: auto;
	}

	.prosker{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* background-color: var(--d-color); */
	}
	.prosker .foto{
		width: 40px;
		height: 40px;
		min-width: 40px;
		min-height: 40px;
		border-radius: 30px;
		margin: 2px;
		/* background-image: url('./foto1.jpg'); */
		background-color: var(--b-color);
		background-size: auto 50px ;
		background-position: center;
		background-repeat: no-repeat;
	}
	.prosker p{
		margin: 0 5px;
	}
	.prosker .categoria{
		text-transform: capitalize;
		line-height: 1;
		font-size: .7em;
	}
	.prosker .nombre{
		color: var(--a-color);
		font-weight: 800;
		text-transform: capitalize;
		line-height: 1;
		font-size: .7em;
	}
	.prosker span{
		display: flex;
		color: var(--a-color);
		/* background-color: var(--d-color); */
	}

	i{
		color: var(--a-color);
	}
	.descripcion{
		width: 100%;
		height: 40px;
		overflow: hidden;
		margin: 5px 0;
	}
	.descripcion p{
		font-size: .9em;
		line-height: 1;
	}
	.separador{
		width: 100%;
		height: 80px;
		border: none;
		z-index: 3;
		background-color: transparent;
		object-fit: fill;
	}
	.verMas{
		width: 100px;
		height: auto;
		position: absolute;
		left: 50%;
		margin-left: -50px;
		margin-top: 20px;
		background-color: transparent;
		border: none;
		cursor: pointer;
		outline: none;
	}
	.verMas img{
		width: 80px;
		height: auto;
	}
	.verMas:hover img{
		filter: grayscale(80%);
	}
	/* .cortina{
		position: absolute;
		width: 250px;
		height: 300px;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cortina p {
		color: var(--e-color);
	} */
</style>