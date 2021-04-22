import axios from 'axios'

export default (entrada) =>new Promise ((resolve, reject) => {
    axios
    .post(`${process.env.API_URL}dfs30000fd`,entrada)
    .then(response => {
        if (!response.data) {
            reject('No hay retorno de login')
        } else if (!response.data.ErrorSDT) {
            reject('No hay retorno del ErrorSDT')
        } else if (response.data.ErrorSDT.ErrorCode === 0) {
			// publicaciones = response.data.frontProsker
			// finEnc = response.data.finEnc
			resolve(response.data.frontListGeneral.categoria)

        } else {
            reject(response.data.ErrorSDT.ErrorDescription)
        }

    })
    .catch(error => reject(error))
})