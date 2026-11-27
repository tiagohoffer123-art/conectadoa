// Pequenas funções de interface usadas por todas as telas
export function mensagem(elemento, texto, tipo = "erro") {
  elemento.textContent = texto;
  elemento.className = `mensagem ${tipo}`;
  elemento.hidden = !texto;
}

// Cria uma célula de tabela com textContent (protege contra XSS)
export function celula(linha, texto) {
  const td = document.createElement("td");
  td.textContent = texto ?? "";
  linha.append(td);
  return td;
}
