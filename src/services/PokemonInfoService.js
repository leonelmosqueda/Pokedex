export class PokemonInfoService {
  constructor (pokemonApi, localStorageService) {
    this.api = pokemonApi;
    this.localStorage = localStorageService;
  }

  async getAll (id) {
    if (id === undefined) {
      throw new Error('An id is needed to fetch a pokemon');
    }

    try {
      return this.localStorage.getPokemonInfo(id);
    } catch (error) {
      const pokemonInfo = await this.api.getPokemonInfo(id);
      this.localStorage.cachePokemonInfo(id, pokemonInfo);
      return pokemonInfo;
    }
  }
}
