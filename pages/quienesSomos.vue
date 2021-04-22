<template>
	<section>
		<div class="fondoTitulo">
			<h1>Quienes Somos</h1>
			
		</div>
		<div class="contenedorPrincipal">

			<img src="@/assets/img/separador2.png" alt="separador" class="separador">
			<div class="contenedor">
				<div class="banner">
					<div>
						<h3>Prosk es una nueva app de trabajo y negocios, ideal para profesionales y trabajadores independientes, donde pueden promocionarse y mostrar lo que ofrecen de manera visual con fotos y videos como las redes sociales. </h3>
					</div>
				</div>
				<div class="parte2">
					<div class="cuadro1">
						<img src="@/assets/img/i_quienes1.jpg" alt="Quienes Somos">
					</div>
					<div class="cuadro2">
						<h4>También Prosk es para aquellas personas que necesitan contratar un servicio y no conocen a un proveedor confiable, o a quien consultarle o mismo si no lo encuentran fácilmente en Internet, en Prosk se puede buscar filtrando por categorías, subcategorías, geolocalización y también visualizar las calificaciones de los Proskers y así elegir el mejor proveedor. El espíritu de Prosk es desarrollar una comunidad donde todos pueden ser clientes y proveedores</h4>
					</div>
					<div class="cuadro3">
						<img src="@/assets/img/i_quienes2.jpg" alt="Quienes Somos">
					</div>

				</div>
				<div class="parte3">
					<h2>Descarga la app en google play, APP Gallery o  el app store, y Convertite en Prosker!!</h2>
				</div>


			</div>
		</div>
	</section>
</template>
<script>

export default {
	name: 'quienes',
	data() {
		return {
			
		}
	},

}
</script>
<style scoped>
	section{
		width: 100%;
	}
	h1{
		font-size: 3em;
		color: var(--d-color);
		font-weight: 800;
		margin-top: 1.5em;
	}
	h3{
		margin-top: .5em;
		font-size: 1.5em;
		color: var(--d-color);
		font-weight: 800;
		
	}
	h4 {
		font-size: 1.2em;
		color: var(--c-color);
		font-weight: 400;
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
	}
	.separador{
		margin-top: -20px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
		object-fit: fill;
	}
	.contenedorPrincipal{
		width: 100%;
		background-color: var(--e-color);
		margin-top: 120px;
	}
	.contenedor {
		width: 100%;
		padding: 2em 0;
	}

	.parte1 {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		width: 80%;
		margin: 2em auto;
		text-align: justify;
	}

	.div1 { grid-area: 1 / 1 / 2 / 2; }
	.div2 { grid-area: 1 / 2 / 2 / 3; }

	.div1,.div2{
		display: flex;
		padding: 10px
	}
	.div1{
		padding: 10px 30px;
	}
	.div1 img{
		width: 100px;
		height: 100px;
		padding: 0 10px;
	}
	.banner{
		background-image: url('@/assets/img/b_quienes.jpg');
		background-position: left;
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		min-height: 500px;
		margin-top:0px;
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
	.banner div h3{
		font-size: 1.5em;
		color: var(--b-color);
		font-weight: 600;
		line-height: 1.3;
	}
	.parte2 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(1, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		width: 90%;
		margin: 2em auto;
	}	

	.cuadro1 { grid-area: 1 / 1 / 2 / 2; }
	.cuadro2 { grid-area: 1 / 2 / 2 / 3; background-color: #013713; }
	.cuadro3 { grid-area: 1 / 3 / 2 / 4; }

	.parte2>div{
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.parte2>div h4{
		text-align: center;
		padding: 20px;
		color: var(--e-color)
	}
	.parte2 img{
		width: 100%;
		height: auto;
	}
	.parte3{
		width: 100%;
		padding: 10px 0;
		text-align: center;
		background-color: var(--b-color)
	}
	.parte3 h2{
		color: var(--e-color);
		margin: 10px

	}
	.ventajas {
		width: 100%;
		padding: 2em 0;
		background-color: var(--d-color);
		text-align: center;
	}
	.ventajas h1{
		color: var(--c-color);
		padding-bottom: 1em
	}
	.contenedorVentajas{
		width: 80%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin: auto;
	}
	.ventaja{
		height: 120px;
		display: grid;
		grid-template-columns: 150px 400px;
		grid-template-rows: 120px;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		justify-items: center;
		align-items: center;
		background-color: var(--e-color);
		margin: 10px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
	}
	.ventaja img{
		height: 110px;
		width: auto;
	}
	.ventaja p{
		font-size: .9em;
		padding: 10px 20px;
		text-align: justify;
	}
	@media (max-width: 1000px) {
		.fondoTitulo{
			height: 230px;
		}
		.contenedorPrincipal{
			margin-top: 150px;
		}
		h1{
			margin: 0;
		}
		.separador{
			margin-top: -5px;
		}
		.banner{
			background-position-x: -100px;
		}
		.parte2{
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, auto);
			width: 50%;
		}
		.cuadro1 { grid-area: 1 / 1 / 2 / 2; }
		.cuadro2 { grid-area: 2 / 1 / 3 / 2; }
		.cuadro3 { grid-area: 3 / 1 / 4 / 2; }
	}
	@media (max-width: 900px) {
		.banner{
			background-position-x: -200px;
		}
	}
	@media (max-width: 600px) {
		.banner{
			background-position-x: -300px;
		}
		.banner div{
			width: 50%;
			margin: 0 80px;
			text-align: right;
		}
		.parte2{
			width: 80%;
		}
	}
	@media (max-width: 500px) {
		.banner{
			background-position-x: -380px;
		}
		.banner div{
			width: 80%;
			margin: 0 10px;
			text-align: right;
		}
		.fondoTitulo h1{
			font-size: 2em;
		}
	}
</style>