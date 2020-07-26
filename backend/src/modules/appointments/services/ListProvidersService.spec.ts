import "reflect-metadata";
import ListProvidersService from './ListProvidersService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        listProvidersService = new ListProvidersService(fakeUserRepository);
    });

    it('should be able to list the providers', async  () => {
        const user1 = await fakeUserRepository.create({
            name: 'Bruno',
            email: 'bruno@gmail.com',
            password: '123456'
        });

        const user2 = await fakeUserRepository.create({
            name: 'Bruno 2',
            email: 'bruno2@gmail.com',
            password: '123123'
        });

        const loggedUser = await fakeUserRepository.create({
            name: 'Bruno 3',
            email: 'bruno3@gmail.com',
            password: '123456789'
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([
            user1, user2
        ]);
    });

});
