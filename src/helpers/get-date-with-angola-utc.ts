/**
 * Retorna uma data ISO corrigida para UTC+1 (fuso de Angola), mas no formato padrão ISO.
 * Exemplo de saída: 2025-04-19T00:00:00.000Z (equivalente a 01:00 em Luanda)
 */
export function getDateWithAngolaUTC(date: Date): string {
  const angolaOffsetInMs = 60 * 60 * 1000; // UTC+1 em milissegundos
  const utcTime = date.getTime() - date.getTimezoneOffset() * 60 * 1000;
  const angolaTime = new Date(utcTime + angolaOffsetInMs); // aqui somamos, não subtraímos
  return angolaTime.toISOString();
}
