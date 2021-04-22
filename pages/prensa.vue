<template>
	<section>
		<div class="fondoTitulo">
		<h1>Prensa</h1>
		</div>
		<div class="contenedorPrincipal">
		<img
			src="@/assets/img/separador2.png"
			alt="separador"
			class="separador"
		/>
		<h2>Seleccione la nota de prensa</h2>
		<div class="contenedor">
			<figure class="snip0015" v-for="n in noticias" :key="n.id">
			<img :src="n.imagen" alt="sample38" />
			<figcaption>
				<h2>
				<span>{{ n.autor }}</span>
				</h2>
				<h2>{{ n.fecha }}</h2>
				<p>{{ n.titulo }}</p>
				<a
				@click="
					posicion = n.id;
					mostrar = true;
				"
				></a>
			</figcaption>
			</figure>
		</div>
		<transition name="fade">
			<noticia :datos="noticias[posicion]" v-if="mostrar" />
		</transition>
		</div>
	</section>
</template>
<script>
	import articulos from "../middleware/articulos";
	export default {
		name: "prensa",
		components: {
			noticia: () => import("../components/mostrarArticulo"),
		},
		data() {
			return {
			noticias: articulos,
			posicion: 0,
			mostrar: false,
			};
		},
	};
</script>
<style scoped>
	section {
		width: 100%;
		/* min-height: 85vh; */
	}
	h1 {
		font-size: 3em;
		color: var(--d-color);
		font-weight: 800;
		margin-top: 1.5em;
	}
	h3 {
		margin-top: 0.5em;
		font-size: 1.5em;
		color: var(--d-color);
		font-weight: 800;
	}
	h4 {
		font-size: 1.2em;
		color: var(--c-color);
		font-weight: 400;
	}
	.fondoTitulo {
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
	}
	.separador {
		margin-top: -20px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
		object-fit: fill;
	}
	.contenedorPrincipal {
		width: 100%;
		background-color: var(--e-color);
		margin-top: 120px;
		text-align: center;
	}
	.contenedor {
		width: 100%;
		padding: 2em 0;
		display: flex;
		justify-content: center;
		cursor: pointer;
		flex-wrap: wrap;
	}

	figure.snip0015 {
		font-family: "Raleway", Arial, sans-serif;
		color: #fff;
		position: relative;
		overflow: hidden;
		margin: 10px;
		min-width: 220px;
		max-width: 310px;
		max-height: 220px;
		width: 100%;
		background: #000000;
		text-align: center;
	}
	figure.snip0015 * {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	figure.snip0015 img {
		opacity: 1;
		width: 100%;
		-webkit-transition: opacity 0.35s;
		transition: opacity 0.35s;
	}
	figure.snip0015 figcaption {
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 3em 3em;
		width: 100%;
		height: 100%;
	}
	figure.snip0015 figcaption::before {
		position: absolute;
		top: 50%;
		right: 30px;
		bottom: 50%;
		left: 30px;
		border-top: 1px solid rgba(255, 255, 255, 0.8);
		border-bottom: 1px solid rgba(255, 255, 255, 0.8);
		content: "";
		opacity: 0;
		background-color: #ffffff;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transition-delay: 0.6s;
		transition-delay: 0.6s;
	}
	figure.snip0015 h2,
	figure.snip0015 p {
		margin: 0 0 5px;
		opacity: 0;
		-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
		transition: opacity 0.35s, -webkit-transform 0.35s, -moz-transform 0.35s,
			-o-transform 0.35s, transform 0.35s;
	}
	figure.snip0015 h2 {
		word-spacing: -0.15em;
		font-weight: 300;
		text-transform: uppercase;
		-webkit-transform: translate3d(0%, 50%, 0);
		transform: translate3d(0%, 50%, 0);
		-webkit-transition-delay: 0.3s;
		transition-delay: 0.3s;
	}
	figure.snip0015 h2 span {
		font-weight: 800;
	}
	figure.snip0015 p {
		font-weight: 200;
		-webkit-transition-delay: 0s;
		transition-delay: 0s;
	}
	figure.snip0015 a {
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		position: absolute;
		color: #ffffff;
	}
	figure.snip0015:hover img {
		opacity: 0.35;
	}
	figure.snip0015:hover figcaption h2 {
		opacity: 1;
		-webkit-transform: translate3d(0%, 0%, 0);
		transform: translate3d(0%, 0%, 0);
		-webkit-transition-delay: 0.3s;
		transition-delay: 0.3s;
	}
	figure.snip0015:hover figcaption p {
		opacity: 0.9;
		-webkit-transition-delay: 0.6s;
		transition-delay: 0.6s;
	}
	figure.snip0015:hover figcaption::before {
		background: rgba(255, 255, 255, 0);
		top: 30px;
		bottom: 30px;
		opacity: 1;
		-webkit-transition-delay: 0s;
		transition-delay: 0s;
	}

	@media (max-width: 1000px) {
		.fondoTitulo {
			height: 230px;
		}
		.contenedorPrincipal {
			margin-top: 150px;
		}
		h1 {
			margin: 0;
		}
		.separador {
			margin-top: -5px;
		}
}
</style>