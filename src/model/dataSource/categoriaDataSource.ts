// O data source é o gerenciador dos dados da aplicação, é ele que gerencia todos os dados (CRUD)
// Os services são responsavel apenas por funcionalidades isoladas (Autenticar, Enviar email...)

import type { Categoria } from "@/model/entities/categoria";

export class CategoriaDataSource {
  private readonly categorias: Array<Categoria> = [
    {
      id: "comidas",
      nome: "Comidas",
      imagem: require("../../../assets/images/menu/categoria-comidas.png"),
    },
    {
      id: "bebidas",
      nome: "Bebidas",
      imagem: require("../../../assets/images/menu/categoria-bebidas.png"),
    },
  ];

  /**
   * Objetivo: Permitir a consulta das categorias existentes no banco de dados
   * @returns Retorna uma cópia do banco de categorias
   */
  async buscarCategorias(): Promise<Array<Categoria>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [...this.categorias];
  }

  /**
   * Objetivo: Encontrar uma categoria através do seu id
   * @param categoriaId Representa o ID da categoria
   * @returns Uma categoria no caso feliz, caso contrário undefined
   */
  async buscarCategoriaPorId(
    categoriaId: string,
  ): Promise<Categoria | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return this.categorias.find((item) => item.id === categoriaId);
  }
}
