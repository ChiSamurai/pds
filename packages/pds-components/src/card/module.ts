import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Card } from './card';
import { CardContent, CardFooter, CardHeader } from './card-content';

const declarations = [CardHeader, CardContent, CardFooter, Card];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class CardModule {}
