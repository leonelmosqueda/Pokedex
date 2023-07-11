export class Pokemon {
  /**
   * @param {Number} id - The id of the pokemon.
   * @param {String} name - The name of the pokemon.
   * @param {String} height - The height of the pokemon.
   * @param {String} weight - The weight of the pokemon.
   * @param {String} image - The image URL of the pokemon.
   * @param {Array<String>} types - The types of the pokemon.
   * @param {Array<String>} abilities - The abilities of the pokemon.
   */
  constructor (id, name, height, weight, image, types, abilities) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.image = image;
    this.types = types;
    this.abilities = abilities;
  }
}
