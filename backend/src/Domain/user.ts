class User {
  private id: string | undefined;
  private email: string;
  private password: string;

  constructor(
    id: string | undefined,
    password: string,
    email: string,
  ) {
    this.email = email;
    this.password = password;
    this.id = id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setemail(email: string) {
    this.email = email;
  }

  public getemail() {
    return this.email;
  }

  public setpassword(password: string) {
    this.password = password;
  }

  public getpassword() {
    return this.password;
  }

}

export default User;