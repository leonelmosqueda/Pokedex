export class PokemonList {
  /**
   * @param {Number} total - The total number of pokemon in the pokedex.
   * @param {String | null} next - The URL for the next page of results.  Can be null.
   * @param {String | null} previous - The URL for the previous page of results. Can be null.
   * @param {Array<String>} results - The array of results
   */
  constructor (total, next, previous, results) {
    this.total = total;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}
