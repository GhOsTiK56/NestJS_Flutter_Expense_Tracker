import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class LogoutRequest {
    
    @ApiProperty({
        example: 'Refresh token'
    })
    @IsString() 
    public refreshToken!: string
}