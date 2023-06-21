export class Pokemon {
  constructor ({ abilities, height, id, name, sprites, types, weight }) {
    this.name = name;
    this.id = id;
    this.weight = weight;
    this.height = height;
    this.abilities = abilities;
    this.types = types;
    this.urlImage = sprites.other['official-artwork'].front_default;
  }
}
