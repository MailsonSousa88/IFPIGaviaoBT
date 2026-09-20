import type { Categoria } from "@/model/entities/categoria";

export const BANCO_CATEGORIAS: Array<Categoria> = [
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
