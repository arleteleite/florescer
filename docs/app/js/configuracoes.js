/* Página: Configurações da conta (ambos os perfis). */
(function () {
  'use strict';
  const F = window.Florescer;
  const { esc, iconeCartao } = F;

  function render() {
    const nome = F.estado.perfil === 'terapeuta' ? 'Dra. Ana Ribeiro' : F.estado.nome;
    const perfilNome = F.estado.perfil === 'terapeuta' ? 'Terapeuta' : 'Família';

    return `
      <header class="cabecalho-pagina">
        <p class="kicker">Configurações</p>
        <h1>Sua conta</h1>
      </header>
      <section class="card form-stack" style="max-width:620px">
        ${iconeCartao('tom-verde', 'engrenagem')}
        <p><strong>Nome:</strong> ${esc(nome)}</p>
        <p><strong>Perfil:</strong> ${perfilNome}</p>
        <p class="muted">Notificações, privacidade e termo de consentimento serão definidos em versões futuras (ver PRD, seção 10).</p>
        <div class="acoes">
          <button class="btn btn-secundario" data-acao="sair">Sair da conta</button>
        </div>
      </section>`;
  }

  F.iniciar({ pagina: 'configuracoes', perfis: ['responsavel', 'terapeuta'], render });
})();
