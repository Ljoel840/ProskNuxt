<template>
	<section>
		<div class="contenedorPreguntas">
			<button class="pregunta" @click="mostrar = !mostrar"> 
				<i class="material-icons" >{{!mostrar ? 'add': 'remove'}}</i> {{p.FAQItemQuestion}}
			</button>
			<transition name="fade">
				<span class="respuesta" v-if="mostrar"> 
					<p v-html="p.FAQItemResponse" v-if="p.FAQItemResponse"></p>
					<div class="media" v-for="(m,ind) in p.FAQItemMedia" :key="ind">
						<video class="tipo" width="560" height="315" :src="m.url" v-if="m.tipo==='Video'&&verificarYouTube(m.url)<0" controls>
						</video>
						<iframe class="tipo" width="560" height="315" :src="`${url}`+`${obtenerUrl(m.url)}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-if="m.tipo==='Video'&&verificarYouTube(m.url)>=0"></iframe>
						<img class="imagen" :src="m.url" v-if="m.tipo==='Image'">
						<a class="documento" :href="m.url" v-if="m.tipo==='Other'">Ver documento</a>
						<br>
					</div>
				</span>
			</transition>
		</div>
	</section>
</template>
<script>
export default {
	name: "pregunta",
	props:{
		p:{
			type: Object
		}
	},
	data() {
		return {
			mostrar: false,
			videoUrl: 'g6NR0hpn-pU',
			url: 'https://www.youtube.com/embed/'
		};
	},
	methods: {
		verificarYouTube(url){
			return url.indexOf('youtu')
		},
		obtenerUrl(url){
			var direccion = ''
			if (url.indexOf('youtu.be/')>0) {
				direccion = url.slice(url.indexOf('youtu.be/')+8)
			}else{
				direccion = url.slice(url.indexOf('youtube.com/embed/')+18)
			}
			return direccion
		}
	},
};
</script>
<style scoped>
	section{
		width: 100%
	}
	i{
		margin: 0 5px;
		color: #cc9933;
	}
	p{
		padding: 10px;
	}

	.contenedorPreguntas{
		display: grid;
		grid-column: 1;
		margin: 5px 0;
		width: 100%;
		justify-items: left;
		text-align: left
	}

	.pregunta{
		width: 100%;
		display: flex;
		justify-content: left;
		align-items: center;
		background-color: var(--b-color);
		border: none;
		color: #fff;
		outline: none;
		font-size: 1em;
		text-align: left;
		padding: 10px 0;
		
	}
	.respuesta{
		width: 100%;
		background-color: var(--e-color);
		color: var(--c-color);
		text-align: justify;
	}
	.media {
		margin: 10px 0;
	}
	.tipo{
		width: 100%;
	}
	.documento{
		color: #fff;
	}
	.imagen {
		width: 100%;
		max-width: 400px;
		margin: auto;
	}

</style>