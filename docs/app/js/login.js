/* Página: Entrar (login). Pública. */
(function () {
  'use strict';
  const F = window.Florescer;

  function render() {
    return `
      <section class="hero hero-interno">
        <div class="hero-texto">
          <span class="kicker">Diário Terapêutico Digital</span>
          <h1>Cada criança tem seu tempo.<br>
            Cada conquista <span class="destaque-roxo">merece ser vista.</span></h1>
          <p class="subtitulo">Acompanhe as sessões de terapia com clareza, acolhimento e segurança.</p>
          <img class="login-foto" src="../imagens/banners/sobre-terapia.jpg" alt="Terapeuta e criança brincando durante a sessão">
          <ul class="beneficios">
            <li>Linha do tempo por data e especialidade</li>
            <li>Acesso restrito a quem está vinculado</li>
            <li>Registro da sessão em poucos minutos</li>
          </ul>
        </div>

        <div class="card login-card">
          <h2>Entrar</h2>
          <p class="muted">Use seu e-mail e senha para acessar.</p>
          <form id="form-login" class="form-stack">
            <label>E-mail
              <input type="email" value="mariana@email.com" autocomplete="username">
            </label>
            <label>Senha
              <input type="password" value="demo1234" autocomplete="current-password">
            </label>
            <button class="btn btn-primary btn-bloco" type="submit">Entrar como família</button>
          </form>
          <div class="separador"><span>ou entre como</span></div>
          <button class="btn btn-secundario btn-bloco" data-acao="entrar" data-perfil="terapeuta">Entrar como terapeuta</button>
          <p class="muted" style="text-align:center;margin:18px 0 0">
            <a class="link-sutil" href="fluxo.html">Ver o fluxo do sistema →</a>
          </p>
        </div>
      </section>`;
  }

  F.iniciar({ pagina: 'login', publica: true, render });
})();
