import type { Produto } from "@/model/entities/produto";
import { ProdutoDataSource } from "@/model/dataSource/produtoDataSource";

export class servicoProduto {
  private produtoDataSource: ProdutoDataSource;

  constructor(produtoDataSource: ProdutoDataSource) {
    this.produtoDataSource = produtoDataSource;
  }

  /**
   * Objetivo: Utilizar data source de produto para encontrar todos os produtos com a mesma categoria fornecida.
   * @param categoria A categoria que é fornecida pelo usuário para fazer a pesquisa.
   * @returns Uma lista de produtos de uma mesma categoria.
   */
  public async pesquisarProdutoPorCategoria(
    categoria: string,
  ): Promise<Array<Produto> | undefined> {
    const PRODUTOS_CATEGORIA =
      await this.produtoDataSource.buscarProdutoPorCategoria(categoria);

    if (PRODUTOS_CATEGORIA) {
      throw new Error("Não foi possivel localizar produtos dessa categoria.");
    }

    return PRODUTOS_CATEGORIA;
  }
}
