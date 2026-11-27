// Todas as chamadas à API passam por aqui
async function requisicao(metodo, url, corpo) {
  const opcoes = { method: metodo, headers: {} };
  if (corpo) {
    opcoes.headers["Content-Type"] = "application/json";
    opcoes.body = JSON.stringify(corpo);
  }

  const resposta = await fetch(url, opcoes);
  if (resposta.status === 204) return null;
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro || `Erro ${resposta.status}`);
  return dados;
}

export const listarDoadores = () => requisicao("GET", "/api/doadores");
export const cadastrarDoador = (doador) => requisicao("POST", "/api/doadores", doador);
export const editarDoador = (id, doador) => requisicao("PUT", `/api/doadores/${id}`, doador);
export const excluirDoador = (id) => requisicao("DELETE", `/api/doadores/${id}`);
export const listarItens = () => requisicao("GET", "/api/itens");
export const listarDoacoes = () => requisicao("GET", "/api/doacoes");
export const registrarDoacao = (doacao) => requisicao("POST", "/api/doacoes", doacao);
