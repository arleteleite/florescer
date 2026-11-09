/* Página: Início da família. Mostra a criança vinculada e o resumo das sessões. */
(function () {
  'use strict';
  const F = window.Florescer;
  const { esc, fmtData, crianca, diariosVisiveis, ordenados, iconeCartao } = F;

  function render() {
    const estado = F.estado;

    if (!estado.vinculoAceito) {
      return `
        <header class="cabecalho-pagina">
          <p class="kicker" aria-hidden="true">Início</p>
          <h1>Olá, ${esc(estado.nome)}</h1>
        </header>
        <section class="card" style="max-width:620px">
          ${iconeCartao('tom-lilas', 'link')}
          <h2>Nenhuma criança vinculada ainda</h2>
          <p class="muted" style="margin:8px 0 0">Aceite o convite recebido da terapeuta para acompanhar as sessões.</p>
          <div class="acoes"><a class="btn btn-primary" href="convite.html">Ver convite</a></div>
        </section>`;
    }

    const c = crianca('lucas');
    const lista = ordenados(diariosVisiveis());
    const ultimo = lista[0];
    const profissionais = [...new Set(lista.map((d) => d.terapeuta))];

    return `
      <header class="cabecalho-pagina">
        <p class="kicker" aria-hidden="true">Início</p>
        <h1>Olá, ${esc(estado.nome)}</h1>
        <p class="lead">Acompanhe a rotina terapêutica de ${esc(c.nome)}.</p>
      </header>

      <section class="grid-cards">
        <article class="card destaque">
          ${iconeCartao('tom-verde', 'pessoas')}
          <h2>${esc(c.nome)}</h2>
          <p class="muted">${c.idade} anos · vínculo ativo</p>
          <div class="chips">
            ${profissionais.map((p) => `<span class="chip chip-neutro">${esc(p)}</span>`).join('')}
          </div>
          <a class="btn btn-primary" href="linha-do-tempo.html">Ver linha do tempo</a>
        </article>

        <article class="card">
          ${iconeCartao('tom-pessego', 'estrela')}
          <h3>Última sessão</h3>
          <p class="muted"><time datetime="${ultimo.data}">${fmtData(ultimo.data)}</time> · ${esc(ultimo.especialidade)}</p>
          <p style="margin:10px 0 14px">${esc(ultimo.observacoes)}</p>
          <a class="link-sutil" href="diario.html?id=${ultimo.id}">Ver detalhes →</a>
        </article>

        <article class="card">
          ${iconeCartao('tom-lilas', 'calendario')}
          <h3>Registros de sessões</h3>
          <p class="numero">${lista.length}</p>
          <p class="muted">desde o início do acompanhamento</p>
        </article>
      </section>`;
  }

  F.iniciar({ pagina: 'inicio', perfis: ['responsavel'], render });
})();
