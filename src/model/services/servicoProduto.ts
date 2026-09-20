import type { Produto } from "@/model/entities/produto";
import { ProdutoDataSource } from "@/model/dataSource/produtoDataSource";

export class ServicoProduto {
  private produtoDataSource: ProdutoDataSource;

  constructor(produtoDataSource: ProdutoDataSource) {
    this.produtoDataSource = produtoDataSource;
  }

  /**
   * Objetivo: Utilizar data source de produto para encontrar todos os produtos com a mesma categoria fornecida.
   * @param categoriaId O id categoria que é fornecida pelas ações do usuário na View para fazer a pesquisa.
   * @returns Uma lista de produtos de uma mesma categoria.
   */
  public async pesquisarProdutoPorCategoria(
    categoriaId: string,
  ): Promise<Array<Produto>> {
    const PRODUTOS_CATEGORIA: Array<Produto> =
      await this.produtoDataSource.buscarProdutoPorCategoria(categoriaId);

    return PRODUTOS_CATEGORIA;
  }

  public async pesquisarProdutoPorId(id: string): Promise<Produto> {
    const PRODUTO: Produto | undefined =
      await this.produtoDataSource.buscarProdutoPorId(id);

    if (!PRODUTO) {
      throw new Error("O produto não foi encontrado.");
    }

    return PRODUTO;
  }
}
