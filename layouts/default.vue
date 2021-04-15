<template>
	<div>
		<menupc />
		<Nuxt />
		<p_footer />
	</div>
</template>
<script>
import p_footer from "../components/p_footer";
import menupc from "../components/menupc";
export default {
	components: {
		p_footer,
		menupc,
		// spinnerCircular: () => import('@/components/spinnerCircular'),
	},
	created() {
		// this.$store.commit('cargarCategoriasBlog')
		// this.$store.commit('cargarTagsBlog')
		// this.$store.commit("cargarBlog");
		this.almacenamientoLocal()
	},
	methods: {
		almacenamientoLocal(){
			if(process.browser){
			  this.$store.dispatch('usuario/local')
		  }

		}
	},
};
</script>

