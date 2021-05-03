import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flujo } from '../domain/flujo';
import { FlujoRepoDTO } from '../interfaces/flujo.repo';
import { FlujoMapper } from '../mapper/flujo';
import { FlujoDocument } from './flujo.schema';

@Injectable()
export class FlujoRepo {
  constructor(
    @InjectModel('Flujo') private flujoModel: Model<FlujoDocument>,
    private flujoMapper: FlujoMapper,
  ) {}

  async exist(_id: string): Promise<boolean> {
    return this.flujoModel.exists({ _id });
  }

  async save(domain: Flujo): Promise<void> {
    const mapped = this.flujoMapper.toRepo(domain);
    await this.flujoModel
      .findByIdAndUpdate(domain.id, mapped, { upsert: true })
      .exec();
    return;
  }

  async delete(_id: string): Promise<void> {
    this.flujoModel.findOneAndDelete({ _id });
    return;
  }

  async findById(id: string): Promise<Flujo | null> {
    const exist = await this.flujoModel.findById(id).exec();
    return exist ? this.flujoMapper.toDomain(exist as FlujoRepoDTO) : null;
  }
}
