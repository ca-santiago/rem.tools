import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateFlujoDTO,
  PutFaceidDTO,
  PutPersonalDataDTO,
  PutSignatureDTO,
} from '../services/dto';
import { FlujoService } from '../services/flujo';
import * as path from 'path';
import { Request, Response } from 'express';
import createLocaltionHeaderString from '../helpers/createLocation';

@Controller('flujos')
export class FlujoController {
  constructor(private flujoService: FlujoService) {}

  @Post()
  async create(
    @Body() dto: CreateFlujoDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const servicePayload = await this.flujoService.createFlujo(dto);
    const resourceLocaltion = createLocaltionHeaderString(
      req,
      servicePayload.id,
      process.env.PORT,
    );
    res.location(resourceLocaltion);
    res.status(201).json(servicePayload).end();
  }

  @Get(':id')
  async getById(@Param('id') id) {
    const result = await this.flujoService.findById(id);
    return result;
  }

  @Put(':id/steps/faceid')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { files: 1 },
      fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if (ext !== '.mp4')
          return callback(
            new BadRequestException('Only mp4 files are allowed'),
            false,
          );

        callback(null, true);
      },
    }),
  )
  async putFaceid(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id,
    @Body() dto: PutFaceidDTO,
  ) {
    await this.flujoService.putFaceId({
      ...dto,
      file: file.buffer,
      flujoId: id,
    });
    return;
  }

  @Put(':id/steps/signature')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { files: 1 },
      fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.png')
          return callback(
            new BadRequestException('Only jpg and png files are allowed'),
            false,
          );

        callback(null, true);
      },
    }),
  )
  async putSignature(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id,
    @Body() dto: PutSignatureDTO,
  ) {
    const splitName = file.originalname.split('.');
    const extension = splitName[splitName.length - 1];

    await this.flujoService.putSignature({
      ...dto,
      extension,
      file: file.buffer,
      flujoId: id,
    });
    return;
  }

  @Put(':id/steps/info')
  async putPersonalDate(@Body() dto: PutPersonalDataDTO, @Param('id') id) {
    await this.flujoService.putPersonalData({ ...dto, flujoId: id });
    return;
  }
}
