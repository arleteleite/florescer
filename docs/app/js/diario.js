/* Página: Detalhe de um registro da sessão. Recebe o id por ?id=... */
(function () {
  'use strict';
  const F = window.Florescer;
  const { esc, fmtData, crianca, diarioPorId, diariosVisiveis, participacaoHTML } = F;

  function idDaUrl() {
    return new URLSearchParams(location.search).get('id');
  }

  function render() {
    const d = diarioPorId(idDaUrl());
    const visivel = d && diariosVisiveis().includes(d);

    if (!visivel) {
      return `
        <a class="voltar" href="linha-do-tempo.html">← Linha do tempo</a>
        <p class="vazio">Registro não encontrado.</p>`;
    }

    const c = crianca(d.criancaId);

    return `
      <a class="voltar" href="linha-do-tempo.html">← Linha do tempo</a>
      <header class="cabecalho-pagina">
        <p class="kicker">${esc(d.especialidade)} · ${fmtData(d.data)}</p>
        <h1>Sessão de ${esc(c.nome)}</h1>
        <p class="lead">Registrado por ${esc(d.terapeuta)}</p>
      </header>

      <section class="card detalhe">
        <div>
          <h3>Atividades realizadas</h3>
          <ul>${d.atividades.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
        </div>
        <div>
          <h3>Habilidades trabalhadas</h3>
          <div class="chips">${d.habilidades.map((h) => `<span class="chip chip-neutro">${esc(h)}</span>`).join('')}</div>
        </div>
        <div>
          <h3>Participação</h3>
          ${participacaoHTML(d.participacao)}
        </div>
        <div>
          <h3>Observações</h3>
          <p>${esc(d.observacoes)}</p>
        </div>
      </section>`;
  }

  F.iniciar({ pagina: 'linha-do-tempo', perfis: ['responsavel', 'terapeuta'], render });
})();
