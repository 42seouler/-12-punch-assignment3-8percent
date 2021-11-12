import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountDto } from './create-account.dto';

describe('ValidationPipe', () => {
  let target: ValidationPipe;
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateAccountDto,
    data: '',
  };

  describe('transform', () => {
    describe('when validation pass', () => {
      it('should return a CreateAccountDto instance', async () => {
        target = new ValidationPipe({ transform: true });
        const testObj = { accountNum: 100000000000, userId: 1 };
        expect(await target.transform(testObj, metadata)).toBeInstanceOf(
          CreateAccountDto,
        );
      });
    });

    describe('when validation fails', () => {
      beforeEach(() => {
        target = new ValidationPipe();
      });
      it('should throw an error if accountNum is not define', async () => {
        const testObj = { userId: 1 };
        await expect(target.transform(testObj, metadata)).rejects.toThrow(
          BadRequestException,
        );
      });
      it('should throw an error if accountNum is incorrect', async () => {
        const testObj = { accountNum: 'string', userId: 1 };
        await target
          .transform(testObj, metadata)
          .catch((error) =>
            expect(error.getResponse().message).toEqual([
              'accountNum must not be greater than 999999999999',
              'accountNum must not be less than 100000000000',
              'accountNum must be a number conforming to the specified constraints',
            ]),
          );
      });
      it('should throw an error if userId is not define', async () => {
        const testObj = { accountNum: 100000000000 };
        await expect(target.transform(testObj, metadata)).rejects.toThrow(
          BadRequestException,
        );
      });
      it('should throw an error if userId is incorrect', async () => {
        const testObj = { accountNum: 100000000000, userId: '1' };
        try {
          await target.transform(testObj, metadata);
        } catch (error) {
          expect(error.getResponse().message).toEqual([
            'userId must be a number conforming to the specified constraints',
          ]);
        }
      });
    });
  });
});
