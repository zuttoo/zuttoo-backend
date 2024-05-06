import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

// Create a mock implementation of CognitoIdentityProviderClient
const mockCognitoClient = {
  send: jest.fn().mockResolvedValue({}),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // Provide the mock CognitoIdentityProviderClient
        {
          provide: CognitoIdentityProviderClient,
          useValue: mockCognitoClient,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should call AdminCreateUserCommand and AdminConfirmSignUpCommand', async () => {
      const email = 'test@example.com';
      const password = 'testpassword';

      await service.createUser(email, password);

      expect(mockCognitoClient.send).toHaveBeenCalledTimes(2);
      expect(mockCognitoClient.send).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('authenticateUser', () => {
    it('should call AdminInitiateAuthCommand', async () => {
      const email = 'test@example.com';
      const password = 'testpassword';

      await service.authenticateUser(email, password);

      expect(mockCognitoClient.send).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('confirmUserSignup', () => {
    it('should call AdminConfirmSignUpCommand', async () => {
      const email = 'test@example.com';

      await service.confirmUserSignup(email);

      expect(mockCognitoClient.send).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
