import axios from 'axios'

export default (valores) => new Promise ((resolve, reject) => {
    axios
    .post(`${process.env.API_URL}dfs90019`,valores)
    .then(response => {
        if (!response.data) {
            reject('datos vacío')
        } else if (!response.data.ErrorSDT) {
            reject('datos de error vacío')
        } else if (response.data.ErrorSDT.ErrorCode > 0) {
            reject(response.data.ErrorSDT.ErrorDescription)
        } else {
            resolve('Mensaje Enviado')
        }
    })
    .catch(error => reject(error) )
})