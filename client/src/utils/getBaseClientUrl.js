const production = false;

const deployedUrl = "https://vuclasssearch.herokuapp.com/api/"

export function addBaseUrlClient(extension){
    const base = production ? deployedUrl : "http://localhost:8080/api/"
    return base + extension
}