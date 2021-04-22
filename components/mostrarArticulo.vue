<template>
	<section>
		<h1>{{datos.titulo}}</h1>
		<div class="contenedorNoticia">
			<div class="break">
				<img :src="datos.imagen" alt="">
				<h3>Nota en {{datos.autor}} del {{datos.fecha}}</h3>
				<p class="nota" v-html="datos.nota"></p>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'mostrarArticulo',
	props: {
		datos:{
			type: Object
		}
	}

}
</script>
<style scoped>
	section{
		width: 90%;
		margin: auto;
	}
	h1{
		background-color: var(--d-color);
		padding: 10px;
		font-size: 1.5em;
		text-align: center;
		margin: 1em 0;
	}
	.contenedorNoticia{
		width: 100%;
		column-count: 3;
        column-gap: 2em;
		min-height: 600px;
		max-height: 900px;
		margin: 2em 0;
	}
	.break {
        break-inside: avoid;
        page-break-inside: avoid;
    }
	img{
		width: 100%;
		height: auto;
	}
	p{
		text-align: justify;
	}
	h3{
		color: var(--a-color);
		padding: 10px 0;
	}
	.nota>>>a {
		color: var(--a-color);
		text-decoration: none;
		font-weight: 600;
	}

	@media (max-width: 1300px) {
		.contenedorNoticia{
			column-count: 2;
			min-height: 600px;
			max-height: 1200px;
		}
	}
	@media (max-width: 1000px) {
		.contenedorNoticia{
			column-count: 2;
			min-height: 600px;
			max-height: 1500px;
		}
	}
	@media (max-width: 800px) {
		.contenedorNoticia{
			column-count: 1;
			min-height: 600px;
			max-height: 100%;
		}
	}
</style>