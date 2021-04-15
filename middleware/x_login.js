/*
    Login
*/

import axios from 'axios'

export default (context, entrada) => new Promise ((resolve, reject) => {
    if (navigator.onLine) {
		axios
        .post(`${process.env.API_URL}dfs30001`, entrada)
        .then(response => {
			if (!response.data) {
				reject('No hay retorno de login')
            } else if (!response.data.ErrorSDT) {
				reject('No hay retorno del ErrorSDT')
            } else if (response.data.ErrorSDT.ErrorCode === 0) {
				// console.log(response.data.frontUser)
                context.commit('actualizar', response.data.frontUser)
                resolve()
            } else {
                reject(response.data.ErrorSDT.ErrorDescription)
            }
        })
        .catch(error => reject(error))
    } else {
        reject('Sin conexión a internet')
    }
})