// O Objetivo dos dataSources é conhecer diretamente o banco de dados, e forncer a ponte entre o banco e os services
// IMPORTANTE: Os dataSources são os unicos que podem diretamente acessar o banco!

import type { Categoria } from "@/model/entities/categoria";
import { BANCO_CATEGORIAS } from "@/model/data/bancoDeCategorias";

export class CategoriaDataSource {
  /**
   * Objetivo: Permitir a consulta das categorias existentes no banco de dados
   * @returns Retorna uma cópia do banco de categorias
   */
  async buscarCategorias(): Promise<Array<Categoria>> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return [...BANCO_CATEGORIAS];
  }
}
