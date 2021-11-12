import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

jest.mock('./users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const paramId: number = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the create method', () => {
    const request = {} as CreateUserDto;
    controller.create(request);
    expect(service.create).toBeCalled();
  });

  it('should call the create method', () => {
    controller.findOne(paramId);
    expect(service.findOne).toBeCalled();
  });

  it('should call the findAll method', () => {
    controller.findAll();
    expect(service.findAll).toBeCalled();
  });

  it('should call the update method', () => {
    const request = {} as UpdateUserDto;
    controller.update(paramId, request);
    expect(service.update).toBeCalled();
  });

  it('should call the remove method', () => {
    controller.remove(paramId);
    expect(service.remove).toBeCalled();
  });

});
