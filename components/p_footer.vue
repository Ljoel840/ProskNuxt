<template>
	<footer>
		<div class="contenedor">
			<div class="div1">
				<h3>Nuestro soporte esta disponible en días laborales de 9:30 a 17:30 horas.</h3>
				<span>
					<div>
						<img src="@/assets/img/i_direccion.png" alt="icono direccion" class="iconos">
						<p>Av. Gral. Rivera 2248,</p>
						<p>11200 – Montevideo,</p>
						<p>Uruguay</p>
					</div>
					<div>
						<img src="@/assets/img/i_telefono.png" alt="icono telefono" class="iconos">
						<p>(+598) 24024966</p>
					</div>
					<div>
						<img src="@/assets/img/i_correo.png" alt="icono correo" class="iconos">
						<p>info@prosk.org</p>
					</div>					
				</span>
			</div>
			<div class="div2">
				<h3>Descargá la app desde tu PlayStore, AppStore o AppGallery</h3>
				<br>
				<span>
					<a href="http://hyperurl.co/DescargarPROSK">
						<img src="@/assets/img/i_playstore.png" alt="icono playstore" class="tiendas">
					</a>
					<a href="http://hyperurl.co/DescargarPROSK">
						<img src="@/assets/img/i_appstore.png" alt="icono appstore" class="tiendas">
					</a>
					<a href="http://hyperurl.co/DescargarPROSK">
						<img src="@/assets/img/i_appgallery.png" alt="icono appgallery" class="tiendas">
					</a>
				</span>
			</div>
		</div>
		<span class="terminos">
			<img src="@/assets/img/logowebprosk.png" alt="logo Prosk" style="height: 50px">
			<h4>es un proyecto de </h4>
			<img src="@/assets/img/i_humanphi.png" alt="logo HumanPhi">
			<h4>incubado por</h4>
			<img src="@/assets/img/i_ingenio.png" alt="logo Ingenio">
			<img src="@/assets/img/l_latu.png" alt="logo Latu" style="height: 50px">
		</span>
		<span class="politicas">
			<a href="https://prosk.org/web/politicas/terminos.pdf" target="_blank">Términos y condiciones. </a>
			<a href="https://prosk.org/web/politicas/politicas.pdf" target="_blank">Política de privacidad.</a>
		</span>
		<br>
		<p class="version">delfasoft© 2021. Version: {{version}}</p>
	</footer>
</template>
<script>
export default {
	name: 'Footer',
	computed: {
		version () {
			return process.env.VUE_APP_VERSION
		}
    },
	
}
</script>
<style scoped>
	footer{
		background-color: var(--g-color);
		text-align: center;
		color: var(--e-color);
		padding: 2em 0;
	}
	p, h3,h4{
		color: var(--e-color);
		font-family: sans-serif;
	}
	h4{
		font-size: 1.2em;
	}
	.contenedor{
		width: 100%;
		padding: 4em 0;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	.div1 { grid-area: 1 / 1 / 2 / 2; }
	.div2 { grid-area: 1 / 2 / 2 / 3; }

	.div1 span{
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		margin: 20px 0
	}
	.div1 span{
		text-align: center;
	}
	.iconos{
		width: 80px;
		height: 80px;
	}
	.div2 span{
		display: flex;
		justify-content: center;
		align-items: flex-start;
		margin: 20px 0
	}
	.tiendas{
		width: auto;
		height:	50px;
		margin: 5px;
	}
	.terminos{
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.terminos img{
		width: auto;
		height: 30px;
		padding: 0 15px 10px 15px;
	}
	.politicas a{
		color: var(--e-color);
		text-decoration: none;
		cursor: pointer;
	}

	.version{
		font-size: .8em;
		color:var(--c-color);
		margin-top: 1em
	}
	@media (max-width: 1200px) {
		.contenedor {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(2, 1fr);
			grid-column-gap: 0px;
			grid-row-gap: 0px;
		}

		.div1 { grid-area: 1 / 1 / 2 / 2; }
		.div2 { grid-area: 2 / 1 / 3 / 2; }
	}
	@media (max-width: 930px) {
		.terminos{
			flex-wrap: wrap;
		}

	}
	@media (max-width: 560px) {
		.div1 span{
			flex-wrap: wrap;
		}
		.div2 span{
			flex-wrap: wrap;
		}
	}
</style>