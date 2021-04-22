<template>
	<div class="dPublicaciones" @mouseover="cortina=true" @mouseleave="cortina=false">
		<div class="noLogueado" v-if="cortina && !usuario.ok"> 
			<p>Para ver las publicaciones favor registrarse o loguearse</p>
		</div>
		<div :class="imgAncho(d.imagen)>imgAlto(d.imagen) ? 'fondo':'fondo2'" :style="{ backgroundImage: 'url(' + d.imagen + ')' }" @click="ir('Publicacion',d)" v-if="d.imagen"></div>
		<video class="fondo" :src="d.video"  @click="ir('Publicacion',d)" v-else></video>
		<div class="descripcion">
			<p>{{d.descripcion}}</p>
		</div>
		<span class="prosker">
			<div class="foto" :style="d.foto ?{ backgroundImage: 'url(' + d.foto + ')' }:{ backgroundImage: 'url(' + sinFoto + ')' }" @click="ir('Prosker',d.idEncUsuario)" ></div>
			<div>
				<p class="nombre">{{d.nombre.toLowerCase()}}</p>
				<p class="categoria">{{d.categoria.toLowerCase()}}</p>
			</div>
			<span>
				<i class="material-icons">favorite</i>
				<p>{{d.like}}</p>
			</span>
		</span>
		<br>
	</div>
</template>
<script>
export default {
	name: 'publicacion',
	props:{
		d:{
			type: Object
		}
	},
	data() {
		return {
			sinFoto: require ('@/assets/img/usuario.png'),
			cortina: false

		}
	},
	computed: {
		usuario(){
			return this.$store.state.usuario
		}
	},
	methods: {
		imgAncho(imagen){
			var img1 = new Image()
			img1.src = imagen
			return img1.width
		},
		imgAlto(imagen){
			var img1 = new Image()
			img1.src = imagen
			return img1.height
		},

		ir (pag,data) {
			this.$router.push({
				name: pag, 
				params: {data}
			}) 
		},
	},
}
</script>
<style scoped>
	.dPublicaciones {
		width: 100%;
		height: auto;
		max-width: 250px;
		max-height: 300px;
		margin: 20px;
		padding: 10px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

	}
	.fondo{
		width: 100%;
		height: 200px;
		background-size: 100% auto ;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.fondo2{
		width: 100%;
		height: 200px;
		background-size: auto 100% ;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.contenedor div img{
		width: 100%;
		height: auto;
	}

	.prosker{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* background-color: var(--d-color); */
	}
	.prosker .foto{
		width: 40px;
		height: 40px;
		min-width: 40px;
		min-height: 40px;
		border-radius: 30px;
		margin: 2px;
		/* background-image: url('./foto1.jpg'); */
		background-color: var(--b-color);
		background-size: auto 50px ;
		background-position: center;
		background-repeat: no-repeat;
	}
	.prosker p{
		margin: 0 5px;
	}
	.prosker .categoria{
		text-transform: capitalize;
		line-height: 1;
		font-size: .7em;
	}
	.prosker .nombre{
		color: var(--a-color);
		font-weight: 800;
		text-transform: capitalize;
		line-height: 1;
		font-size: .7em;
	}
	.prosker span{
		display: flex;
		color: var(--a-color);
		/* background-color: var(--d-color); */
	}

	i{
		color: var(--a-color);
	}
	.descripcion{
		width: 100%;
		height: 40px;
		overflow: hidden;
		margin: 5px 0;
	}
	.descripcion p{
		font-size: .9em;
		line-height: 1;

	}
	.noLogueado{
		position: absolute;
		width: 250px;
		height: 300px;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 0;
		margin-left: 0;
		text-align: center;
	}
	.noLogueado p {
		color: var(--e-color);
		padding: 10px;
	}
</style>