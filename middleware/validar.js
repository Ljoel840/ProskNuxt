export default (componente) => {
	componente.errorNombre = null
	componente.errorCorreo = null
	componente.errorTelefono = null
	componente.errorMensaje = null
	componente.errors = false
	if (!componente.datos.nombre) {
		componente.errorNombre = 'El Nombre no puede estar vacío'
		componente.errors = true
	}
	if (!componente.datos.correo) {
		componente.errorCorreo = 'El Correo no puede estar vacío'
		componente.errors = true
	}else if (!validEmail(componente.datos.correo)){
		componente.errorCorreo = 'Correo Inválido'
		componente.errors = true
	}
	if (!componente.datos.telefono) {
		componente.errorTelefono = 'El Teléfono no puede estar vacío'
		componente.errors = true
	}else if (!validTelefono(componente.datos.telefono)){
		componente.errorTelefono = 'Teléfono Inválido'
		componente.errors = true
	}
	if (!componente.datos.mensaje) {
		componente.errorMensaje = 'Agruegue un Mensaje'
		componente.errors = true
	}

	
	function validEmail (email) {
	var re = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	return re.test(email);
	}
	function validTelefono (phone) {
	var re = /^([0-9]+){8}$/;
	return re.test(phone);
	}
	
}