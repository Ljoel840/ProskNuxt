import axios from 'axios'

export default (entrada) =>new Promise ((resolve, reject) => {
    axios
    .post(`${process.env.API_URL}dfs90015`, entrada)
    .then(response => {
        if (!response.data) {
            reject('No hay retorno de login')
        } else if (!response.data.ErrorSDT) {
            reject('No hay retorno del ErrorSDT')
        } else if (response.data.ErrorSDT.ErrorCode === 0) {
           resolve(response.data.FrontBlogTag)

        } else {
            reject(response.data.ErrorSDT.ErrorDescription)
        }
    })
    .catch(error => reject(error))
})