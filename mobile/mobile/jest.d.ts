// Tipos globais do Jest para TypeScript
import 'jest';

declare global {
  var describe: jest.Describe;
  var it: jest.It;
  var test: jest.It;
  var expect: jest.Expect;
  var beforeEach: jest.Lifecycle;
  var afterEach: jest.Lifecycle;
  var beforeAll: jest.Lifecycle;
  var afterAll: jest.Lifecycle;
}
