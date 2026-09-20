import { useEffect, useState } from "react";
import { router } from "expo-router";
import type { Categoria } from "@/model/entities/categoria";
import { CategoriaDataSource } from "@/model/dataSource/categoriaDataSource";
import { ServicoCategoria } from "@/model/services/servicoCategoria";

// Esse state representa os items
export type InicioState = {
  categorias: Array<Categoria>;
  carregando: boolean;
  erro: string | null;
};

// Uma Action deve sempre retornar 'VOID'
export type InicioActions = {
  abrirCategoria: (categoriaId: string) => void;
};

// Instanciamos o servico de categorias que utiliza o data source de categorias
const servicoCategoria = new ServicoCategoria(new CategoriaDataSource());

export function useInicioViewModel(): [InicioState, InicioActions] {
  const [categorias, setCategorias] = useState<Array<Categoria>>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCategorias(): Promise<void> {
      setCarregando(true);
      setErro(null);

      try {
        const resultado = await servicoCategoria.pesquisarTodasCategorias();
        setCategorias(resultado);
      } catch (erro) {
        return erro instanceof Error
          ? setErro(erro.message)
          : setErro("Categorias não foram encontradas!");
      } finally {
        setCarregando(false);
      }
    }

    // A função é adicionada aqui pois ela precisa ser chamada se quisermos que ela seja executada!
    carregarCategorias();
  }, []);

  function abrirCategoria(categoriaId: string): void {
    router.push({
      pathname: "/category/[id]",
      params: {
        id: categoriaId,
      },
    });
  }

  // Esse objeto representa o os estados iniciais e modificaveis de modulo
  const inicioState: InicioState = {
    categorias,
    carregando,
    erro,
  };

  // Esse representa as ações capazes de realizar as mudanças dos estados
  const inicioActions: InicioActions = {
    abrirCategoria,
  };

  return [inicioState, inicioActions];
}
