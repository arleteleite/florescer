/* Página: Crianças e convites (terapeuta). Gera o link de convite para a família. */
(function () {
  'use strict';
  const F = window.Florescer;
  const { esc, iconeCartao } = F;

  function render() {
    return `
      <header class="cabecalho-pagina">
        <p class="kicker" aria-hidden="true">Crianças</p>
        <h1>Suas crianças</h1>
        <p class="lead">Gere um link de convite para a família. O link tem validade de 48 horas e uso único.</p>
      </header>

      <section class="grid-cards">
        ${F.DADOS.criancas.map((c) => {
          const token = F.estado.convites[c.id];
          return `
            <article class="card">
              ${iconeCartao('tom-verde', 'pessoas')}
              <div class="linha-topo">
                <h2>${esc(c.nome)}</h2>
                <span class="chip">Vínculo ativo</span>
              </div>
              <p class="muted">${c.idade} anos</p>
              ${token ? `
                <div class="convite">
                  <span class="muted">Link de convite</span>
                  <code>convite.html?token=${esc(token)}</code>
                </div>` : ''}
              <button class="btn btn-secundario" data-acao="gerar-convite" data-crianca="${c.id}">
                ${token ? 'Gerar novo link' : 'Gerar link de convite'}
              </button>
            </article>`;
        }).join('')}
      </section>`;
  }

  F.iniciar({ pagina: 'criancas', perfis: ['terapeuta'], render });
})();
