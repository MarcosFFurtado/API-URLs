class Url {
  private description: string;
  private url: string;
  private id: string | undefined;
  private userId: string | undefined;

  constructor(
    description: string,
    url: string,
    id: string | undefined,
    userId: string | undefined,
  ) {
    this.description = description;
    this.url = url;
    this.id = id;
    this.userId = userId;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getDescription() {
    return this.description;
  }

  public setUrl(url: string) {
    this.url = url;
  }

  public getUrl() {
    return this.url;
  }

  public setUserId(userId: string | undefined) {
    this.userId = userId;
  }

  public getUserId() {
    return this.userId;
  }

}

export default Url;