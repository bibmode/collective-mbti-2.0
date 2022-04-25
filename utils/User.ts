export class User {
  name: string | null | undefined = "";
  image: string | null | undefined = "";
  userId: string;

  constructor(
    name: string | null | undefined,
    image: string | null | undefined,
    userId: string
  ) {
    this.name = name;
    this.image = image;
    this.userId = userId;
  }

  getName() {
    return this.name;
  }

  getImage() {
    return this.image;
  }

  getId() {
    return this.userId;
  }
}
