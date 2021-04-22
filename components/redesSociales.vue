<template>
	<aside>
		<button @click="redes=!redes"><i class="material-icons">{{redes ? 'navigate_before': 'navigate_next'}}</i></button>
		<a href="https://www.facebook.com/prosk.org"  :class="redes ? 'aparecer':null" v-if="redes" target="_blank">
			<img src="@/assets/img/i_facebook.png" alt="icono facebook">
		</a>
		<a href=" https://twitter.com/proskapp" :class="redes ? 'aparecer1':null" v-if="redes" target="_blank">
			<img src="@/assets/img/i_twitter.png" alt="icono twitter">
		</a>
		<a href="https://uy.linkedin.com/company/prosk" :class="redes ? 'aparecer2':null" v-if="redes" target="_blank">
			<img src="@/assets/img/i_linkedin.png" alt="icono Linkedin">
		</a>
		<a href="https://www.instagram.com/proskorg/" :class="redes ? 'aparecer3':null" v-if="redes" target="_blank">
			<img src="@/assets/img/i_instagram.png" alt="icono instagram">
		</a>
		<a href="https://www.youtube.com/channel/UCdYGeerRWTPJu5qT8K2r6wQ" :class="redes ? 'aparecer4':null" v-if="redes">
			<img src="@/assets/img/i_youtube.png" alt="icono youtube">
		</a>
	</aside>
</template>
<script>
export default {
	name: 'redesSociales',
	data() {
		return {
			redes:true
		}
	},
	mounted() {
		if (this.ancho>550){
			this.redes= true
		}else{
			this.redes=false
		}
	},
	computed: {
		ancho(){
			return this.$store.state.ancho
		},

	},
}
</script>
<style scoped>
	aside{
		width: 40px;
		height: auto;
		position: fixed;
		top: 150px;
		left: 0;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	aside a{
		text-transform: none;
		margin: 0;
		padding: 0;
		width: 40px;
		height: 40px;
	}
	aside a img{
		width: 40px;
		height: 40px;

	}
	button{
		width: 40px;
		height: 40px;
		border: none;
		outline: none;
		background-color: rgba(153, 153, 153, 0.3);
	}
	button i{
		color: #fff;
	}
	.aparecer{
		animation: izquierda .2s ease;
	}
	.aparecer1{
		animation: izquierda .4s ease;
	}
	.aparecer2{
		animation: izquierda .6s ease;
	}
	.aparecer3{
		animation: izquierda .8s ease;
	}
	.aparecer4{
		animation: izquierda .10s ease;
	}

</style>