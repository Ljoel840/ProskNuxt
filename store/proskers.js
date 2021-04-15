import extaerProskers from '../middleware/extraerProskers'

export const state = () => ({
	datos:[],
	error: null,
	cargando: true,
	cantidad: 0
})

export const mutations = {
	cargarProskers(state){
		extaerProskers({idEnc: "hXwuDUKromgcZVpNrNDjfQ=="}).then(contenido =>{
			state.proskers.datos = contenido
			state.proskers.cargando = false
			state.proskers.cantidad = contenido.length
			contenido.forEach(e=>{
				var registroDatos = {}
				e.Categories.forEach(e2=>{
					if (e2.SkillFeaturedOrder!=0) {
						registroDatos.idCat = e2.WorkFieldId
						registroDatos.nombreCategoria = e2.WorkFieldName
					}
				})
				if (registroDatos.idCat) {
					registroDatos.nombre = e.nombre
					registroDatos.idEnc = e.idEnc
					registroDatos.foto = e.UserPhotoImageUrl
					state.proskersDestacados.push(registroDatos)
				}
			})
		}).catch(error => {
			state.proskers.error = error
		})
	},


}