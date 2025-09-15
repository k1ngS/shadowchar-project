import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { TalentsService } from "./talents.service";
import { CreateTalentDto } from "./dto/create-talent.dto";
import { UpdateTalentDto } from "./dto/update-talent.dto";

@ApiTags('talents')
@UseGuards(AuthGuard('jwt'))
@Controller('characters/:characterId/talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @Post()
  create(
    @Param('characterId') characterId: string,
    @Request() req,
    @Body() createTalentDto: CreateTalentDto,
  ) {
    const userId = req.user.userId;
    return this.talentsService.create(createTalentDto, +characterId, userId);
  }

  @Get()
  findAll(@Param('characterId') characterId: string, @Request() req) {
    const userId = req.user.userId;
    return this.talentsService.findAll(+characterId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalentDto: UpdateTalentDto) {
    return this.talentsService.update(+id, updateTalentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talentsService.remove(+id);
  }
}
