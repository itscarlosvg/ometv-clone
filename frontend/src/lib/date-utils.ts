/**
 * Convierte una fecha a ISO string sin ajuste de zona horaria
 * Para guardar en la base de datos
 */
export function toISOLocal(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

/**
 * Convierte una fecha UTC a fecha local para mostrar
 * Cuando viene de la base de datos
 */
export function fromUTCToLocal(utcDateString: string) {
  const date = new Date(utcDateString);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}