import GestorEntrenador from "./components/gestor_entrenador.js";
import ServiciosAPI from "./services/servicios_api.js";

var app = new Vue({
    el: '#app',
    data: {
        hayEntrenadores: true,
        listaEntrenadores: [],
        seleccionando: false
    },
    components: {
        GestorEntrenador
    },
    methods: {
        iniciarMensaje: function () {
            console.log("¡Bienvenido a la gestión de entrenadores Pokémon!");
        },
        async obtenerDatos() {
            const servicioAPI = new ServiciosAPI();
            servicioAPI.obtenerDatos((error, response) => {
                if (error) {
                    console.error('Error al obtener datos:', error);
                } else {
                    this.listaEntrenadores = response;
                    this.hayEntrenadores = (this.listaEntrenadores.length > 0) ? true : false;
                }
            });

        },
    },
    mounted() {
        this.obtenerDatos();
        this.iniciarMensaje();
    },
    template: `
    <div>
        <GestorEntrenador :listaEntrenadores="listaEntrenadores" :hayEntrenadores="hayEntrenadores" />
    </div>
    `
});
