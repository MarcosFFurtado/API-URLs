import { Request, Response, NextFunction } from 'express';
import urlService from '../services/urlService';
import IUrl from '../Interfaces/IUrl';
const { validateToken, getIdFromToken } = require('../auth/validateJWT');

class urlController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: urlService;
  private urlAdress: string;
  private token: string | undefined;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new urlService();
    this.urlAdress =  this.req.body.url;
    this.token =  req.header('Authorization');
  }

  public async addUrl() {
    const url: IUrl = {
      description: this.req.body.description,
      url: this.req.body.url,
      id: '',
      userId: '',
    };
    try {
      const id = await getIdFromToken(this.token);
      url.userId = id;
      const existUrl = await this.service.findOne(this.urlAdress, id);
      if(existUrl !== null) return this.res.status(400).json({ message: 'Already in database' });
      const newUrl = await this.service.addUrl(url as IUrl);
      return this.res.status(201).json(newUrl as IUrl);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const id = await getIdFromToken(this.token);
      const urlList = await this.service.findAll(id as string);
      return this.res.status(201).json(urlList);
    } catch (error) {
      this.next(error);
    }
  }

  public async findOne() {
    try {
      const id = await getIdFromToken(this.token);
      if(!this.urlAdress) return this.findAll();
      const urlFound = await this.service.findOne(this.urlAdress, id);
      if(urlFound === null) return this.res.status(400).json({ message: 'Not in database' });
      return this.res.status(201).json(urlFound);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const url: IUrl = {
      description: this.req.body.description,
      url: this.req.body.url,
      id: this.req.body.id,
      userId: '',
    };
    try {
      const id = await getIdFromToken(this.token);
      url.userId = id;
      const urlFound = await this.service.update(url, id);
      if(urlFound === null) return this.res.status(400).json({ message: 'Not in database' });
      return this.res.status(201).json(urlFound as IUrl);
    } catch (error) {
      this.next(this.res.status(400).json({ message: 'Not in database' }));
    }
  }

  public async delete() {
    try {
      const id = await getIdFromToken(this.token);
      console.log(this.urlAdress);
      const urlFound = await this.service.delete(this.urlAdress, id);
      if(urlFound === null) return this.res.status(400).json({ message: 'Not in database' });
      return this.res.status(201).json({'DELETED URL': urlFound});
    } catch (error) {
      this.next(this.res.status(400).json({ message: 'Not in database' }));
    }
  }
}

export default urlController;
