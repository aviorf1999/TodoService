import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ default: false })
  done: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
