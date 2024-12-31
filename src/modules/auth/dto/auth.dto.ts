import { ApiProperty } from '@nestjs/swagger'

import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({ description: '手机号/邮箱', required: false })
  @IsString()
  @MinLength(4)
  username: string

  
  @ApiProperty({ description: '密码', example: 'a123456', required: false })
  @IsString()
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, { message: '密码必须包含字母和数字,长度至少6位' })
  @MinLength(6)
  password?: string

  @ApiProperty({ description: '登录方式,PASSWORD:密码登录,CAPTCHA:验证码登录,WX_H5:微信H5登录,WX_APP:微信小程序登录', example: 'PASSWORD' })
  @IsString()
  loginType: string

  @ApiProperty({ description: '微信小程序code', required: false })
  @IsString()
  code?: string

  // @ApiProperty({ description: '验证码标识' })
  // @IsString()
  // captchaId: string

  // @ApiProperty({ description: '用户输入的验证码' })
  // @IsString()
  // @MinLength(4)
  // @MaxLength(4)
  // verifyCode: string
}

export class RegisterDto {
  @ApiProperty({ description: '账号' })
  @IsString()
  username: string

  @ApiProperty({ description: '密码' })
  @IsString()
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/)
  @MinLength(6)
  @MaxLength(16)
  password: string

  @ApiProperty({ description: '语言', examples: ['EN', 'ZH'] })
  @IsString()
  lang: string
}
