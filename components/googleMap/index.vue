<template>
	<aside>
		<button @click="$emit('cerrar')"><i class="material-icons" >close</i></button>
		<div class="contenedorMapa">
			<gmap-map
				:center="center"
				:zoom="16"
				style="width: 100%; height: 500px"
			>
				<gmap-marker
					:key="index2"
					v-for="(m2, index2) in marcadores"
					:position="m2.posicion"
					:title="m2.titulo"
					:clickable="true"
					:draggable="true"
					@click="center=m2.posicion"
					></gmap-marker>
				<gmap-marker
					v-if="marker"
					label="★"
					:position="marker.position"
					:clickable="true"
					:draggable="true"
					:title="marker.title"
					/>
			</gmap-map>
		</div>
	</aside>
</template>
<script>
export default {
	name:'googleMap',
	props: {
		latitude: {
			type:Number,
			default: -34.826923
		},
		longitude: {
			type:Number,
			default: -56.200394
		},
		title:{
			type:String,
			default: 'YO'
		},
		marcadores:{
			type: Array
		}
	},
	data () {
		return {
			center: {lat: this.latitude, lng: this.longitude},
			markers: [
				{
					position: {lat: this.latitude, lng: this.longitude},
					title: this.title
				},
			],
			posicion:null,
			obtenerPosicion: false,
			error:null,
			option: null,
			marker: {
				position: {lat: this.latitude, lng: this.longitude},
				title: this.title
			},
			position: {
				lat: null,
				lng: null
			},
		}
	},

	methods: {
		movePlace: function(event) {
            this.position = {
                lat: event.lat(),
                lng: event.lng(),
            }
        },
	},

  
}
</script>
<style scoped>
	aside{
		position: absolute;
		width: 100%;
		height: 10vh;
		z-index: 100;
		/* background-color:red; */
		display: flex;
	}
	h1{
		color: rgb(175, 164, 164);
	}
	.contenedorMapa{
		width: 80%;
		height: auto;
		min-height:400px;
		background-color: #fff;
		margin: auto;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		/* margin-top: 50%; */
	}

	button{
		position: fixed;
		top: 10px;
		right: 10px;
		background-color: transparent;
		border: none;
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		outline: none;
		cursor: pointer;
	}
	button i{
		color: #fff;
		font-size: 3em;
	}

	
</style>