import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator";

export class addItemsToOrderDto {
    @IsUUID()
    orderId: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID("4", { each: true })
    itemsIds: string[];
}