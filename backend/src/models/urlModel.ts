import { Schema, model, Model, models } from 'mongoose';
import IUrl from '../Interfaces/IUrl';

class urlModel {
  private schema: Schema;
  private model: Model<IUrl>;

  constructor() {
    this.schema = new Schema<IUrl>({
      description: { type: String, required: true, max: 150 },
      url: { type: String, required: true, max: 100 },
      userId: { type: String, required: true,  max: 100},
    },{ versionKey: false });
    this.model = models.Url || model('Url', this.schema);
  }

  public async addUrl(url: IUrl): Promise<IUrl> {
    return this.model.create({ ...url });
  }

  public async findAll(id: string): Promise<IUrl[]> {
    return this.model.find({userId: {$eq: id}});
  }

  public async findOne(urlAdress: string, id: string): Promise<IUrl | null> {
    return this.model.findOne({$and: [{url: {$eq: urlAdress}}, {userId: {$eq: id}}]});
  }

  public async update(url: IUrl, id: string): Promise<any> { 
    return this.model.findOneAndUpdate({$and: [{_id: {$eq: url.id}}, {userId: {$eq: id}}]}, { description: url.description, url: url.url }, {new: true});
  }

  public async delete(urlAdress: string, id: string): Promise<IUrl | null> {
    console.log(urlAdress, id);
    return this.model.findOneAndDelete({$and: [{url: {$eq: urlAdress}},  {userId: {$eq: id}}]});
  }
}

export default urlModel;

