class ServiciosAPI {
    obtenerDatos(callback) {
        const urlAPI = 'app/json/datos_entrenadores.json';        
        fetch(urlAPI)
            .then(response => response.json())
            .then(data => {
                callback(null, data);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });        
    }
}

export default ServiciosAPI;
