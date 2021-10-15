const axios = require("axios");

export async function signIn(cpf, senha) {
  const response = await axios.post(
    "http://192.168.0.110:9903/api/v0/auth/login",
    {
      cpf: cpf,
      senha: senha,
    }
  );
  return response
}

export async function signUp(nome, empresaId, email, rota, telefone, cpf, senha) {
  const response = await axios.post(
    `http://192.168.0.110:9903/api/v0/auth/${rota}`,
    {
      empresaId: empresaId,
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      senha: senha,
    }
  );
  return response
}
