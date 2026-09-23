import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { CategoriaDataSource } from "@/model/dataSource/categoriaDataSource";
import { ProdutoDataSource } from "@/model/dataSource/produtoDataSource";
import type { Produto } from "@/model/entities/produto";

export type CategoriaState = {
  produtos: Array<Produto>;
  nomeCategoria: string;
  carregando: boolean;
  erro: string | null;
};

export type CategoriaActions = {
  abrirProduto: (produtoId: string) => void;
  voltar: () => void;
};

const categoriaDataSource = new CategoriaDataSource();
const produtoDataSource = new ProdutoDataSource();

export function useCategoriaViewModel(): [CategoriaState, CategoriaActions] {
  // O ID da categoria vem do segmento dinâmico da rota.
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoriaId = Array.isArray(id) ? id[0] : id;
  const [produtos, setProdutos] = useState<Array<Produto>>([]);
  const [nomeCategoria, setNomeCategoria] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarTelaDosProdutos(): Promise<void> {
      setCarregando(true);
      setErro(null);
      try {
        if (!categoriaId) {
          throw new Error(
            "O ID da categoria não existe, ou não foi informado!",
          );
        }

        const categoriaEncontrada =
          await categoriaDataSource.buscarCategoriaPorId(categoriaId);

        if (!categoriaEncontrada) {
          throw new Error(
            "A categoria não foi encontrada, o id não foi localizado.",
          );
        }

        setNomeCategoria(categoriaEncontrada.nome);
        const resultado =
          await produtoDataSource.buscarProdutoPorCategoria(categoriaId);

        setProdutos(resultado);
      } catch (erro) {
        return erro instanceof Error
          ? setErro(erro.message)
          : setErro("A categoria não existe!");
      } finally {
        setCarregando(false);
      }
    }

    carregarTelaDosProdutos();
  }, [categoriaId]);

  function abrirProduto(produtoId: string): void {
    router.push({
      pathname: "/produto/[id]",
      params: {
        id: produtoId,
      },
    });
  }

  function voltar(): void {
    router.back();
  }

  const categoriaState: CategoriaState = {
    produtos,
    nomeCategoria,
    carregando,
    erro,
  };

  const categoriaActions: CategoriaActions = {
    abrirProduto,
    voltar,
  };

  return [categoriaState, categoriaActions];
}
