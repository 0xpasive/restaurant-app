import { IsArray, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderdto {
    @IsNotEmpty({message: 'Table number is required'})
    @IsNumber({allowInfinity: false, allowNaN: false}, {message: 'Table number must be a number'})
    @Min(1, {message: 'Table number must be at least 1'})
    tableNumber: number;


    @IsNotEmpty({message: 'Items IDs are required'})
    @IsArray({message: 'Items IDs must be an array'})
    
    itemsIds: string[];
}