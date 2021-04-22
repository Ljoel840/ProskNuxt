<template>
	<section>
		<div class="fondoTitulo">
			<h1>Funcionamiento</h1>
			
		</div>
		<div class="contenedorPrincipal">

			<img src="@/assets/img/separador2.png" alt="separador" class="separador">
			<h2>La nueva App para contratación de Profesionales Independientes</h2>
			<div class="contenedorVideo">
				<video width="100%" height="auto" controls poster="@/assets/img/poster_video.jpg" >
 					 <source src="@/assets/video/proskv07.mp4" type="video/mp4">
 					 Your browser does not support HTML video.
				</video>

			</div>
			<h2>¿Cómo usar Prosk?</h2>
			<div class="contenedor">
				<div class="div1" @mouseover="mostrar1=true" @mouseleave="mostrar1=false">
					<transition name="slide-fade">
						<span class="subtitulo" v-if="!mostrar1">Hacé lucir tu trabajo</span>
					</transition>
					<transition  name="fade" mode="out-in">
						<div class="parrafos" v-if="mostrar1" >
								<p>Como toda red social, hay un perfil donde enseñar tus trabajos a través de fotografías y videos generando una vidriera para atraer a los contratantes. Tenés que lucirte, ser creativo, explicar bien qué es lo que hacés y que tan bien sabes hacerlo.</p>
								<br>
								<p>Cuanto más información atractiva pongas en tus publicaciones, más contacto generarás y por ende, más trabajos para realizar. Tené en cuenta que la foto sea de buena calidad. Recordá que estamos en un momento donde todo entra por los ojos, donde el factor estético es sumamente importante.</p>
							</div>
						<img id="imagen1" src="@/assets/img/i_funcionamiento1.jpg" alt="Funcionalidad" v-if="!mostrar1">
					</transition>
				</div>
				<div class="div2" @mouseover="mostrar2=true" @mouseleave="mostrar2=false">
					<transition name="slide-fade">
						<span class="subtitulo" v-if="!mostrar2">Interactuá</span>
					</transition>
					<transition  name="fade" mode="out-in">
					<div class="parrafos" v-if="mostrar2">
						<p>El contratante filtra su búsqueda y cuando encuentra el producto o servicio que buscaba, puede contactar a la persona que lo brinda, a través del sistema de chat directamente para intercambiar detalles, cotizar y acordar el trabajo sin intermediarios.</p>
						<br>
						<p>Creá tu networking siguiendo a tus colegas y posibles clientes. Sé activo, demostrá proactividad, ¿quién no desea contratar a alguien con iniciativa?</p>
					</div>
					<img id="imagen2" src="@/assets/img/i_funcionamiento2.jpg" alt="Funcionalidad" v-if="!mostrar2">
					</transition>
				</div>
				<div class="div3" @mouseover="mostrar3=true" @mouseleave="mostrar3=false" >
					<transition  name="slide-fade">
						<span class="subtitulo" v-if="!mostrar3">Concretá</span>
					</transition>
					<transition  name="fade" mode="out-in">
						<div class="parrafos" v-if="mostrar3">
							<p>Una vez que te contacten tenés que concretar el trabajo. Fijate en tu chat, en tus notificaciones y apagá todas las dudas que le puedan surgir a tu contratante. Lo importante es que sepas aprovechar cada contacto que PROSK te genere.</p>
							<br>
							<p>Es fundamental que tengas ejemplos y precios concretos de tus trabajos y servicios. Contestá rápido, ya que hoy en día estamos acostumbrados a la inmediatez y cuanto mejor sea el servicio de respuesta, más posibilidades de concretar la venta tendrás.</p>
						</div>
						<img id="imagen3" src="@/assets/img/i_funcionamiento3.jpg" alt="Funcionalidad" v-if="!mostrar3">
					</transition>
				</div>
			</div>
			<div class="ventajas">
				<h2>Ventajas</h2>
				<div class="contenedorVentajas">
					<div class="ventaja" v-for="v in listaVentajas" :key="v.id">
						<img :src="v.imagen" alt="Ventaja1">
						<p>{{v.texto}}</p>
					</div>
				</div>
			</div>
			<img class="separador" src="@/assets/img/separador.png" alt="">
			<div class="contenedorPreguntas">
				<h2>Preguntas Frecuentes</h2>
				<barra v-if="cargandoPreguntas"/>
				<preguntas :datos="datosPreguntas" v-if="!cargandoPreguntas && datosPreguntas.length>0" />
			</div>

		</div>
	</section>
