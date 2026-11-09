/*
 * Florescer – código comum às páginas internas.
 * Responsabilidades: estado da sessão, dados fictícios, cabeçalho, rodapé,
 * controle de acesso por perfil, ações compartilhadas e utilitários.
 * Cada página declara suas próprias regras em <pagina>.js.
 */
(function () {
  'use strict';

  /* ===== Estado da sessão (sessionStorage) ===== */
  const CHAVE_ESTADO = 'florescer.estado';
  const CHAVE_AVISO = 'florescer.aviso';

  const PADRAO = {
    perfil: null,
    nome: 'Mariana',
    filtroEsp: 'todas',
    vinculoAceito: false,
    convites: {}
  };

  function lerEstado() {
    try {
      return Object.assign({}, PADRAO, JSON.parse(sessionStorage.getItem(CHAVE_ESTADO)) || {});
    } catch (e) {
      return Object.assign({}, PADRAO);
    }
  }

  function salvarEstado() {
    try { sessionStorage.setItem(CHAVE_ESTADO, JSON.stringify(estado)); } catch (e) { /* segue em memória */ }
  }

  function avisarProximaPagina(msg) {
    try { sessionStorage.setItem(CHAVE_AVISO, msg); } catch (e) { /* sem aviso */ }
  }

  function lerAviso() {
    try {
      const msg = sessionStorage.getItem(CHAVE_AVISO);
      sessionStorage.removeItem(CHAVE_AVISO);
      return msg;
    } catch (e) {
      return null;
    }
  }

  const estado = lerEstado();

  /* ===== Dados fictícios ===== */
  const HOME = { responsavel: 'inicio.html', terapeuta: 'criancas.html' };
  const NOMES = { responsavel: 'Família', terapeuta: 'Terapeuta' };
  const ESPECIALIDADES = ['Fonoaudiologia', 'Terapia Ocupacional'];
  const COR_ESPECIALIDADE = { 'Fonoaudiologia': 'chip-lilas', 'Terapia Ocupacional': 'chip-pessego' };

  const MENUS = {
    responsavel: [
      { pagina: 'inicio', label: 'Início' },
      { pagina: 'linha-do-tempo', label: 'Linha do tempo' },
      { pagina: 'convite', label: 'Aceitar convite' },
      { pagina: 'configuracoes', label: 'Configurações' }
    ],
    terapeuta: [
      { pagina: 'criancas', label: 'Crianças' },
      { pagina: 'novo-diario', label: 'Novo diário' },
      { pagina: 'linha-do-tempo', label: 'Diários' },
      { pagina: 'configuracoes', label: 'Configurações' }
    ]
  };

  const DADOS = {
    criancas: [
      { id: 'lucas', nome: 'Lucas', idade: 7 },
      { id: 'helena', nome: 'Helena', idade: 5 }
    ],
    diarios: [
      {
        id: 'd1', criancaId: 'lucas', data: '2026-11-06',
        especialidade: 'Fonoaudiologia', terapeuta: 'Dra. Ana Ribeiro',
        atividades: ['Nomeação de figuras', 'Jogo de sopro com cata-vento'],
        habilidades: ['Articulação do fonema /r/', 'Atenção sustentada'],
        participacao: 4,
        observacoes: 'Lucas se engajou bem no jogo de sopro e pediu para repetir a atividade.'
      },
      {
        id: 'd2', criancaId: 'lucas', data: '2026-11-04',
        especialidade: 'Terapia Ocupacional', terapeuta: 'Bruno Mendes',
        atividades: ['Encaixe de peças', 'Organização de material'],
        habilidades: ['Coordenação motora fina', 'Sequência de tarefas'],
        participacao: 3,
        observacoes: 'Precisou de apoio visual para concluir a sequência e evoluiu no final da sessão.'
      },
      {
        id: 'd3', criancaId: 'helena', data: '2026-11-05',
        especialidade: 'Fonoaudiologia', terapeuta: 'Dra. Ana Ribeiro',
        atividades: ['Imitação de sons', 'Leitura de imagens'],
        habilidades: ['Imitação de sons de animais', 'Vocabulário'],
        participacao: 5,
        observacoes: 'Helena participou de todas as atividades propostas e ampliou o vocabulário.'
      }
    ]
  };

  const ICONES = {
    pessoas: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3 3-5 6-5s5.4 2 6 5"/><circle cx="16.5" cy="9" r="2.5"/><path d="M16 14c2.4 0 4.2 1.5 4.8 4"/></svg>',
    estrela: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.8 19.5l1-5.8-4.2-4.1 5.8-.8z" stroke-linejoin="round"/></svg>',
    calendario: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    escudo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.9-7 9.8-4.1-1.9-7-5.5-7-9.8V5.8z" stroke-linejoin="round"/><rect x="9.5" y="11" width="5" height="4.5" rx="1"/><path d="M10.5 11V9.5a1.5 1.5 0 0 1 3 0V11"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    engrenagem: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/></svg>'
  };

  const LOGO = `
    <svg class="marca-icone" viewBox="0 0 64 64" aria-hidden="true">
      <g transform="translate(32 30)">
        <ellipse cx="0" cy="-14" rx="7" ry="13" fill="#F4B6C2"/>
        <ellipse cx="0" cy="-14" rx="7" ry="13" fill="#F7D59A" transform="rotate(-50)"/>
        <ellipse cx="0" cy="-14" rx="7" ry="13" fill="#C9B3E6" transform="rotate(50)"/>
        <ellipse cx="0" cy="-14" rx="7" ry="13" fill="#9CCBE6" transform="rotate(-100)"/>
        <ellipse cx="0" cy="-14" rx="7" ry="13" fill="#A8D5BA" transform="rotate(100)"/>
      </g>
      <path d="M32 46 C 22 50, 12 46, 6 36 C 16 34, 26 38, 32 46 Z" fill="#9CCBE6"/>
      <path d="M32 46 C 42 50, 52 46, 58 36 C 48 34, 38 38, 32 46 Z" fill="#A8D5BA"/>
    </svg>`;

  const RODAPE = `
    <footer class="rodape">
      <p>Florescer · Protótipo de demonstração · dados fictícios · <a href="../index.html">Voltar ao site</a></p>
    </footer>`;

  /* ===== Utilitários ===== */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const fmtData = (iso) => new Date(iso + 'T12:00:00')
    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

  const crianca = (id) => DADOS.criancas.find((c) => c.id === id);
  const diarioPorId = (id) => DADOS.diarios.find((d) => d.id === id);

  const diariosVisiveis = () => {
    if (estado.perfil === 'terapeuta') return DADOS.diarios;
    if (estado.perfil === 'responsavel' && estado.vinculoAceito) {
      return DADOS.diarios.filter((d) => d.criancaId === 'lucas');
    }
    return [];
  };

  const ordenados = (lista) => [...lista].sort((a, b) => (a.data < b.data ? 1 : -1));
  const gerarToken = () => Math.random().toString(36).slice(2, 10);
  const iconeCartao = (tom, nome) => `<div class="cartao-icone ${tom}">${ICONES[nome]}</div>`;

  const participacaoHTML = (n) => {
    const pontos = [1, 2, 3, 4, 5]
      .map((i) => `<span class="ponto ${i <= n ? 'cheio' : ''}"></span>`)
      .join('');
    return `<div class="escala" role="img" aria-label="Participação ${n} de 5">${pontos}<span class="muted">${n} de 5</span></div>`;
  };

  let toastTimer;
  function mostrarToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visivel');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('visivel'), 2800);
  }

  /* ===== Cabeçalho e rodapé ===== */
  function montarCabecalho(pagina) {
    const logado = Boolean(estado.perfil);
    const menu = logado
      ? MENUS[estado.perfil].map((m) => {
          const ativo = m.pagina === pagina;
          return `<a href="${m.pagina}.html" class="${ativo ? 'ativo' : ''}"${ativo ? ' aria-current="page"' : ''}>${m.label}</a>`;
        }).join('')
      : '';

    document.getElementById('cabecalho').innerHTML = `
      <header class="site-header">
        <a href="../index.html" class="marca" aria-label="Florescer, voltar ao site">
          ${LOGO}
          <span class="marca-texto">Florescer</span>
        </a>
        <nav id="nav" class="menu" aria-label="Menu principal" ${logado ? '' : 'hidden'}>${menu}</nav>
        <div class="acoes-topo">
          <span class="badge" ${logado ? '' : 'hidden'}>${logado ? NOMES[estado.perfil] : ''}</span>
          <a class="link-topo" href="fluxo.html">Fluxo do sistema</a>
          <button class="btn btn-contorno" data-acao="sair" ${logado ? '' : 'hidden'}>Sair</button>
        </div>
      </header>`;

    document.getElementById('rodape').innerHTML = RODAPE;
  }

  /* ===== Controle de acesso e render ===== */
  let renderAtual = null;

  function atualizar() {
    document.getElementById('conteudo').innerHTML = renderAtual();
    window.scrollTo(0, 0);
  }

  /**
   * Inicializa uma página interna.
   * @param {Object}   opts
   * @param {string}   opts.pagina   nome da página (usado para destacar o menu)
   * @param {boolean}  [opts.publica] true para páginas acessíveis sem login
   * @param {string[]} [opts.perfis]  perfis permitidos (ignorado se publica)
   * @param {Function} opts.render   função que devolve o HTML do conteúdo
   */
  function iniciar(opts) {
    if (!opts.publica) {
      if (!estado.perfil) { location.replace('login.html'); return; }
      if (!opts.perfis.includes(estado.perfil)) { location.replace(HOME[estado.perfil]); return; }
    }

    montarCabecalho(opts.pagina);
    renderAtual = opts.render;
    atualizar();

    const aviso = lerAviso();
    if (aviso) mostrarToast(aviso);
  }

  /* ===== Ações compartilhadas ===== */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-acao]');
    if (!el) return;

    switch (el.dataset.acao) {
      case 'entrar':
        estado.perfil = el.dataset.perfil;
        salvarEstado();
        location.href = HOME[estado.perfil];
        break;
      case 'sair':
        estado.perfil = null;
        salvarEstado();
        location.href = 'login.html';
        break;
      case 'convite-aceitar':
        estado.vinculoAceito = true;
        salvarEstado();
        avisarProximaPagina('Vínculo criado. Lucas agora aparece no seu início.');
        location.href = 'inicio.html';
        break;
      case 'gerar-convite':
        estado.convites[el.dataset.crianca] = gerarToken();
        salvarEstado();
        mostrarToast('Link de convite gerado.');
        atualizar();
        break;
      case 'rascunho':
        mostrarToast('Rascunho salvo.');
        break;
    }
  });

  document.addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id === 'form-login') {
      estado.perfil = 'responsavel';
      salvarEstado();
      location.href = HOME.responsavel;
    }

    if (e.target.id === 'form-diario') {
      avisarProximaPagina('Diário concluído e salvo.');
      location.href = 'linha-do-tempo.html';
    }
  });

  /* ===== API pública ===== */
  window.Florescer = {
    estado,
    salvarEstado,
    DADOS,
    ESPECIALIDADES,
    COR_ESPECIALIDADE,
    ICONES,
    HOME,
    iniciar,
    atualizar,
    esc,
    fmtData,
    crianca,
    diarioPorId,
    diariosVisiveis,
    ordenados,
    gerarToken,
    iconeCartao,
    participacaoHTML,
    mostrarToast
  };
})();
