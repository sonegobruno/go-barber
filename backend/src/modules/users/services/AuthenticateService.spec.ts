import "reflect-metadata";
import AuthenticateService from './AuthenticateService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../services/CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        authenticateUser = new AuthenticateService(fakeUserRepository,fakeHashProvider);
    })

    it('should be able to authenticate', async  () => {
        const user = await createUser.execute({
            name: 'Bruno',
            email: 'bruno@gmail.com',
            password: '123456'
        })

        const response = await authenticateUser.execute({
            email: 'bruno@gmail.com',
            password: '123456'
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async  () => {
        await expect(authenticateUser.execute({
            email: 'bruno@gmail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to authenticate with wrong password', async  () => {
        await createUser.execute({
            name: 'Bruno',
            email: 'bruno@gmail.com',
            password: '123456'
        })

        await expect(authenticateUser.execute({
            email: 'bruno@gmail.com',
            password: 'wrong-password'
        })).rejects.toBeInstanceOf(AppError);
    });
});


