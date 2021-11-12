import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

jest.mock('./users.repository');

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findOne, create, and save repository methods', async () => {
    const createUserDto: CreateUserDto = {
      name: "joseph",
      password: "josephkim123"
    };

    const userEntity: User = {
      name: "joseph",
      password: "josephkim123",
      id: 1,
      createdAt: new Date(Date.now()), 
      updated_at: new Date(Date.now())
    } as User

    jest.spyOn(service, "create").mockReturnValueOnce(Promise.resolve(1));
    await service.create(createUserDto)

    expect(repository.findOne).toHaveBeenCalledWith(userEntity);
    expect(repository.create).toHaveBeenCalledWith(userEntity);
    expect(repository.save).toHaveBeenCalledWith(userEntity);
  });

});