</template>
<script>
import extraerPreguntas from '../middleware/extraerPreguntas'
import cargarVentajas from '../middleware/cargarVentajas'
export default {
	name: 'funcionamiento',
	components:{
		preguntas: () => import('@/components/preguntas'),
		barra: () => import ('@/components/barra')
	},

	data() {
		return {
			mostrar1:false,
			mostrar2:false,
			mostrar3:false,
			mostrar4:false,
			cargandoPreguntas: false,
			datosPreguntas: [],
			listaVentajas:cargarVentajas,
			error: null,
			cargandoPreguntas: true
		}
	},
	created() {
		this.$store.dispatch('categoriasFAQ/getCategoriasFAQ')
		if (this.categoriasFAQ.datos[0]) {
			this.cargarPreguntas()
		}
	},
	computed: {
		categoriasFAQ(){
			return this.$store.state.categoriasFAQ
		}
	},
	methods: {
		async cargarPreguntas(){
			try {
                this.error = null
                this.cargandoPreguntas = true
				if (this.categoriasFAQ.datos[0]) {
					this.datosPreguntas=await extraerPreguntas ({
						idEnc: this.categoriasFAQ.datos[0].FAQCategoryId,
					})
					this.cargandoPreguntas = false
				}
            }
            catch (error) {
				this.error = error
				console.log(this.error)
            }
			this.cargandoPreguntas = false
		},
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
	h2{
		font-size: 2em;
		color: var(--c-color);
		font-weight: 800;
		margin: 2em 0 1em 0;	
		text-align: center;
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
	.contenedorVideo{
		width: 70%;
		text-align: center;
		margin: auto;
	}
	.contenedor {
		width: 100%;
		margin: 2em auto;
		padding: 2em 0;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.div1, .div2, .div3{
		width: 420px;
		height: auto;
	}
	.div1{
		background-color: #02173C;
	}
	.div2{
		background-color: #560f22;
	}
	.div3{
		background-color:#013713;
	}

	
	.contenedor img{
		width: 100%;
		height: 100%;
		opacity: .4;
		object-fit: cover;
		position: relative;
	}

	.contenedor img:hover {
		opacity: 1;
	}

	.subtitulo{
		width: 200px;
		background-color: rgba(0, 0, 0, .7);
		color: var(--e-color);
		padding: 10px 20px;
		margin-top:25vh;
		position: absolute;
		z-index: 1;
	}
	.parrafos{
		width: 420px;
		color: var(--d-color);
		/* margin: 20px */
		padding: 20px 0;
	}
	.parrafos p{
		/* width: 100%; */
		padding: 0 20px;
		text-align: justify;
	}
	/* .separador{
		width: 100%;
		height: auto;
		border: none;
		z-index: 3;
		background-color: transparent;
	} */




	.contenedorPreguntas{
		background-color: var(--d-color);
		padding: 1em;
		text-align: center;
		margin-top: -60px;
	}


	.ventajas {
		width: 100%;
		padding: 2em 0;
		background-color: var(--e-color);
		text-align: center;
	}
	.ventajas h1{
		color: var(--c-color);
		padding-bottom: 1em
		
	}

	.contenedorVentajas{
		width: 90%;
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
		.ventajas{
			padding: 4em 0;
		}
		.contenedorPreguntas{
			margin-top: -30px;
		}
	}

	@media (max-width: 600px) {
		.contenedorVideo{
			width: 95%;
		}
		.ventaja{
			height: 220px;
			grid-template-columns: 130px 220px;
			grid-template-rows: 220px;

		}
		h1{
			font-size: 2em;
		}

	}

</style>