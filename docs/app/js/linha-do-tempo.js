/* Página: Linha do tempo (família e terapeuta). Lista os registros com filtro por especialidade. */
(function () {
  'use strict';
  const F = window.Florescer;
  const { esc, fmtData, crianca, diariosVisiveis, ordenados, COR_ESPECIALIDADE } = F;

  function render() {
    const base = diariosVisiveis();
    const especialidades = [...new Set(base.map((d) => d.especialidade))];
    const filtro = F.estado.filtroEsp;
    const lista = ordenados(base).filter((d) => filtro === 'todas' || d.especialidade === filtro);

    const titulo = F.estado.perfil === 'terapeuta'
      ? 'Diários registrados'
      : `Linha do tempo de ${esc(crianca('lucas').nome)}`;

    const opcoes = ['todas', ...especialidades].map((e) => {
      const rotulo = e === 'todas' ? 'Todas as especialidades' : e;
      return `<option value="${esc(e)}" ${filtro === e ? 'selected' : ''}>${esc(rotulo)}</option>`;
    }).join('');

    const itens = lista.map((d) => {
      const c = crianca(d.criancaId);
      const resumo = d.atividades[0] + (d.atividades.length > 1 ? ` e mais ${d.atividades.length - 1}` : '');
      return `
        <li class="item-tempo">
          <div class="data"><time datetime="${d.data}">${fmtData(d.data)}</time></div>
          <a class="cartao-diario" href="diario.html?id=${d.id}">
            <div class="linha-topo">
              <span class="chip ${COR_ESPECIALIDADE[d.especialidade] || ''}">${esc(d.especialidade)}</span>
              <span class="muted">${esc(d.terapeuta)}</span>
            </div>
            ${F.estado.perfil === 'terapeuta' ? `<strong>${esc(c.nome)}</strong>` : ''}
            <p>${esc(resumo)}</p>
          </a>
        </li>`;
    }).join('');

    return `
      <header class="cabecalho-pagina">
        <p class="kicker" aria-hidden="true">Linha do tempo</p>
        <h1>${titulo}</h1>
        <p class="lead">Registros ordenados do mais recente para o mais antigo.</p>
      </header>

      <div style="margin-bottom:24px">
        <label style="max-width:320px">Filtrar por especialidade
          <select id="filtro-esp" class="select">${opcoes}</select>
        </label>
      </div>

      ${itens
        ? `<ol class="timeline">${itens}</ol>`
        : '<p class="vazio">Nenhum registro para este filtro.</p>'}`;
  }

  document.addEventListener('change', (e) => {
    if (e.target.id === 'filtro-esp') {
      F.estado.filtroEsp = e.target.value;
      F.salvarEstado();
      F.atualizar();
    }
  });

  F.iniciar({ pagina: 'linha-do-tempo', perfis: ['responsavel', 'terapeuta'], render });
})();
