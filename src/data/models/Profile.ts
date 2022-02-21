export class Profile {
  id: string;

  name: string;

  email: string;

  picture: string;

  constructor(id: string, name: string, email: string, picture: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.picture = picture;
  }
}
