import axios from 'axios'

export default (context, valores) => new Promise ((resolve, reject) => {
    axios
    .post(`${process.env.API_URL}dfs50003`,valores)
    .then(response => {
        if (!response.data) {
            reject('datos vacío')
        } else if (!response.data.ErrorSDT) {
            reject('datos de error vacío')
        } else if (response.data.ErrorSDT.ErrorCode > 0) {
            // if (response.data.ErrorSDT.ErrorCode === 4) {
            //     reject('El email ya existe')
            // }
            // if (response.data.ErrorSDT.ErrorCode === 7) {
            //     reject('El documento ya está registrado')
            // }
            reject(response.data.ErrorSDT.ErrorDescription)
        } else {
            context.commit('actualizar', response.data.frontUser)
            resolve('Gracias por registrarse')
        }
    })
    .catch(error => reject(error) )
})