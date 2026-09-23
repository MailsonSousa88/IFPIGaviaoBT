import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCategoriaViewModel } from "@/viewModel/useCategoriaViewModel";
import { ProdutoCard } from "./components/ProdutoCard";

const Categoria = () => {
  const [categoriaState, categoriaActions] = useCategoriaViewModel();

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalhoContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.cabecalhoLinha}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.botaoVoltar}
              onPress={categoriaActions.voltar}
            >
              <Ionicons name="chevron-back" size={24} color="#ffffff" />
              <Text style={styles.textoVoltar}>Início</Text>
            </TouchableOpacity>

            <Text style={styles.tituloHeader}>
              {categoriaState.nomeCategoria}
            </Text>

            <View style={styles.espacadorHeader} />
          </View>
        </SafeAreaView>
      </View>

      {categoriaState.carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#501673" />
          <Text style={styles.loadingTexto}>Buscando itens no banco...</Text>
        </View>
      ) : categoriaState.erro ? (
        <View style={styles.vazioContainer}>
          <Text style={styles.vazioTexto}>{categoriaState.erro}</Text>
        </View>
      ) : (
        <FlatList
          data={categoriaState.produtos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.vazioContainer}>
              <Text style={styles.vazioTexto}>
                Nenhum item encontrado nesta categoria.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProdutoCard
              produto={item}
              onPress={() => categoriaActions.abrirProduto(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  cabecalhoContainer: {
    backgroundColor: "#501673",
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  cabecalhoLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
  },
  textoVoltar: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 2,
  },
  tituloHeader: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  espacadorHeader: {
    width: 60,
  },
  listaConteudo: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingTexto: {
    marginTop: 12,
    fontSize: 15,
    color: "#6c757d",
  },
  vazioContainer: {
    paddingTop: 60,
    alignItems: "center",
  },
  vazioTexto: {
    fontSize: 15,
    color: "#8c959f",
  },
});

export default Categoria;
