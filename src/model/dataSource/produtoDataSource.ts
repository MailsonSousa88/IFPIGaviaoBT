// Seguindo a mesma lógica do data source de categoria, faremos o de produtos
// Teremos dois metodos distintos que devem retornar: 1. Produtos p/ categoria & 2. Produtos p/ ID
import type { Produto } from "@/model/entities/produto";
import { BANCO_PRODUTOS } from "@/model/data/bancoDeProdutos";

export class ProdutoDataSource {
  /**
   * Objetivo: Permitir a busca de todos os produtos através da categoria
   * @param categoriaId ID da categoria fornecida pelo usuário
   * @returns Uma lista de produtos filtrado por categoria escolhida
   */
  async buscarProdutoPorCategoria(categoriaId: string): Promise<Array<Produto>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return BANCO_PRODUTOS.filter(
      (produto) => produto.categoriaId == categoriaId,
    );
  }

  /**
   * Objetivo: Permitir a busca de um produto por id
   * @param id O id do produto fornecido pelo usuário através das ações na View
   * @returns Um produto no caso feliz, undefined no caso contrário
   */
  async buscarProdutoPorId(id: string): Promise<Produto | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return BANCO_PRODUTOS.find((produto) => produto.id == id);
  }
}
