const production = false;

const deployedUrl = "https://vuclasssearch.herokuapp.com/"

export function addBaseUrlClient(extension){
    const base = production ? deployedUrl : "http://localhost:8080/"
    return base + extension
}