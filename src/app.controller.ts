import {
  Body,
  Controller,
  Get,
  Render,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';

import TarhelyDataDto from './tarhelydata.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/tarhely')
  async allTarhely() {
    const[tarhely] = await db.execute(
      'SELECT id, nev, meret, ar FROM tarhelycsomagok'
    );
    return { tarhely: tarhely};
  }

  @Post('/api/tarhely')
  async newTarhelyApi(@Body() tarhelydata : TarhelyDataDto ) {
    await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?, ?)', [
      tarhelydata.nev,
      tarhelydata.meret,
      tarhelydata.ar,
    ]);
  }

  @Delete('/api/tarhely/:id')
  async deletTarhelyApi(@Param('id') id: number) {
    await db.execute('DELETE FROM tarhelycsomagok WHERE id = ?', 
    [id]
    );
  }

}
