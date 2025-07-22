import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty({ message: "Email Should Not Be Empty" })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty({ message: "Password Should Not Be Empty" })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "Name Should Not Be Empty" })
  name: string;
}
