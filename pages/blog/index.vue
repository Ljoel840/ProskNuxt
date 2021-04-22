<template>
	<section>
		<div class="fondoTitulo">
		</div>
		<div class="contenedorPrincipal">
			<img src="@/assets/img/f_blog.jpg" alt="Blog" class="fondoBlog">
			<div class="titulos">
				<h1>Blog</h1>
				<h3>En este blog podrás encontrar todo lo relacionado a trabajo, empresas, candidatos, buenas prácticas, tecnología, tips ¡y más!</h3>
			</div>
			<div class="flag">
			</div>
			<h2>Categorías</h2>	
			<button class="tags" :class="opcion===null ? 'botonActivo' : null" @click="opcion=null">TODOS</button>
			<button v-for="(b,indexB) in blogTags.datos" :key="indexB" class="tags" :class="opcion===b.BlogTagId ? 'botonActivo' : null" @click="opcion=b.BlogTagId">{{b.BlogTagName}}</button>
			<div class="contenedor">
				<div class="blogs" v-for="(d,index) in listaBlog" :key="index">
					<img class="imgBlog" :src="d.BlogPostHeaderImage" @click="ir('titleBlog',d)">
					<p class="fechaBlog">{{cambiarFecha(d.BlogPostDatePublished)}}</p>
					<h3 class="tituloBlog"><strong>{{d.BlogPostTitle}}</strong></h3>
					<p class="textoBlog" v-html="d.BlogPostContent.substr(0,160)+'...'"></p>
					<button class="botonAceptar" @click="ir('titleBlog',d)">VER MÁS</button>
				</div>
			</div>
			<h2>Otros temas que pueden interesarte</h2>
			<button v-for="c in blogCategorias.datos" :key="c.idEnc" class="categorias"  @click="ir('categoriaBlog',c)">{{c.BlogCategoryName}}</button>
		</div>
	</section>
</template>
<script>
export default {
	name: 'blog',
	props:{
		data:{
			type: String,
			default: null
		}
	},
	data() {
		return {
			error: null,
			cargandoBlog: false,
			datos: [],
			options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12:"false" },
			prueba:[],
			opcion: null
		}
	},
	created() {
		// window.scrollTo(0, 0)
		// console.log(this.$route)
		if (this.blog.datos.length<=0) {
			this.$store.dispatch('blog/getBlog')
			this.$store.dispatch('blogTags/getTagsBlog')
			this.$store.dispatch('blogCategorias/getCategoriasBlog')
		}
		this.opcion=this.data
	},
	computed: {
		blog(){
			return this.$store.state.blog
		},
		blogTags(){
			return this.$store.state.blogTags
		},
		blogCategorias(){
			return this.$store.state.blogCategorias
		},
		listaBlog(){
			if (!this.opcion) {
				return this.blog.datos				
			}else{
				return this.blog.datos.filter((item) => item.BlogPostTags.map(e=>e.BlogTagId).includes(this.opcion))
			}
		}
	},
	methods: {
		cambiarFecha(fecha2){
			let fecha = new Date(fecha2);
			return fecha.toLocaleDateString('es-ES',this.options);
		},
		ir (pag,data) {
			var titleBlog = ''
			if (pag==='titleBlog') {
				titleBlog = this.quitarEspacios(data.BlogPostTitle)
			}
			this.$router.push({
				name: pag, 
				params: {data,titleBlog}
			})
		},
		quitarEspacios(nombre){
			return nombre.replace(/ /g, "-").toLowerCase()
		}
	},
}
</script>
<style scoped>
	section{
		width: 100%;
		min-height: 45vh;
		
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
		padding: 1em 0;
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
		/* margin-top: 100px; */
		text-align: center;
		padding-bottom: 3em;
	}
	.contenedor {
		width: 100%;
		margin: 2em auto 0 ;
		padding: 2em 0 4em;
		
		/* column-count: 2;
        column-gap: 2em; */
		display: flex;
		justify-content: space-around;	
		text-align: justify;	
		flex-wrap: wrap;
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
		
	}


	.imgBlog {
		width: 95%;
		height: 200px;
		margin: 5px;
		border: 2px solid var(--d-color);
		border-radius: 7px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		object-fit: cover;
		cursor: pointer;
	}
	.blogs {
		width: 100%;
		max-width: 450px;
		padding: 20px;
	}
	.blogs h3{
		text-shadow: none
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
		background-color: var(--c-color);
		color: var(--e-color);
		padding: 10px;
		margin: 5px;
		border: none;
		outline: none;
		cursor: pointer;
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

	@media (max-width: 700px) {
		.contenedorPrincipal .titulos{
			width: 90%;
			left: 50vw;
			margin-left: -45vw;
			margin-top: -220px;
		}
		.blogs {
			width: 100%;
			max-width: 350px;
		}
		.titulos h1{
			font-size: 2em;
		}
		.titulos h3{
			font-size: 1.4em;
		}
	}
</style>