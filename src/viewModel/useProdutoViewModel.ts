import type { Produto } from "@/model/entities/produto";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ProdutoDataSource } from "@/model/dataSource/produtoDataSource";

export type ProdutoState = {
  produto: Produto | undefined;
  quantidade: number;
  carregando: boolean;
  erro: string | null;
};

export type ProdutoActions = {
  voltar: () => void;
  aumentarQuantidade: () => void;
  diminuirQuantidade: () => void;
};

const produtoDataSource = new ProdutoDataSource();

export function useProdutoViewModel(): [ProdutoState, ProdutoActions] {
  // O produto é identificado pelo ID recebido na rota.
  const { id } = useLocalSearchParams<{ id?: string }>();
  const produtoId = Array.isArray(id) ? id[0] : id;
  const [produto, setProduto] = useState<Produto | undefined>(undefined);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProduto(): Promise<void> {
      setCarregando(true);
      setErro(null);

      try {
        if (!produtoId) {
          throw new Error("O id do produto não foi informado!");
        }

        const resultado = await produtoDataSource.buscarProdutoPorId(produtoId);

        if (!resultado) {
          throw new Error("O produto não foi encontrado.");
        }

        setProduto(resultado);
      } catch (erro) {
        return erro instanceof Error
          ? setErro(erro.message)
          : setErro("Não foi possível localizar o produto!");
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto();
  }, [produtoId]);

  function voltar(): void {
    router.back();
  }

  function aumentarQuantidade(): void {
    setQuantidade((v: number) => v + 1);
  }

  function diminuirQuantidade(): void {
    setQuantidade((v) => {
      if (v > 1) {
        return v - 1;
      }

      return v;
    });
  }

  const produtoState: ProdutoState = {
    produto,
    quantidade,
    carregando,
    erro,
  };

  const produtoActions: ProdutoActions = {
    voltar,
    aumentarQuantidade,
    diminuirQuantidade,
  };

  return [produtoState, produtoActions];
}
