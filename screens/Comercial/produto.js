import React from "react";
import Axios from "axios";

import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";

import { proxyFiliaisEstado } from "./selector";
import { useSnapshot } from "valtio";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { SimpleModal } from "./modal";

import Selector from "./selector";

import AuthContext from "../../context/auth";

const Produto = () => {
  const { user } = React.useContext(AuthContext);
  const [empresaId, setEmpresaId] = React.useState("");

  const navigation = useNavigation();
  const [error, setError] = React.useState("");

  const [informacoes, setInformacoes] = React.useState(false);
  const [disponibilidade, setDisponiblidade] = React.useState(false);
  const [valores, setValores] = React.useState(false);
  const [especificacoes, setEspecificacoes] = React.useState(false);
  const [disponibilidadeEstado, setDisponibilidadeEstado] =
    React.useState(false);

  const [teste, setTeste] = React.useState(false);

  const [nomedoproduto, setNomedoproduto] = React.useState("");
  const [principioativo, setPrincipioativo] = React.useState("");
  const [fornecedor, setFornecedor] = React.useState("");

  const [preco, setPreco] = React.useState(undefined);
  const [custo, setCusto] = React.useState(undefined);
  const [margem, setMargem] = React.useState(undefined);

  const [selecionar, setSelecionar] = React.useState(false);
  const [embalagem, setEmbalagem] = React.useState("");
  const [quantidade, setQuantidade] = React.useState(undefined);

  const [informacoesSaved, setInformacoesSaved] = React.useState(false);
  const [disponibilidadeSaved, setDisponibilidadeSaved] = React.useState(false);
  const [valoresSaved, setValoresSaved] = React.useState(false);
  const [especificacoesSaved, setEspecificacoesSaved] = React.useState(false);
  const [disponibilidadeEstadoSaved, setDisponibilidadeEstadoSaved] =
    React.useState(false);

  const [modal, setModal] = React.useState([]);

  const [fili, setFili] = React.useState([]);

  const embalagens = [
    { id: 0, embalagem: "Bag", desc: "bag" },
    { id: 1, embalagem: "Balde", desc: "bd" },
    { id: 2, embalagem: "Dose", desc: "ds" },
    { id: 3, embalagem: "Galão", desc: "gl" },
    { id: 4, embalagem: "Quilo", desc: "kg" },
    { id: 5, embalagem: "Litro", desc: "lt" },
    { id: 6, embalagem: "Pacote", desc: "pct" },
    { id: 7, embalagem: "Saco", desc: "sc" },
    { id: 8, embalagem: "Tonelada", desc: "ton" },
  ];

  const [DisponibilidadeSchema, setDisponibilidadeSchema] = React.useState([]);

  const snap = useSnapshot(proxyFiliaisEstado);

  const [productSchema, setProductSchema] = React.useState([]);
  const [productSchemaUpdate, setProductSchemaUpdate] = React.useState([]);

  const getItemIndex = (arr, item) => {
    return arr.findIndex((x) => x.id === item);
  };

  const updateValores = (estadoId, filialId, field, newValue) => {
    const itemIndex = getItemIndex(productSchema, estadoId);

    let arr = [...productSchema];

    let estado = arr[itemIndex];

    let filial = estado.filiais[filialId];

    if (field === "preco" || field === "custo" || field === "margem") {
      const valores = { ...filial.valores, [field]: newValue };

      const newFilial = { ...filial, valores };

      arr[itemIndex].filiais[filialId] = newFilial;

      setProductSchemaUpdate(arr);
    }

    if (field === "disponivel") {
      let newArr = [];

      if (productSchemaUpdate.length === 0) {
        newArr = [...productSchema];
        newArr[itemIndex].filiais[filialId].disponivel =
          !newArr[itemIndex].filiais[filialId].disponivel;
      } else {
        newArr = [...productSchemaUpdate];
        newArr[itemIndex].filiais[filialId].disponivel =
          !newArr[itemIndex].filiais[filialId].disponivel;
      }

      setProductSchemaUpdate(newArr);
    }
  };

  const fetchFiliais = async () => {
    const empresaId = await user.empresaId;
    const response = await Axios.post(
      "http://192.168.0.110:9903/api/v0/core/filiais",
      {
        empresaId: empresaId,
      }
    );
    await setFili(response.data);

    const estados = await response.data.map((filial, id) => {
      return filial.estado;
    });

    const ns = await new Set(estados);
    const rd = await Array.from(ns);
    setNs(rd);

    setTeste(true);
  };

  React.useEffect(() => {
    if (snap.length > 0) {
      const str = JSON.stringify(snap);
      const prsd = JSON.parse(str);
      setProductSchema(prsd);
    }
    fetchFiliais();
    console.log(productSchema);
  }, [productSchemaUpdate, snap]);

  const [ns, setNs] = React.useState([]);

  const Select = ({ icon, title, description }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            title === "Informações" && setInformacoes(true);
            title === "Disponibilidade" && setDisponiblidade(true);
            title === "Valores" && setValores(true);
            title === "Especificações" && setEspecificacoes(true);
          }}
          style={{ height: "auto", width: "100%", backgroundColor: "#fff" }}
        >
          <View
            style={{
              paddingVertical: 10,
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign name={icon} size={26} color="#777" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: "#777", fontSize: 12 }}>{title}</Text>
                <Text style={{ fontSize: 16, color: "#333" }}>
                  {description}
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={16} color="#777" />
          </View>
        </TouchableOpacity>
        <View style={{ height: 1, width: "100%", backgroundColor: "#eee" }} />
      </>
    );
  };

  const HandleDisponivel = ({ estadoId, filialId, field }) => {
    const [selected, setSelected] = React.useState(true);
    React.useLayoutEffect(() => {
      if (productSchemaUpdate.length === 0) {
        productSchema[estadoId].filiais[filialId].disponivel === true
          ? setSelected(true)
          : setSelected(false);
      } else {
        productSchemaUpdate[estadoId].filiais[filialId].disponivel === true
          ? setSelected(true)
          : setSelected(false);
      }
    }, [productSchemaUpdate, productSchema]);
    return (
      <TouchableOpacity
        onPress={() => {
          updateValores(estadoId, filialId, field);
        }}
        style={{
          height: 50,
          justifyContent: "center",
          width: "100%",
          display: "flex",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
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
    );
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (disponibilidadeEstado) {
              if (disponibilidadeEstadoSaved) {
                setDisponibilidadeEstado(false);
                setDisponiblidade(true);
              } else {
                if (productSchemaUpdate.length > 0) {
                  Alert.alert(
                    "Tem certeza que deseja voltar?",
                    "Você perderá tudo que inseriu ao confirmar em voltar",
                    [
                      {
                        text: "Sim",
                        onPress: () => {
                          setProductSchemaUpdate([]);
                        },
                        style: "destructive",
                      },
                      {
                        text: "Não",
                        onPress: () => {},
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  setDisponibilidadeEstado(false);
                  setDisponiblidade(true);
                }
              }
            }
            if (disponibilidade) {
              if (productSchema.length > 0) {
                Alert.alert(
                  "Tem certeza que deseja voltar?",
                  "Você perderá tudo que inseriu ao confirmar em voltar",
                  [
                    {
                      text: "Sim",
                      onPress: () => {
                        setDisponiblidade(false);
                      },
                      style: "destructive",
                    },
                    {
                      text: "Não",
                      onPress: () => {},
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                setDisponiblidade(false);
              }
            }
            if (informacoes) {
              if (informacoesSaved) {
                setInformacoes(false);
              } else {
                if (
                  nomedoproduto.length > 0 ||
                  principioativo.length > 0 ||
                  fornecedor.length > 0
                ) {
                  Alert.alert(
                    "Tem certeza que deseja voltar?",
                    "Você perderá tudo que inseriu ao confirmar em voltar",
                    [
                      {
                        text: "Sim",
                        onPress: () => {
                          setInformacoes(false);
                          setNomedoproduto("");
                          setPrincipioativo("");
                          setFornecedor("");
                        },
                        style: "destructive",
                      },
                      {
                        text: "Não",
                        onPress: () => {},
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  setInformacoes(false);
                  setNomedoproduto("");
                  setPrincipioativo("");
                  setFornecedor("");
                }
              }
            }
            if (valores) {
              if (valoresSaved) {
                setValores(false);
              } else {
                if (
                  preco != undefined ||
                  custo != undefined ||
                  margem != undefined
                ) {
                  Alert.alert(
                    "Tem certeza que deseja voltar?",
                    "Você perderá tudo que inseriu ao confirmar em voltar",
                    [
                      {
                        text: "Sim",
                        onPress: () => {
                          setValores(false);
                          setPreco(undefined);
                          setCusto(undefined);
                          setMargem(undefined);
                        },
                        style: "destructive",
                      },
                      {
                        text: "Não",
                        onPress: () => {},
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  setValores(false);
                }
              }
            }
            if (especificacoes) {
              if (especificacoesSaved) {
                setEspecificacoes(false);
              } else {
                if (embalagem.length > 0 || quantidade > 0) {
                  Alert.alert(
                    "Tem certeza que deseja voltar?",
                    "Você perderá tudo que inseriu ao confirmar em voltar",
                    [
                      {
                        text: "Sim",
                        onPress: () => {
                          setEspecificacoes(false);
                          setEmbalagem("");
                          setQuantidade(undefined);
                        },
                        style: "destructive",
                      },
                      {
                        text: "Não",
                        onPress: () => {},
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  setEspecificacoes(false);
                }
              }
            }
            if (disponibilidade || informacoes || valores || especificacoes) {
              //
            } else {
              if (
                informacoesSaved ||
                disponibilidadeSaved ||
                valoresSaved ||
                especificacoesSaved
              ) {
                Alert.alert(
                  "Tem certeza que deseja fechar?",
                  "Você perderá tudo que inseriu ou salvou ao confirmar em fechar",
                  [
                    {
                      text: "Sim",
                      onPress: () => {
                        setInformacoesSaved(false);
                        setValoresSaved(false);
                        setEspecificacoes(false);
                        setDisponiblidade(false);
                        navigation.goBack();
                      },
                      style: "destructive",
                    },
                    {
                      text: "Não",
                      onPress: () => {},
                    },
                  ],
                  { cancelable: false }
                );
              } else if (
                !informacoes &&
                !valores &&
                !especificacoes &&
                !disponibilidade &&
                !disponibilidadeEstado
              ) {
                navigation.goBack();
              }
            }
          }}
        >
          <Text
            style={{
              color: "#E68202",
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            {!disponibilidade &&
            !disponibilidadeEstado &&
            !informacoes &&
            !valores &&
            !especificacoes
              ? "Fechar"
              : "Voltar"}
          </Text>
        </TouchableOpacity>
        {informacoes || valores || especificacoes || disponibilidade ? (
          <>
            {disponibilidade || especificacoes ? null : (
              <TouchableOpacity
                onPress={() => {
                  if (informacoes) {
                    if (
                      nomedoproduto.length > 0 ||
                      principioativo.length > 0 ||
                      fornecedor.length > 0
                    ) {
                      Alert.alert(
                        "Tem certeza que deseja redefinir?",
                        "Você perderá tudo que inseriu ao confirmar em redefinir",
                        [
                          {
                            text: "Sim",
                            onPress: () => {
                              setNomedoproduto("");
                              setPrincipioativo("");
                              setFornecedor("");
                            },
                            style: "destructive",
                          },
                          {
                            text: "Não",
                            onPress: () => {},
                          },
                        ],
                        { cancelable: false }
                      );
                    } else {
                      //
                    }
                  }
                  if (valores) {
                    if (
                      preco != undefined ||
                      (custo != undefined) | (margem !== undefined)
                    ) {
                      Alert.alert(
                        "Tem certeza que deseja redefinir?",
                        "Você perderá tudo que inseriu ao confirmar em redefinir",
                        [
                          {
                            text: "Sim",
                            onPress: () => {
                              setPreco(undefined);
                              setCusto(undefined);
                              setMargem(undefined);
                            },
                            style: "destructive",
                          },
                          {
                            text: "Não",
                            onPress: () => {},
                          },
                        ],
                        { cancelable: false }
                      );
                    } else {
                      //
                    }
                  }
                  if (especificacoes) {
                    if (embalagem.length > 0) {
                      Alert.alert(
                        "Tem certeza que deseja redefinir?",
                        "Você perderá tudo que inseriu ao confirmar em redefinir",
                        [
                          {
                            text: "Sim",
                            onPress: () => {
                              setEmbalagem("");
                              setQuantidade(undefined);
                            },
                            style: "destructive",
                          },
                          {
                            text: "Não",
                            onPress: () => {},
                          },
                        ],
                        { cancelable: false }
                      );
                    } else {
                      //
                    }
                  }
                }}
              >
                <Text
                  style={{
                    color: "#E68202",
                    fontWeight: "bold",
                    fontSize: 16,
                    textDecorationLine: "underline",
                  }}
                >
                  Redefinir
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : null}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {informacoes ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#fff",
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
              Nome do produto
            </Text>
            <TextInput
              value={nomedoproduto}
              onChangeText={(nome) => setNomedoproduto(nome)}
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              placeholder="e.g. Folamitrin"
            />
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: "#aaa",
                fontWeight: "bold",
              }}
            >
              Princípio ativo
            </Text>
            <TextInput
              value={principioativo}
              onChangeText={(pa) => setPrincipioativo(pa)}
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              placeholder="e.g. Folamitrin"
            />
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: "#aaa",
                fontWeight: "bold",
              }}
            >
              Fornecedor
            </Text>
            <TextInput
              value={fornecedor}
              onChangeText={(fornecedor) => setFornecedor(fornecedor)}
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              placeholder="e.g. Genérico"
            />
            <TouchableOpacity
              onPress={() => {
                if (nomedoproduto.length === 0) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "Por favor insira o nome do produto"
                  );
                } else if (principioativo.length === 0) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "Por favor insira o nome do príncipio ativo"
                  );
                } else if (fornecedor.length === 0) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "Por favor insira o nome do fornecedor"
                  );
                } else {
                  Alert.alert(
                    "Informações salvas",
                    "As informações do seu produto foram salvas com sucesso!",
                    [
                      {
                        text: "Confirmar",
                        onPress: () => {
                          setInformacoes(false);
                          setInformacoesSaved(true);
                          setValores(true);
                        },
                      },
                    ]
                  );
                }
              }}
              style={{
                width: "100%",
                borderRadius: 5,
                height: 50,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E68202",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Salvar informações
              </Text>
            </TouchableOpacity>
          </View>
        ) : disponibilidade ? (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              width: Dimensions.get("window").width,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                margin: 10,
                width: "100%",
                color: "#aaa",
                fontWeight: "bold",
              }}
            >
              Selecione em quais estados esse produto estará disponível
            </Text>
            {ns.map((newset, id) => {
              return (
                <Selector
                  estado={newset}
                  key={id}
                  fili={fili}
                  id={id}
                  preco={preco}
                  custo={custo}
                  margem={margem}
                />
              );
            })}

            <TouchableOpacity
              onPress={() => {
                if (productSchema.length > 0) {
                  setDisponiblidade(false);
                  setDisponibilidadeEstado(true);
                }
              }}
              style={{ width: "100%" }}
            >
              <Text
                style={{
                  color: "#aaa",
                  fontSize: 16,
                  marginVertical: 5,
                  textAlign: "right",
                  textDecorationLine: "underline",
                }}
              >
                Editar disponibilidade por filial
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (embalagem.length == 0) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "Por favor insira a embalagem do produto"
                  );
                } else if (quantidade == undefined) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "Por favor insira a quantidade da embalagem"
                  );
                } else {
                  Alert.alert(
                    "Especificaçoes salvas",
                    "As especificações do seu produto foram salvas com sucesso!",
                    [
                      {
                        text: "Confirmar",
                        onPress: () => {
                          setEspecificacoes(false);
                          setEspecificacoesSaved(true);
                          setDisponiblidade(true);
                        },
                      },
                    ]
                  );
                }
              }}
              style={{
                width: "100%",
                borderRadius: 5,
                height: 50,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E68202",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Salvar especificações
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : valores ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#fff",
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 14, color: "#aaa", fontWeight: "bold" }}>
              Preço
            </Text>
            <CurrencyInput
              placeholder="e.g. R$150,00"
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              value={preco}
              onChangeValue={(preco) => setPreco(preco)}
              prefix="R$"
              delimiter="."
              separator=","
              precision={2}
              minValue={0}
              maxValue={99999}
              // onChangeText={(e) => console.log(e)}
            />
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: "#aaa",
                fontWeight: "bold",
              }}
            >
              Custo
            </Text>
            <CurrencyInput
              value={custo}
              placeholder="e.g. R$100,00"
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              onChangeValue={(custo) => setCusto(custo)}
              prefix="R$"
              delimiter="."
              separator=","
              precision={2}
              minValue={0}
            />
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: "#aaa",
                fontWeight: "bold",
              }}
            >
              Margem
            </Text>
            <CurrencyInput
              placeholder="5%"
              style={{
                fontSize: 18,
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
              suffix="%"
              value={margem}
              onChangeValue={(margem) => setMargem(margem)}
              delimiter="."
              precision={0}
              separator=","
              maxValue={1000}
              minValue={0}
            />
            <TouchableOpacity
              onPress={() => {
                if (preco === undefined) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "Por favor insira o preço do produto"
                  );
                } else if (custo === undefined) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "Por favor insira o custo do produto"
                  );
                } else if (custo > preco) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "O custo do produto deve ser inferior ao preço do produto"
                  );
                  setCusto(null);
                } else if (margem === undefined) {
                  Alert.alert(
                    "Não foi possível salvar",
                    "Por favor insira a margem do produto"
                  );
                } else {
                  Alert.alert(
                    "Valores salvos",
                    "Os valores do seu produto foram salvos com sucesso!",
                    [
                      {
                        text: "Confirmar",
                        onPress: () => {
                          setValores(false);
                          setValoresSaved(true);
                          setEspecificacoes(true);
                        },
                      },
                    ]
                  );
                }
              }}
              style={{
                width: "100%",
                borderRadius: 5,
                height: 50,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E68202",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Salvar valores
              </Text>
            </TouchableOpacity>
          </View>
        ) : especificacoes ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#fff",
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#aaa",
                fontWeight: "bold",
              }}
            >
              Embalagem
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelecionar(!selecionar);
              }}
              style={{
                height: "auto",
                marginTop: 5,
                marginBottom: 10,
                paddingVertical: 10,
                borderRadius: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "#f2f2f2",
                borderBottomWidth: 1,
              }}
            >
              {embalagem ? (
                <Text style={{ fontSize: 18, color: "#000" }}>{embalagem}</Text>
              ) : (
                <Text style={{ fontSize: 18, color: "#bbb" }}>Selecionar</Text>
              )}
              <AntDesign
                name={selecionar ? "up" : "down"}
                size={22}
                color="#bbb"
              />
            </TouchableOpacity>
            {!selecionar ? (
              <>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color: "#aaa",
                    fontWeight: "bold",
                  }}
                >
                  Quantidade
                </Text>
                <CurrencyInput
                  value={quantidade}
                  placeholder="e.g. 5 Kg/L"
                  style={{
                    fontSize: 18,
                    marginTop: 5,
                    marginBottom: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    borderBottomColor: "#f2f2f2",
                    borderBottomWidth: 1,
                  }}
                  onChangeValue={(quantidade) => setQuantidade(quantidade)}
                  delimiter="."
                  suffix=" Kg/L"
                  separator=","
                  precision={0}
                  minValue={0}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (embalagem.length == 0) {
                      Alert.alert(
                        "Não foi possível salvar",
                        "Por favor a embalagem do produto"
                      );
                    } else if (quantidade == undefined) {
                      Alert.alert(
                        "Não foi possível salvar",
                        "Por favor insira a quantidade da embalagem"
                      );
                    } else {
                      Alert.alert(
                        "Especificaçoes salvas",
                        "As especificações do seu produto foram salvas com sucesso!",
                        [
                          {
                            text: "Confirmar",
                            onPress: () => {
                              setEspecificacoes(false);
                              setEspecificacoesSaved(true);
                              setDisponiblidade(true);
                            },
                          },
                        ]
                      );
                    }
                  }}
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    height: 50,
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#E68202",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Salvar especificações
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
            {selecionar && (
              <>
                {embalagens.map((embalagem, id) => {
                  return (
                    <TouchableOpacity
                      key={id}
                      onPress={() => {
                        setEmbalagem(embalagem.embalagem);
                        setSelecionar(false);
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: 12.5,
                        marginTop: 10,
                        borderRadius: 5,
                        justifyContent: "space-between",
                        width: "100%",
                        height: "auto",
                        backgroundColor: "#eee",
                      }}
                    >
                      <Text>
                        {embalagem.embalagem} ({embalagem.desc})
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </>
            )}
            {selecionar && (
              <>
                {embalagens.map((embalagem, id) => {
                  <TouchableOpacity
                    key={id}
                    style={{
                      height: 50,
                      width: "100%",
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "#eee",
                    }}
                  >
                    <Text>{embalagem.embalagem}</Text>
                    <Text>{embalagem.desc}</Text>
                  </TouchableOpacity>;
                })}
              </>
            )}
          </View>
        ) : disponibilidadeEstado ? (
          <>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 100,
                alignItems: "center",
                width: Dimensions.get("window").width,
              }}
            >
              {productSchema.map((filial, id) => {
                return (
                  <View
                    key={id}
                    style={{
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        height: 40,
                        backgroundColor: "#fff",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                        }}
                      >
                        {filial.estado}
                      </Text>
                    </View>
                    {filial.filiais.map((filial, id) => {
                      const estadoId = filial.estadoId;
                      const filialId = filial.id;
                      return (
                        <View key={id}>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              padding: 10,
                              justifyContent: "space-between",
                            }}
                          >
                            <Text>{filial.nome}</Text>
                          </View>
                          <View
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              padding: 10,
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ width: "30%" }}>
                              <Text
                                style={{
                                  color: "#777",
                                  fontSize: 14,
                                  marginVertical: 5,
                                  textDecorationLine: "underline",
                                }}
                              >
                                Preço
                              </Text>
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text style={{ color: "#bbb", fontSize: 16 }}>
                                  R${" "}
                                </Text>
                                <TextInput
                                  keyboardType="decimal-pad"
                                  placeholder={`${filial.valores.preco}`}
                                  onChangeText={(preco) => {
                                    updateValores(estadoId, id, "preco", preco);
                                  }}
                                  style={{
                                    height: 50,
                                    fontSize: 16,
                                    color: "#333",
                                  }}
                                />
                              </View>
                            </View>
                            <View style={{ width: "30%" }}>
                              <Text
                                style={{
                                  color: "#777",
                                  textDecorationLine: "underline",
                                  fontSize: 14,
                                  marginVertical: 5,
                                }}
                              >
                                Custo
                              </Text>
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text style={{ color: "#bbb", fontSize: 16 }}>
                                  R${" "}
                                </Text>
                                <TextInput
                                  placeholder={`${filial.valores.custo}`}
                                  onChangeText={(custo) => {
                                    updateValores(estadoId, id, "custo", custo);
                                  }}
                                  style={{
                                    height: 50,
                                    fontSize: 16,
                                    color: "#333",
                                  }}
                                />
                              </View>
                            </View>
                            <View style={{ width: "30%" }}>
                              <Text
                                style={{
                                  color: "#777",
                                  fontSize: 14,
                                  textDecorationLine: "underline",
                                  marginVertical: 5,
                                }}
                              >
                                Margem
                              </Text>
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text style={{ color: "#bbb", fontSize: 16 }}>
                                  R${" "}
                                </Text>
                                <TextInput
                                  placeholder={`${filial.valores.margem}`}
                                  onChangeText={(margem) => {
                                    updateValores(
                                      estadoId,
                                      id,
                                      "margem",
                                      margem
                                    );
                                  }}
                                  style={{
                                    height: 50,
                                    fontSize: 16,
                                    color: "#333",
                                  }}
                                />
                              </View>
                            </View>
                            <HandleDisponivel
                              estadoId={estadoId}
                              filialId={id}
                              field={"disponivel"}
                            />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                height: "auto",
                position: "absolute",
                bottom: 0,
                backgroundColor: "#fff",
                paddingHorizontal: 20,
                paddingBottom: 25,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setDisponibilidadeEstadoSaved(true);
                }}
                style={{
                  width: "100%",
                  marginHorizontal: 20,
                  borderRadius: 5,
                  height: 50,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E68202",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Salvar novos dados
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Select
              icon="filetext1"
              title="Informações"
              description="Nome, princípio ativo e fornecedor "
            />
            <Select
              icon="tag"
              title="Valores"
              description="Preço, custo e margem"
            />
            <Select
              icon="table"
              title="Especificações"
              description="Embalagem e quantidade"
            />
            <Select
              icon="isv"
              title="Disponibilidade"
              description="Estado e filiais"
            />
            {/* <View
              style={{
                marginTop: 20,
                backgroundColor: "#333",
                borderRadius: 5,
                height: "auto",
                width: "auto",
                padding: 20,
              }}
            >
              <Text style={{ color: "#bbb" }}>
                Nome do produto:{" "}
                <Text style={{ color: "#fff" }}>{nomedoproduto}</Text>
              </Text>
              <Text style={{ color: "#bbb" }}>
                Princípio ativo:{" "}
                <Text style={{ color: "#fff" }}>{principioativo}</Text>
              </Text>
              <Text style={{ color: "#bbb" }}>
                Fornecedor: <Text style={{ color: "#fff" }}>{fornecedor}</Text>
              </Text>
              <Text style={{ color: "#bbb" }}>
                Preço do produto: <Text style={{ color: "#fff" }}>{preco}</Text>
              </Text>
              <Text style={{ color: "#bbb" }}>
                Custo do produto: <Text style={{ color: "#fff" }}>{custo}</Text>
              </Text>
              <Text style={{ color: "#bbb" }}>
                Margem do produto:{" "}
                <Text style={{ color: "#fff" }}>{margem}</Text>
              </Text>
              <Text style={{ color: "#bbb" }}>
                Embalagem do produto:{" "}
                <Text style={{ color: "#fff" }}>{embalagem}</Text>
              </Text>
              <Text style={{ color: "#bbb" }}>
                Quantiade Kg/L por embalagem:{" "}
                <Text style={{ color: "#fff" }}>{quantidade}</Text>
              </Text>
            </View> */}
          </>
        )}
      </View>
      <SimpleModal modal={modal} setModal={setModal} modalIndex={0} />
    </View>
  );
};

export default Produto;
