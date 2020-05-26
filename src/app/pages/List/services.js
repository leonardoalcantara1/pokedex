import { get } from 'axios';

export const getPokemons = async (url = 'https://pokeapi.co/api/v2/pokemon') => {
  const data = await get(url);
  return data.data;
}