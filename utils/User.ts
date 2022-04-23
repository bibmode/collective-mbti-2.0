export class User {
  name: string | null | undefined = "";
  image: string | null | undefined = "";

  constructor(
    name: string | null | undefined,
    image: string | null | undefined
  ) {
    this.name = name;
    this.image = image;
  }

  getName() {
    return this.name;
  }

  getImage() {
    return this.image;
  }
}
