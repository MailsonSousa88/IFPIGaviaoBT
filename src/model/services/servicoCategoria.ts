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
}
