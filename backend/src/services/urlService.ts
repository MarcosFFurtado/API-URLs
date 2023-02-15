import urlModel from '../models/urlModel';
import IUrl from '../Interfaces/IUrl';
import Url from '../Domain/url';

class urlService {
  // private service: urlModel

  // constructor () {
  //   this.service = new urlModel();
  // }

  private createUrlDomain(url: IUrl | null): Url | null {
    if (url) {
      return new Url(
        url.description,
        url.url,
        url.id as string,
        url.userId as string
      );
    }
    return null;
  }

  public async addUrl(url: IUrl): Promise<any> {
    const urlMd = new urlModel();
    const newUrl = await urlMd.addUrl(url);
    return this.createUrlDomain(newUrl);
  }

  public async findAll(id: string): Promise<IUrl[]> {
    const urlMd = new urlModel();
    const newUrl = await urlMd.findAll(id);
    return newUrl;
  }

  public async findOne(urlAdress: string, id: string): Promise<IUrl | null> {
    const urlMd = new urlModel();
    const newUrl = await urlMd.findOne(urlAdress, id);
    return newUrl;
  }

  public async update(url: IUrl, id: string): Promise<IUrl> {
    const urlMd = new urlModel();
    const newUrl = await urlMd.update(url, id);
    return newUrl;
  }

  public async delete(urlAdress: string, id: string): Promise<IUrl | null> {
    const urlMd = new urlModel();
    const newUrl = await urlMd.delete(urlAdress, id);
    return newUrl;
  }
}

export default urlService;
