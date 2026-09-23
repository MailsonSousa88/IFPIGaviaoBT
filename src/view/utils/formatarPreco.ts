// Essa função é exclusivamente para realizar uma necessidade da view portanto ela deve estat concentrada na pasta utils

export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}
