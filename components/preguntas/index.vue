<template>
	<section>
		<pregunta v-for="(p,index) in datos" :key="index" :p='p' />
	</section>
</template>
<script>
export default {
	name: "preguntas",
	components:{
		pregunta: () => import('./pregunta'),
	},
	props:{
		datos:{
			value:Array
		}
	},
};
</script>
<style scoped>
	section{
		margin: 10px auto;
		width: 60%;
	}
	@media (max-width:600px) {
		section{
			width: 100%;
		}
	}
</style>