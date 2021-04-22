<template>
	<section >
		<div class="fondoTitulo">
		</div>
		<div class="contenedorPrincipal" v-if="data2">
			<img :src="data2.BlogPostHeaderImage" alt="Blog" class="fondoBlog" v-if="data2.BlogPostHeaderImage">
			<div class="titulos">
				<h1>{{data2.BlogPostTitle}}</h1>
				<h3>{{cambiarFecha(data2.BlogPostDatePublished)}}</h3>
				<button v-for="(b,index) in data2.BlogPostTags" :key="index" class="tags" @click="ir('Home',b.BlogTagId)">{{b.BlogTagName}}</button>
			</div>
			<div class="flag">
			</div>
			<div class="contenedor">
				<p class="textoBlog" v-html="data2.BlogPostContent"></p>
			</div>
			<h2>Otros temas que pueden interesarte</h2>
			<button v-for="c in blogCategorias.datos" :key="c.idEnc" class="categorias"  @click="ir('Categoria Blog',c)">{{c.BlogCategoryName}}</button>
		</div>
	</section>
</template>
<script>
import extraerBlog from "@/middleware/extraerBlog"
export default {
	name: 'detalleBlog',
	props:{
		data: {
			type: Object
		}
	},
	data() {
		return {
			error: null,
			cargandoBlog: false,
			options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12:"false" },
			titleBlog : this.$route.params.titleBlog,
			titleBlog2 : this.$route.params.titleBlog,
			data2 : {},

		}
	},
	async asyncData({params}) {
    //   const article = await $content('articles', params.titleBlog).fetch()
		const article = params.titleBlog
		// console.log('Articulo: ',params)
      return { article }
    },
	
	head() {
		return{
			title: `Prosk - ${this.seoActual[0].BlogPostTitle}`,

			meta: [
				{name: 'description', content: 'Blog: ' + this.seo.datos[0].BlogPostTitle + ' en Prosk '},
				{property: 'og:title', content: 'Prosk - ' + this.seo.datos[0].BlogPostTitle },
				{property: 'og:site_name', content: 'Prosk'},
				{property: 'og:description', content: 'Blog: ' + this.seo.datos[0].BlogPostTitle + ' en Prosk '},
				{property: 'og:type', content: 'article'},
				{property: 'og:url', content: 'https://prosk.org/#/'+this.article},
				{property: 'og:image', content: this.seoActual[0].BlogPostHeaderImage }    
			]
		}
    },
	async created() {
		try{
			console.log('title', this.seoActual)
			window.scrollTo(0, 0)
			this.titleBlog=this.quitarGuiones(this.titleBlog)
			if (this.data) {
				this.data2=this.data
			}else{
				await extraerBlog({idEnc: ""})
					.then(contenido =>{
						contenido.forEach(element => {
							if (element.BlogPostTitle.toLowerCase().includes(this.titleBlog)){
								this.data2=element
							}
						});
					}).catch(error => {
						console.log(error)
					})
			}
		}
		catch (error){
				this.error = error
				console.log(this.error)
			}	
	},
	computed: {
		blogTags(){
			return this.$store.state.blogTags
		},
		blogCategorias(){
			return this.$store.state.blogCategorias
		},
		blog(){
			return this.$store.state.blog
		},
		seo(){
			return this.$store.state.seo
		},
		seoActual(){
			return this.seo.datos.filter(e => e.BlogPostTitle.toLowerCase().includes(this.quitarGuiones(this.article)))
		}

	},
	methods: {
		cambiarFecha(fecha2){
			let fecha = new Date(fecha2);
			return fecha.toLocaleDateString('es-ES',this.options);
		},
		ir(pag,data){
			this.$router.push({
				name: pag, 
				params: {data}
			}) 
		},
		quitarGuiones(nombre){
			return nombre.replace(/-/g, " ").toLowerCase()
		},
	},

}
</script>
<style scoped>
	section{
		width: 100%;
		min-height: 45vh;
		
	}
	h1{
		font-size: 2.5em;
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
	.fondoTitulo{
		width: 100%;
		height: 100px;
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
		margin-top: -60px;
		width: 100%;
		height: auto;
		background-color: transparent;
		border: none;
	}
	.contenedorPrincipal{
		width: 100%;
		background-color: var(--d-color);
		text-align: center;
		padding-bottom: 3em ;
	}
	.contenedor {
		width: 95%;
		max-width: 900px;
		margin: 2em auto 0 ;
		padding: 2em 0 4em;
		text-align: justify;	
	}
	.fechaBlog  {
		padding: 10px 0;
		margin: 0;
		color: #a8a8a8
	}

	.tituloBlog{
		color: var(--a-color);
	}
	.textoBlog  {
		padding: 5px 0;
		line-height: 1.5;
	}

	.imgBlog {
		width: 100%;
		height: 200px;
		margin: 5px;
		border: 2px solid var(--d-color);
		border-radius: 7px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		object-fit: fill;
		cursor: pointer;
	}
	.blogs {
		width: 100%;
		max-width: 450px;
	}

	.blogs button{
		float: right;
		width: 100px;
		padding: 10px;
	}

	.imgBlog:hover{
		opacity: .5;
		text-decoration: none;
	}
	.fondoBlog{
		width: 100%;
		max-width: 900px;

		height: 300px;
		object-fit: cover;
		margin: auto;
		
	}


	.flag{
		width: 100%;
		height: 50px;
		box-sizing: content-box;
		/* padding-top: 15px; */
		position: relative;
		background: transparent;
		color: white;
		font-size: 11px;
		letter-spacing: 0.2em;
		text-align: center;
		text-transform: uppercase;
		margin-top: -53px;
	}
	.flag:after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0;
		height: 0;
		border-top: 60px solid transparent;
		border-left: 50vw solid var(--d-color);
		border-right: 50vw solid var(--d-color);
    }
	.contenedorPrincipal .titulos{
		width: 50%;
		position: absolute;
		margin: auto;
		margin-top: -250px;
		z-index: 10000;
		color: #fff;
		text-align: center;
		left: 50vw;
		margin-left: -25vw;
	}
	.titulos h1,h3{
		margin: 0;
		color: var(--d-color);
		text-shadow: 0 0 7px rgb(97, 97, 97)
	}
	.tags{
		background-color: var(--f-color);
		color: var(--e-color);
		padding: 7px 10px;
		margin: 2px;
		border: none;
		outline: none;
		cursor: pointer;
		border-radius: 7px;
		font-size: .6em;
	}
	.categorias{
		background-color: var(--h-color);
		color: var(--e-color);
		padding: 10px;
		margin: 3px;
		border: none;
		outline: none;
		border-radius: 7px;
		cursor: pointer;
		text-transform: uppercase;
	}


	@media (max-width: 1000px) {
		.contenedorPrincipal .titulos{
			width: 90%;
			left: 50vw;
			margin-left: -45vw;
			margin-top: -200px;
		}
		.titulos h1{
			font-size: 2em;
		}
		.titulos h3{
			font-size: 1.4em;
		}
	}

</style>