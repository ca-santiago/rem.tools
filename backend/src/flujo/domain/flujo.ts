import { IFlujo } from '../interfaces/flujo';

export class Flujo implements IFlujo {
  constructor(
    public id: string,
    public types: string[],
    public createdAt: string,
    public status: string,
  ) {}
}
