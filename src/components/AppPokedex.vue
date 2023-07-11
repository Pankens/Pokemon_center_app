<script setup lang="ts">

// --- imports ---

import { pkmns } from '@/data/pkmn.js';
import { ref, onMounted } from 'vue';
import acero from '@/assets/acero.svg';
import agua from '@/assets/agua.svg';
import bicho from '@/assets/bicho.svg';
import dragon from '@/assets/dragón.svg';
import electrico from '@/assets/eléctrico.svg';
import fantasma from '@/assets/fantasma.svg';
import fuego from '@/assets/fuego.svg';
import hada from '@/assets/hada.svg';
import hielo from '@/assets/hielo.svg';
import lucha from '@/assets/lucha.svg';
import normal from '@/assets/normal.svg';
import planta from '@/assets/planta.svg';
import psiquico from '@/assets/psíquico.svg';
import roca from '@/assets/roca.svg';
import siniestro from '@/assets/siniestro.svg';
import tierra from '@/assets/tierra.svg';
import veneno from '@/assets/veneno.svg';
import volador from '@/assets/volador.svg';

// --- interfaces ---

interface TypeImages {
  [key: string]: string;
}

interface Variacion {
  front: string;
  back: string;
}

interface Variaciones {
  [key: string]: Variacion;
}

interface Caracteristicas {
  ps: number;
  ataque: number;
  defensa: number;
  ataque_especial: number;
  defensa_especial: number;
  velocidad: number;
  total: number;
}

interface Genero {
  macho?: string;
  hembra?: string;
}

type GeneroTipo = Genero | 'sin sexo';

interface Pokemon {
  numero_pokedex: number;
  nombre: string;
  generacion: number;
  tipo_1: string;
  tipo_2: string;
  peso: string;
  altura: string;
  genero: GeneroTipo;
  grito: string;
  biologia: string;
  caracteristicas: Caracteristicas;
  tier: number;
  imagen: string;
  variaciones: Variaciones;
}

// --- variables ---

const pokemonList = ref<Pokemon[]>([]);
const pokemonData = ref<Pokemon[]>([]);
const filtering = ref("none");
const isShinyActive = ref(false);
const isMegaActive = ref(false);

const typeImages : TypeImages = {
  acero,
  agua,
  bicho,
  dragon,
  electrico,
  fantasma,
  fuego,
  hada,
  hielo,
  lucha,
  normal,
  planta,
  psiquico,
  roca,
  siniestro,
  tierra,
  veneno,
  volador,
};

// --- métodos ---

pkmns().then((result: Pokemon[]) => {
  pokemonData.value = result;
  pokemonList.value = pokemonData.value;
})

const firstVariationImage = (pkmn: Pokemon) => {
  if (isShinyActive.value) {
    if (isMegaActive.value) {
      const shinyMegaKey = Object.keys(pkmn.variaciones).find((key) => key.startsWith("Mega-") && key.endsWith("variocolor"));
      return shinyMegaKey ? pkmn.variaciones[shinyMegaKey]?.front : null;
    } else {
      const shinyKey = Object.keys(pkmn.variaciones).find((key) => key.includes("variocolor"));
      return shinyKey ? pkmn.variaciones[shinyKey]?.front : null;
    }
  } else {
    if (isMegaActive.value) {
      const megaKey = Object.keys(pkmn.variaciones).find((key) => key.startsWith("Mega-"));
      return megaKey ? pkmn.variaciones[megaKey]?.front : null;
    } else {
      const firstKey = Object.keys(pkmn.variaciones)[0];
      return pkmn.variaciones[firstKey]?.front;
    }
  }
};

const toggleShiny = () => {
  isShinyActive.value = !isShinyActive.value;
};

const toggleMega = () => {
  isMegaActive.value = !isMegaActive.value;
  if (isMegaActive.value) {
    filtering.value = "mega";
    pokemonList.value = pokemonData.value.filter((pkmn: Pokemon) => Object.keys(pkmn.variaciones).some((key) => key.startsWith("Mega-")));
  } else {
    filtering.value = "none";
    pokemonList.value = pokemonData.value;
  }
};

