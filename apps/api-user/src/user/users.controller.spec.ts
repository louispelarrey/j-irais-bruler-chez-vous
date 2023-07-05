import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@j-irais-bruler-chez-vous/user/feature';
import { UsersController } from './users.controller';
import { Users } from '@j-irais-bruler-chez-vous/user/feature';
import { CreateUserDto } from '@j-irais-bruler-chez-vous/user/feature';
import { Role } from '@j-irais-bruler-chez-vous/shared';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        findByIdentifier: jest.fn(),
                        findOne: jest.fn(),
                        createUser: jest.fn(),
                        updateUser: jest.fn(),
                        deleteUser: jest.fn(),
                        findAll: jest.fn(),
                        forgotPassword: jest.fn(),
                        forgotPasswordToken: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    // Teste si la méthode "findByIdentifier" du service est appelée avec le bon argument
    it('devrait trouver un utilisateur par identifiant', async () => {
        const identifier = 'testIdentifier';
        await controller.findUserByIdentifier(identifier);
        expect(service.findByIdentifier).toHaveBeenCalledWith(identifier);
    });

    // Teste si la méthode "findOne" du service est appelée avec le bon argument
    it('devrait trouver un utilisateur par ID', async () => {
        const id = 'testId';
        await controller.findUserById(id);
        expect(service.findOne).toHaveBeenCalledWith(id);
    });

    // Teste si la méthode "createUser" du service est appelée avec le bon argument et retourne le résultat attendu
    it('devrait créer un utilisateur', async () => {
        const dto: CreateUserDto = {
            username: 'TestUsername',
            email: 'test@example.com',
            password: 'testPassword',
        };

        const expectedUser: Users = {
            id: '1',
            username: dto.username,
            email: dto.email,
            password: dto.password,
            roles: [Role.User],
            forgotPassword: [],
        };

        jest.spyOn(service, 'createUser').mockResolvedValueOnce(expectedUser);

        const user = await controller.handleCreateUser(dto);

        expect(service.createUser).toHaveBeenCalledWith(dto);
        expect(user).toEqual(expectedUser);
    });

    // Teste si la méthode "updateUser" du service est appelée avec les bons arguments et retourne le résultat attendu
    it('devrait mettre à jour un utilisateur', async () => {
        const dto: CreateUserDto = {
            username: 'UpdatedUsername',
            email: 'updated@example.com',
            password: 'updatedPassword',
        };

        const id = '1';

        const expectedUser: Users = {
            id,
            username: dto.username,
            email: dto.email,
            password: dto.password,
            roles: [Role.User],
            forgotPassword: [],
        };

        jest.spyOn(service, 'updateUser').mockResolvedValueOnce(expectedUser);

        const user = await controller.handleUpdateUser({ id, updateUserDto: dto });

        expect(service.updateUser).toHaveBeenCalledWith(id, dto);
        expect(user).toEqual(expectedUser);
    });

    // Teste si la méthode "deleteUser" du service est appelée avec le bon argument
    it('devrait supprimer un utilisateur', async () => {
        const id = '1';
        await controller.handleDeleteUser(id);
        expect(service.deleteUser).toHaveBeenCalledWith(id);
    });

    // Teste si la méthode "findAll" du service est appelée sans aucun argument
    it('devrait trouver tous les utilisateurs', async () => {
        await controller.handleFindAllUsers();
        expect(service.findAll).toHaveBeenCalled();
    });

    // Teste si la méthode "forgotPassword" du service est appelée avec le bon argument
    it('devrait gérer la requête de mot de passe oublié', async () => {
        const email = 'test@example.com';
        await controller.handleForgotPassword(email);
        expect(service.forgotPassword).toHaveBeenCalledWith(email);
    });

    // Teste si la méthode "forgotPasswordToken" du service est appelée avec les bons arguments
    it('devrait gérer la requête de token de mot de passe oublié', async () => {
        const id = '1';
        const password = 'newPassword';
        await controller.handleForgotPasswordToken({ id, password });
        expect(service.forgotPasswordToken).toHaveBeenCalledWith(id, password);
    });
});
