// O service permite o isolamento das funcionalidades, enquanto os data sources acessam diretamente o banco tanto internamente (mock) ou externamente (supabase, firebase...)
// O importante é que a ViewModel nunca pode conhecer diretamente os detalhes de implementação dessas funções/serviços

import { CategoriaDataSource } from "@/model/dataSource/categoriaDataSource";
import { Categoria } from "@/model/entities/categoria";

export class ServicoCategoria {
  private categoriaDataSource: CategoriaDataSource;

  constructor(categoriaDataSource: CategoriaDataSource) {
    this.categoriaDataSource = categoriaDataSource;
  }

  /**
   * Objetivo: Utilizar data soruce de categorias para acessar o método de busca geral de categorias
   * @returns Uma lista de categorias no caminho feliz, caso contrário um erro adequado!
   */
  public async pesquisarTodasCategorias(): Promise<Array<Categoria>> {
    const CATEGORIAS: Array<Categoria> =
      await this.categoriaDataSource.buscarCategorias();
    if (CATEGORIAS.length == 0) {
      throw new Error("Não foi possível localizar a lista de categorias.");
    }

    return CATEGORIAS;
  }

  /**
   * Objetivo: Utilizar o data source de categorias para facilitar a pesquisa única de uma categoria
   * @param categoriaId O ID da categoria que queremos encontrar
   * @returns A categoria que está sendo buscada no caso feliz, caso contrário erro adequado!
   */
  public async pesquisarCategoriaPorId(
    categoriaId: string,
  ): Promise<Categoria> {
    const CATEGORIA_ENCONTRADA =
      await this.categoriaDataSource.buscaCategoriaPorId(categoriaId);

    if (!CATEGORIA_ENCONTRADA) {
      throw new Error(
        "A categoria não foi encontrada, o id não foi localizado.",
      );
    }

    return CATEGORIA_ENCONTRADA;
  }
}
