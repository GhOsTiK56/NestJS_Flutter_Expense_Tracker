import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class InitEmailChangeRequest {
    @ApiProperty({
        example: 'other@gmail.com'
    }) 
    @IsNotEmpty()
    @IsEmail() 
    public email!: string
}