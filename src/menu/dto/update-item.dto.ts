import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
export class UpdateItemDto {
    @IsOptional()
    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name must be a string'})
    @MaxLength(50, {message: 'Name is too long. Maximum length is 50 characters'})
    name?: string;
    
    @IsOptional()
    @IsNotEmpty({message: 'Price is required'})
    @IsNumber({allowNaN: false, allowInfinity: false}, {message: 'Price must be a number'})
    @Min(0, {message: 'Price must be a positive number'})
    price?: number;
    


}