import { useEffect, useState } from "react";
import { router } from "expo-router";
import type { Categoria } from "@/model/entities/categoria";
import { CategoriaDataSource } from "@/model/dataSource/categoriaDataSource";
import { ServicoCategoria } from "@/model/services/servicoCategoria";

// Dados usados pela tela inicial.
export type InicioState = {
  categorias: Array<Categoria>;
  carregando: boolean;
  erro: string | null;
};

// Ações que a tela inicial pode executar.
export type InicioActions = {
  abrirCategoria: (categoriaId: string) => void;
};

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

    // A busca começa quando a tela é montada.
    carregarCategorias();
  }, []);

  function abrirCategoria(categoriaId: string): void {
    router.push({
      pathname: "/categoria/[id]",
      params: {
        id: categoriaId,
      },
    });
  }

  const inicioState: InicioState = {
    categorias,
    carregando,
    erro,
  };

  const inicioActions: InicioActions = {
    abrirCategoria,
  };

  return [inicioState, inicioActions];
}
