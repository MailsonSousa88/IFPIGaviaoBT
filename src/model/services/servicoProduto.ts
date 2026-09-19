import type { Produto } from "@/model/entities/produto";
import { ProdutoDataSource } from "@/model/dataSource/produtoDataSource";

export class servicoProduto {
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
  ): Promise<Array<Produto> | undefined> {
    const PRODUTOS_CATEGORIA: Array<Produto> =
      await this.produtoDataSource.buscarProdutoPorCategoria(categoriaId);

    if (PRODUTOS_CATEGORIA) {
      throw new Error("Não foi possivel localizar produtos dessa categoria.");
    }

    return PRODUTOS_CATEGORIA;
  }

  public async pesquisarProdutoPorId(id: string): Promise<Produto> {
    const PRODUTO: Produto = await this.pesquisarProdutoPorId(id);

    if (PRODUTO) {
      throw new Error("O produto não foi encontrado.");
    }

    return PRODUTO;
  }
}
