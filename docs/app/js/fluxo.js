/* Página: Fluxo do sistema. Pública. Explica o processo para o professor. */
(function () {
  'use strict';
  const F = window.Florescer;
  const { esc } = F;

  const PASSOS = [
    { titulo: 'Terapeuta cadastra a criança', texto: 'Cria o perfil da criança e registra a especialidade do atendimento.', href: 'criancas.html', perfil: 'Terapeuta' },
    { titulo: 'Terapeuta gera o link de convite', texto: 'O link tem validade de 48 horas e pode ser usado uma única vez.', href: 'criancas.html', perfil: 'Terapeuta' },
    { titulo: 'Família aceita o convite', texto: 'Abre o link, confere a criança e o profissional e confirma o vínculo.', href: 'convite.html', perfil: 'Família' },
    { titulo: 'Vínculo fica ativo', texto: 'Cada perfil passa a ver somente o que lhe cabe.', href: 'inicio.html', perfil: 'Família' },
    { titulo: 'Terapeuta registra a sessão', texto: 'Atividades, habilidades, participação e observações ao final do atendimento.', href: 'novo-diario.html', perfil: 'Terapeuta' },
    { titulo: 'Família consulta a linha do tempo', texto: 'Registros por data e especialidade, com o detalhe de cada sessão.', href: 'linha-do-tempo.html', perfil: 'Família' }
  ];

  const PERFIS = [
    ['Família', 'Registros da criança vinculada; detalhes das sessões', 'Aceitar convite; consultar linha do tempo'],
    ['Terapeuta', 'Seus pacientes; todos os diários que registrou', 'Cadastrar criança; gerar convite; registrar sessão']
  ];

  function render() {
    return `
      <header class="cabecalho-pagina">
        <p class="kicker">Visão geral</p>
        <h1>Como o Florescer funciona</h1>
        <p class="lead">Seis passos, do cadastro ao acompanhamento da família. Use os links para abrir cada tela.</p>
      </header>

      <ol class="passos">
        ${PASSOS.map((p, i) => `
          <li class="passo">
            <div class="passo-num" aria-hidden="true">${i + 1}</div>
            <div>
              <h3>${esc(p.titulo)}</h3>
              <p>${esc(p.texto)}</p>
              <div class="passo-rodape">
                <span class="chip ${p.perfil === 'Terapeuta' ? 'chip-pessego' : 'chip-lilas'}">${p.perfil}</span>
                <a class="link-sutil" href="${p.href}">Ver tela →</a>
              </div>
            </div>
          </li>`).join('')}
      </ol>

      <section style="margin-top:36px">
        <h2 style="margin-bottom:14px">Perfis e acessos</h2>
        <div class="tabela-wrap">
          <table class="tabela">
            <caption class="sr-only">Perfis, o que cada um vê e o que cada um faz</caption><thead><tr><th scope="col">Perfil</th><th scope="col">Vê</th><th scope="col">Faz</th></tr></thead>
            <tbody>
              ${PERFIS.map((l) => `<tr>${l.map((c, i) => `<td data-label="${['Perfil', 'Vê', 'Faz'][i]}">${esc(c)}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
        <p class="muted" style="margin-top:12px">A clínica (gestão e painel de resultados) fica para a versão 2.</p>
      </section>`;
  }

  F.iniciar({ pagina: 'fluxo', publica: true, render });
})();
