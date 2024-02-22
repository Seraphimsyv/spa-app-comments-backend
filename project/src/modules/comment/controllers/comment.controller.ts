import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import {
  CommentCreateOneDto,
  CommentDeleteManyDto,
  CommentDeleteOneDto,
  CommentGetManyDto,
  CommentUpdateOneDto,
} from 'src/modules/comment/dto/comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../../file/pipes/fileValidation.pipe';

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}
  /**
   *
   * @param id
   * @returns
   */
  @Get('/get/one/:id')
  async getOne(@Param('id') id: number) {
    return await this.service.findOne({ id });
  }
  /**
   *
   * @param query
   * @returns
   */
  @Get('/get/many')
  async getMany(@Query() query: CommentGetManyDto = { page: 1, limit: 25 }) {
    return await this.service.findMany(query.page, query.limit);
  }
  /**
   *
   * @param req
   * @param file
   * @param dto
   * @returns
   */
  @Post('/create/one')
  @UsePipes(FileValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async createOne(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CommentCreateOneDto,
  ) {
    if (req.user) dto.author = req.user;

    return await this.service.createOne(dto, file);
  }
  /**
   *
   * @param dto
   * @returns
   */
  @Put('/update/one')
  async updateOne(@Body() dto: CommentUpdateOneDto) {
    const { query, updateData } = dto;

    return await this.service.updateOne(query, updateData);
  }
  /**
   *
   * @param dto
   * @returns
   */
  @Delete('/delete/one')
  async deleteOne(@Body() dto: CommentDeleteOneDto) {
    const { query } = dto;

    return await this.service.deleteOne(query);
  }
  /**
   *
   * @param dto
   * @returns
   */
  @Delete('/delete/many')
  async deleteMany(@Body() dto: CommentDeleteManyDto) {
    const { query } = dto;

    return await this.service.deleteMany(query);
  }
}
