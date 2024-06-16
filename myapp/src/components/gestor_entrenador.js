export default {
  template: `
 <div class="entrenadores-container">
  <h1 class="titulo-entrenadores">¡Entrenadores Pokémon!</h1>
  <div class="lista-entrenadores">
    <ul v-if="hayEntrenadores">
      <li v-for="entrenador in listaEntrenadores" :key="entrenador.id" class="entrenador-item">
        <i class="icono-pokemon"></i>
        <span class="nombre-entrenador">{{ entrenador.nombre }}</span>
        <button @click="mostrarPokemon(entrenador.id)" class="btn-ver-pokemon">Ver Pokémon</button>
        <button @click="toggleSeleccion(entrenador.id)" class="btn-seleccionar" v-if="!entrenadorSeleccionado(entrenador.id)">Seleccionar</button>
        <button @click="toggleSeleccion(entrenador.id)" class="btn-cancelar" v-else>Cancelar</button>
        <ul v-if="entrenadorActivo(entrenador.id)" class="lista-pokemon">
          <li v-for="pokemon in entrenador.pokemones" :key="pokemon.nombre" :class="['pokemon-item', pokemon.tipo]">
            <img :src="pokemon.foto" :alt="pokemon.nombre" class="foto-pokemon" width="100px">
            <span class="nombre-pokemon">Nombre: {{ pokemon.nombre }}</span>
            <span class="tipo-pokemon">Tipo: {{ pokemon.tipo }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <p v-else class="sin-entrenadores">
      ¡No hay entrenadores Pokémon registrados!
    </p>
    <center>
      <button @click="iniciarCombate" :disabled="entrenadoresSeleccionados.length !== 2" class="btn-combate">¡Iniciar Combate!</button>
    </center>
  </div>
</div>
  `,
  props: {
      listaEntrenadores: {
          type: Array,
          required: true
      },
      hayEntrenadores: {
          type: Boolean,
          required: true
      }
  },
  data() {
      return {
          entrenadoresActivos: [],
          entrenadoresSeleccionados: []
      };
  },
  methods: {
      mostrarPokemon(id) {
          if (this.entrenadorActivo(id)) {
              this.entrenadoresActivos = this.entrenadoresActivos.filter(e => e !== id);
          } else {
              this.entrenadoresActivos.push(id);
          }
      },
      toggleSeleccion(id) {
          if (!this.entrenadorSeleccionado(id)) {
            if (this.entrenadoresSeleccionados.length < 2) {
              const entrenador = this.listaEntrenadores.find(e => e.id === id);
              alert(`¡Entrenador ${entrenador.nombre} seleccionado!`);
              this.entrenadoresSeleccionados.push(id);
            } else {
              alert('Ya has seleccionado 2 entrenadores para el combate.');
            }
          } else {
            this.entrenadoresSeleccionados = this.entrenadoresSeleccionados.filter(e => e !== id);
          }
        },
      entrenadorSeleccionado(id) {
          return this.entrenadoresSeleccionados.includes(id);
      },
      entrenadorActivo(id) {
          return this.entrenadoresActivos.includes(id);
      },
      iniciarCombate() {
          if (this.entrenadoresSeleccionados.length === 2) {
              const entrenador1 = this.listaEntrenadores.find(e => e.id === this.entrenadoresSeleccionados[0]);
              const entrenador2 = this.listaEntrenadores.find(e => e.id === this.entrenadoresSeleccionados[1]);
              alert(`¡Combate! ${entrenador1.nombre} vs ${entrenador2.nombre}`);
          } else {
              alert('Debes seleccionar exactamente 2 entrenadores para iniciar el combate.');
          }
      }
  },
  name: 'Entrenador',
};
