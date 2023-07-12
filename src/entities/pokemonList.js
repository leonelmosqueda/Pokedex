export class PokemonList {
  /**
   * @param {Number} total - The total number of pokemon in the pokedex.
   * @param {Array<String>} results - The array of results
   */
  constructor (total, results) {
    this.total = total;
    this.results = results;
  }
}
