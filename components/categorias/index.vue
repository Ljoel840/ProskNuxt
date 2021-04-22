<template>
	<section>
		<div class="cargando" v-if="datosCategorias.cargando">
			<spinner-circular  v-if="datosCategorias.cargando"/>
		</div>
		<span class="contenedor" v-if="!datosCategorias.cargando">
			<h2 v-if="datosCategorias.datos">Categorías</h2>
			<slider :datos="datosCategorias.datos" />
		</span>
	</section>
</template>
<script>
export default {
	name: 'categorias',
	components: {
		spinnerCircular: () => import('../spinnerCircular'),
		slider: () => import('./sliderCategorias')
	},
	data() {
		return {
			cargando:true,
			error: null,
			datos: [],
		}
	},
	created() {
		this.$store.dispatch('categorias/getCategorias')
	},
	computed: {
		datosCategorias () {
			return this.$store.state.categorias
		},
		rout () {
			return this.$route
		},
	},
}
</script>
<style scoped>
	section{
		width: 100%;
		text-align: center;
		margin: 1em 0;
		/* background-color: var(--d-color); */
	}
	h1{
		font-size: 1.5em;
		color: var(--a-color)
	}
	h2{
		font-size: 2em;
		text-align: left;
		
	}
	.contenedor{
		width: 90%;
		margin: auto;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		align-items: center;
	}

	.cargando {
		width: 100%;
		height: 100px;
		margin: 0 auto;
	}
	.dcategorias {
		width: 120px;
		height: auto;
		max-width: 120px;
		max-height: 120px;
		min-width: 100px;
		margin: 10px;
		text-align: center;
		display: grid;
		grid-template-rows: auto;
		justify-items: center;

	}

	.imagen{
		width: 80px !important;
		height: 80px !important;
	}
	.dcategoria span{
		width: 100%;
		text-align: center;
	}

	.categorias{
		text-align: center;
		text-transform: capitalize;
		text-decoration: none;
		color: var(--a-color);
	}

	i{
		color: var(--a-color);
	}
</style>