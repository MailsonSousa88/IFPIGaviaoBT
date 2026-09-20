// O data source é a ponte entre o banco e o service de categorias.

import type { Categoria } from "@/model/entities/categoria";
import { BANCO_CATEGORIAS } from "@/model/data/bancoDeCategorias";

export class CategoriaDataSource {
  /**
   * Objetivo: Permitir a consulta das categorias existentes no banco de dados
   * @returns Retorna uma cópia do banco de categorias
   */
  async buscarCategorias(): Promise<Array<Categoria>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [...BANCO_CATEGORIAS];
  }

  /**
   * Objetivo: Encontrar uma categoria através do seu id
   * @param categoriaId Representa o ID da categoria
   * @returns Uma categoria no caso feliz, caso contrário undefined
   */
  async buscaCategoriaPorId(categoriaId: string): Promise<Categoria | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return BANCO_CATEGORIAS.find((item) => item.id == categoriaId);
  }
}
