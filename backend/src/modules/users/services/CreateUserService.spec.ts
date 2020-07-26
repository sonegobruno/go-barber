import "reflect-metadata";
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    })

    it('should be able to create a new user', async  () => {
        const user = await createUser.execute({
            name: 'bruno',
            email: 'bruno@gmail.com',
            password: '123456'
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email from another', async  () => {
        await createUser.execute({
            name: 'bruno',
            email: 'bruno@gmail.com',
            password: '123456'
        });

        await expect(createUser.execute({
            name: 'bruno',
            email: 'bruno@gmail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError);
    });
});
