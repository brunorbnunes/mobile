// Teste simples para verificar se o Jest está funcionando
describe('Teste Básico', () => {
  test('Jest está funcionando', () => {
    expect(1 + 1).toBe(2);
  });

  test('String não está vazia', () => {
    const texto = 'Hello World';
    expect(texto).toBeTruthy();
    expect(texto.length).toBeGreaterThan(0);
  });
});
