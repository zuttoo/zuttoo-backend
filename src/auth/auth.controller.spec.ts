import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createUser: jest.fn(),
            authenticateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call createUser method of AuthService', async () => {
      const createUserDto = { email: 'prajnaprayas1@gmail.com', password: 'Prajna@1234' };

      await controller.signup(createUserDto);

      expect(authService.createUser).toHaveBeenCalledWith(createUserDto.email, createUserDto.password);
    });
  });

  describe('login', () => {
    it('should call authenticateUser method of AuthService', async () => {
      const loginUserDto = { email: 'prajnaprayas1@gmail.com', password: 'Prajna@1234' };

      await controller.login(loginUserDto);

      expect(authService.authenticateUser).toHaveBeenCalledWith(loginUserDto.email, loginUserDto.password);
    });
  });
});
