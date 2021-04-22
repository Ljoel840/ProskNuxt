<template>
	<section>
		<h1 v-if="proskersDestacados.length>0">Proskers Recomendados</h1>
		<br>
		<barra v-if="proskersDestacados.length==0"/>
		<div class="contenedor" v-if="proskersDestacados.length>0">
			<sliderDestacados  v-if="ancho>600"/>
			<sliderDestacadosCel v-else/>
		</div>
	</section>
</template>
<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
export default {
	name: 'proskerDestacados',
	mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
	components: {
		spinnerCircular: () => import('@/components/spinnerCircular'),
		barra: () => import('@/components/barra'),
		sliderDestacados: () => import('./sliderDestacados'),
		sliderDestacadosCel: () => import('./sliderDestacadosCel'),
	},
	computed: {
		proskersDestacados(){
			return this.$store.state.proskers.proskersDestacados
		},
		ancho(){
			return this.$vssWidth
		}
	},
}
</script>
<style scoped>
	section{
		width: 100%;
		height: auto;
		margin-top: 1.5em;
		margin-bottom: 1em;
	}
	h1{
		font-size: 2em;
		color: var(--c-color);
		text-align: left;
		margin-left: 5vw
	}
	.contenedor{
		width: 100%;
		height: auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: auto;
		flex-wrap: wrap;
	}
	/* .contenedor div{
		width: 200px;
		height: 200px;
		min-width: 200px;
		min-height: 200px;
		border-radius: 100px;
		border: 2px solid var(--a-color);
		margin: 10px;
		background-position: center;
		background-size: 250px auto;
		background-repeat: no-repeat;
	} */


	.contenedorUsuario{
		width: 400px;
		height: auto;
		display: flex;
		justify-content: center;
		margin: 10px;
	}


	.imagen{
		width: 200px;
		height: 200px;
		background-position: center;
		background-size: 250px auto;
		background-repeat: no-repeat;
		border-radius: 100px;
		border: 2px solid var(--b-color);
	}
	
	.texto{
		width: 200px ;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.texto h1{
		margin: 0 10px;
		color:  var(--c-color);
		font-size: 1.5em;
	}
	.texto h4{
		margin: 0 10px;
		color:  var(--b-color)
	}

	@media (max-width:1400px) {
		.contenedorUsuario div{
			width: 150px;
			height: 150px;
			min-width: 150px;
			min-height: 150px;
			background-size: 200px auto;
		}	
	}

</style>