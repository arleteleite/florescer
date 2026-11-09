/* Página: Aceitar convite (família). Confirma o vínculo com a criança. */
(function () {
  'use strict';
  const F = window.Florescer;
  const { iconeCartao } = F;

  function render() {
    if (F.estado.vinculoAceito) {
      return `
        <section class="card convite-card">
          ${iconeCartao('tom-verde', 'escudo')}
          <p class="kicker">Convite</p>
          <h1>Convite aceito</h1>
          <p class="lead">Lucas já está vinculado à sua conta.</p>
          <div class="acoes"><a class="btn btn-primary" href="inicio.html">Ir para o início</a></div>
        </section>`;
    }

    return `
      <section class="card convite-card">
        ${iconeCartao('tom-lilas', 'link')}
        <p class="kicker">Convite recebido</p>
        <h1>Acompanhe as sessões de Lucas</h1>
        <p class="lead"><strong>Dra. Ana Ribeiro</strong> (Fonoaudiologia) convidou você para acompanhar o diário terapêutico de Lucas, de 7 anos.</p>
        <ul class="lista-simples">
          <li>Você verá somente os registros de Lucas.</li>
          <li>O convite vale por 48 horas e pode ser usado uma única vez.</li>
        </ul>
        <div class="acoes">
          <a class="btn btn-secundario" href="inicio.html">Agora não</a>
          <button class="btn btn-primary" data-acao="convite-aceitar">Aceitar convite</button>
        </div>
      </section>`;
  }

  F.iniciar({ pagina: 'convite', perfis: ['responsavel'], render });
})();
