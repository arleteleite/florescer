/* Página: Novo diário (terapeuta). Formulário de registro da sessão. */
(function () {
  'use strict';
  const F = window.Florescer;

  function render() {
    const opcoesCriancas = F.DADOS.criancas
      .map((c) => `<option value="${c.id}">${F.esc(c.nome)} (${c.idade} anos)</option>`).join('');
    const opcoesEsp = F.ESPECIALIDADES.map((e) => `<option>${F.esc(e)}</option>`).join('');

    return `
      <header class="cabecalho-pagina">
        <p class="kicker" aria-hidden="true">Novo diário</p>
        <h1>Registrar sessão</h1>
        <p class="lead">Preencha ao final do atendimento. Leva cerca de 3 minutos.</p>
      </header>

      <form id="form-diario" class="card form-grid">
        <label>Criança
          <select>${opcoesCriancas}</select>
        </label>
        <label>Data
          <input type="date" value="2026-11-09">
        </label>
        <label>Especialidade
          <select>${opcoesEsp}</select>
        </label>
        <label>Participação
          <span class="escala">
            <input id="participacao" type="range" min="1" max="5" value="4">
            <output id="participacao-valor">4</output>
            <span class="muted">de 5</span>
          </span>
        </label>
        <label class="span-2">Atividades realizadas
          <textarea rows="3" placeholder="Ex.: nomeação de figuras, jogo de sopro"></textarea>
        </label>
        <label class="span-2">Habilidades trabalhadas
          <textarea rows="2" placeholder="Ex.: articulação do fonema /r/"></textarea>
        </label>
        <label class="span-2">Observações
          <textarea rows="3" placeholder="Pontos relevantes da sessão"></textarea>
        </label>
        <div class="acoes span-2">
          <button type="button" class="btn btn-secundario" data-acao="rascunho">Salvar rascunho</button>
          <button class="btn btn-primary" type="submit">Concluir registro</button>
        </div>
      </form>`;
  }

  document.addEventListener('input', (e) => {
    if (e.target.id === 'participacao') {
      document.getElementById('participacao-valor').textContent = e.target.value;
    }
  });

  F.iniciar({ pagina: 'novo-diario', perfis: ['terapeuta'], render });
})();
