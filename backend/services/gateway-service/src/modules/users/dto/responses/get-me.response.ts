import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class GetMeResponse {
	@ApiProperty({
		example: 'sOJ33DzkwRzz9LAXbD-YY'
	})
	public id!: string

	@ApiPropertyOptional({
		example: 'Karen Akobyan'
	})
	public name!: string

	@ApiProperty({
		example: 'karen@gmail.com'
	})
	public email!: string

	@ApiProperty({
		example: '+79531157613'
	})
	public phone!: string

	@ApiPropertyOptional({
		example: 'https://cdnljsd;lfkjs;dlkfj'
	})
	public avatar!: string
}