const tierFilter = (tier: number) => {

  if (filtering.value == ("tier_" + tier)) {
    filtering.value = "none";
    pokemonList.value = pokemonData.value;
    return;
  } else {
    filtering.value = "tier_" + tier;
    pokemonList.value = pokemonData.value.filter((pkmn: Pokemon) => pkmn.tier === tier);
  }

};

</script>

<template>
  <main class="pokedex-main-container">

    <section class="filter">
        <div class="dropdown">
          <div class="dropdown-button">
            <img src="@/assets/flecha_selector.svg" alt="^"/>   
          </div>
          <div class="dropdown-content">
            <button @click="toggleMega()" class="filter-option">
              <img src="@/assets/mega.svg" alt="Mega"/>
            </button>
            <button @click="toggleShiny()" class="filter-option">
              <img src="@/assets/variocolor.svg" alt="Shiny"/>
            </button>
            <button @click="tierFilter(5)" class="filter-option">
              <img src="@/assets/tier_5.svg" alt="T5"/>
            </button>
            <button @click="tierFilter(4)" class="filter-option">
              <img src="@/assets/tier_4.svg" alt="T4"/>
            </button>
            <button @click="tierFilter(3)" class="filter-option">
              <img src="@/assets/tier_3.svg" alt="T3"/>
            </button>
            <button @click="tierFilter(2)" class="filter-option">
              <img src="@/assets/tier_2.svg" alt="T2"/>
            </button>
            <button @click="tierFilter(1)" class="filter-option">
              <img src="@/assets/tier_1.svg" alt="T1"/>
            </button>
          </div>
        </div>
    </section>

    <template v-for="pkmn in pokemonList" :key="pkmn.numero_pokedex">
      <div class="pokemon-card" v-if="firstVariationImage(pkmn)">
        <span class="pokedex-number">
          {{ '#' + pkmn.numero_pokedex.toString().padStart(4, '0') }}
        </span>
        <img :src="firstVariationImage(pkmn)" alt="Imagen frontal" />
        <section class="bottom-container">
          <section class="name-container">
            <span class="pokedex-name"> {{ pkmn.nombre }} </span>
            <section class="type-section">
              <img class="type-icon" :src="typeImages[pkmn.tipo_1]" alt="Tipo 1" />
              <img v-if="pkmn.tipo_2" class="type-icon" :src="typeImages[pkmn.tipo_2]" alt="Tipo 2" />
            </section>
          </section>
        </section>
      </div>
    </template>

  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit&display=swap');

.pokedex-main-container {
  position: relative;
  width: 100%;
  height: 93vh;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  padding: 3rem 0rem;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  gap: 3rem 5rem;
  align-self: stretch;
  flex-wrap: wrap;
  background: #fcfcfc;
  overflow: auto;
}

.pokemon-card {
  display: flex;
  width: 13rem;
  height: 17rem;
  padding: 0.625rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.pokedex-number {
  color: rgba(0, 0, 0, 0.25);
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.04rem;
}

.bottom-container {
  width: 13rem;
  height: 2.5625rem;
  flex-shrink: 0;
}

.name-container {
  position: relative;
  display: flex;
  width: 13rem;
  height: 1.3125rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.pokedex-name {
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 0.8125rem;
  letter-spacing: 0.03rem;
}

.type-section {
  position: absolute;
  width: 5rem;
  display: flex;
  gap: 1rem;
  bottom: -45px;
  justify-content: center;
}

.type-icon {
  width: 2rem;
  height: 2rem;
}

/* DROPDOWN */

.filter {
  position: fixed;
  bottom: 2rem;
  left: 1.75rem;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  margin-top: 1rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  bottom: 100%;
  z-index: 1;
}

.filter-option {
  opacity: 75%;
  width: 48px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.filter-option:hover {
  opacity: 100%;
}

.dropdown:hover .dropdown-content {
  background: #fff;
  padding: 1rem 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  gap: 1rem;
}

</style>
