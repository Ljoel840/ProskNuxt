/*
    🔨 Desarrollo
*/ 
const des = {
	apiUrl: "http://localhost:3000/rest/",
	apiContactUrl: "https://testapps.desarrollodesoftwareamedida.com/testdelfawebs/rest/",
    routerMode: false,
    publicPath: "/",
	contactMail: "contactoprosk@gmail.com",
	contactPass: "pdukplxjgzssrhwq",
	backend: false
};

/*
    🔬 Test
*/
const test = {
	apiUrl: "http://169.57.129.247:8080/ProskBackendBackend/rest/",
	apiContactUrl: "https://testapps.desarrollodesoftwareamedida.com/testdelfawebs/rest/",
    routerMode: false,
	publicPath: "/",
	contactMail: "contactoprosk@gmail.com",
	contactPass: "pdukplxjgzssrhwq",
    backend: false
};

/*
    🥕 Backend
*/
const back = {
    apiUrl: "../rest/",
    routerMode: true,
    publicPath: "../static/front/",
    backend: true
};

/*
    🎬 Producción
*/
const prod = {
	// apiUrl: "http://158.85.5.171:8080/proskbackend/rest/",
	// apiContactUrl: "http://158.85.5.171:8080/proskbackend/rest/",
	apiUrl: "https://proskapp.com/proskbackend/rest/",
    apiContactUrl: "https://apps.delfasoft.com/delfawebs/rest/",
    routerMode: false,
	publicPath: "/",
	contactMail: "contactoprosk@gmail.com",
	contactPass: "pdukplxjgzssrhwq",
    backend: false
}

/*
    Versión
*/
process.env.VUE_APP_VERSION = require("../package.json").version;
const webpack = require("webpack")

/*
    Declaración de ambiente
*/
const env = require("../package.json").env
const amb = env === "des"
        ? des
        : env === "test"
        ? test
        : env === "back"
        ? back
        : prod;


module.exports = {
	publicPath: amb.publicPath,
	productionSourceMap: false,
	configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    API_URL: JSON.stringify(amb.apiUrl),
                    API_CONTACT_URL: JSON.stringify(amb.apiContactUrl),
					ROUTER_MODE: amb.routerMode,
					CONTACT_MAIL: JSON.stringify(amb.contactMail),
					CONTACT_PASS: JSON.stringify(amb.contactPass),
                    BACKEND: amb.backend
                }
            })
        ],
    },
  }