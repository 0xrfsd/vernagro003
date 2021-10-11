import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { proxy } from "valtio";
// export const proxyFiliaisEstado = proxy({
//     estado: undefined,
//     filiais: [],
//   });

export const proxyFiliaisEstado = proxy([]);

const Selector = ({ estado, id, preco, custo, margem, fili }) => {
  const [selected, setSelected] = React.useState(false);

  const [Estado, setEstado] = React.useState(undefined);
  const [Preco, setPreco] = React.useState(150);
  const [Custo, setCusto] = React.useState(100);
  const [Margem, setMargem] = React.useState(0);

  const [ID, setID] = React.useState(undefined);

  const [filiaisEstado, setFiliaisEstado] = React.useState([]);

  const handleFiliaisEstado = React.useCallback(() => {
    const filiais = fili.filter((filial) => {
      return filial.estado === Estado;
    });

    const model = {
      id: ID,
      estado: Estado,
      filiais: [],
    };

    const arr = [];

    filiais.map((filial) => {
      const Schema = {
        id: filial._id,
        estado: filial.estado,
        nome: filial.nome,
        disponivel: true,
        valores: {
          preco: Preco,
          custo: Custo,
          margem: Margem,
        },
      };
      model.filiais.push(Schema);
    });

    if (selected) {
      setFiliaisEstado((arr) => [...arr, model]);
      const a1 = [];
      proxyFiliaisEstado.map((item, id) => {
        if (item.id === ID) {
          a1.push(id);
        }
      });
      if (a1.length === 0) {
        proxyFiliaisEstado.push(model);
      }
    } else {
        setFiliaisEstado([]);
        proxyFiliaisEstado.map((item, id) => {
            if (item.id === ID) {
                proxyFiliaisEstado.splice(id, 1)
            }
          });
    }
  }, [Estado, ID, Preco, Custo, Margem, selected]);

  React.useEffect(() => {
    handleFiliaisEstado();
  }, [handleFiliaisEstado]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelected(!selected);
          setID(id);
          setEstado(estado);
          setPreco(preco);
          setCusto(custo);
          setMargem(margem);
        }}
        key={id}
        style={{
          height: 50,
          width: "100%",
          display: "flex",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <Text>{estado}</Text>
          <View
            style={{
              height: 25,
              width: 25,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selected ? "green" : "transparent",
              borderWidth: selected ? null : 1,
              borderColor: selected ? null : "#bbb",
            }}
          >
            {selected ? (
              <AntDesign name="check" size={15} color="#fff" />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Selector;
