import { Test, TestingModule } from '@nestjs/testing';
import { FilesystemStorage } from './filesystem.storage';

describe('FilesystemStorage', () => {
  let provider: FilesystemStorage;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesystemStorage],
    }).compile();

    provider = module.get<FilesystemStorage>(FilesystemStorage);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
