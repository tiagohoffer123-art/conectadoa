import "./style.css";
import { telaDoacoes } from "./pages/doacoes.js";
import { telaDoadores } from "./pages/doadores.js";

const app = document.querySelector("#app");

function mostrarApp() {
  app.innerHTML = `
    <header class="topo">
      <strong>ConectaDoa</strong>
      <nav>
        <button data-tela="doadores">Doadores</button>
        <button data-tela="doacoes">Doações</button>
      </nav>
    </header>
    <div id="conteudo"></div>
  `;
  const conteudo = app.querySelector("#conteudo");
  const telas = { doadores: telaDoadores, doacoes: telaDoacoes };
  for (const botao of app.querySelectorAll("nav button")) {
    botao.onclick = () => telas[botao.dataset.tela](conteudo);
  }
  telaDoadores(conteudo);
}

mostrarApp();
