import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { SignupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/Login.dto';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

    async signup(signupDto: SignupDto) {
    try {
     
      const { email, password, name } = signupDto;

      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new UnauthorizedException('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ email, name, password: hashedPassword });
      await this.userRepository.save(user);

      return { message: 'Signup successful' };
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException('Signup failed');
      
    }
  }


  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
