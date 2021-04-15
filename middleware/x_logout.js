/*
    Logout
*/
import axios from 'axios'

export default async (context) => {
    context.commit('actualizar', {
        ok: false,
        nombre: null,
        idEnc: null,
        vsEnc: null,
        key: null,
        admin: false,
		asociados: [],
    })

    if (navigator.onLine) {
        await axios
        .post(`${process.env.API_URL}dfs50002`,{
            frontUser: {
                ok: context.state.ok,
                nombre: context.state.nombre,
                idEnc: context.state.idEnc,
                vsEnc: context.state.vsEnc,
                key: context.state.key,
                instructor: context.state.instructor,
                admin: context.state.admin
            }
        })
    }
}