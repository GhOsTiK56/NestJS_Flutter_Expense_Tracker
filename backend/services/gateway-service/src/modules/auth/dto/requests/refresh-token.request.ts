import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator'

export class RefreshTokenRequest {
    @ApiProperty({
        example: 'token'
    })
    @IsNotEmpty()
	@IsString()
	public refreshToken!: string
}
