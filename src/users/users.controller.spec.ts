import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UserAuthDto } from './dto/login.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: {
            registerUser: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    it('should call userService.registerUser with correct parameters', async () => {
      const userAuthDto: UserAuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = {
        id: 1,
        email: userAuthDto.email,
        uuid: 'some-uuid',
        password: 'hashed-password',
      };

      jest.spyOn(userService, 'registerUser').mockResolvedValue(result);

      expect(await controller.registerUser(userAuthDto)).toBe(result);
      expect(userService.registerUser).toHaveBeenCalledWith(
        userAuthDto.email,
        userAuthDto.password,
      );
    });
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const userAuthDto: UserAuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = {
        user: {
          id: 1,
          email: 'test@example.com',
          uuid: 'some-uuid',
          password: 'hashed-password',
        },
        token: 'some-access-token',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await controller.login(userAuthDto)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(
        userAuthDto.email,
        userAuthDto.password,
      );
    });
  });
});
