# Plano de execução – Florescer (MVP)

**Base:** `PRD_florescer.md` v1.0 (aprovado)
**Equipe:** 1 a 2 pessoas
**Prazo:** 2 semanas (10 dias úteis)
**Data de início:** a definir

---

## 1. Decisões técnicas

| Área | Escolha | Motivo |
|---|---|---|
| Front-end | React + TypeScript + Vite | Web responsivo; uma base para celular, tablet e computador |
| Estilo | CSS com variáveis (ou Tailwind) | Paleta suave e acessível em um só lugar |
| Autenticação | Firebase Authentication (e-mail e senha) | Login pronto e seguro, sem servidor próprio |
| Banco | Cloud Firestore | Dados em tempo real; regras de acesso por documento |
| Regras de acesso | Firestore Security Rules | Controle por perfil no servidor, não só na tela |
| Convite | Cloud Functions (aceite do convite) | Aceite seguro, com validação de token e expiração |
| Hospedagem | Firebase Hosting | HTTPS nativo, deploy simples |

**Pontos a confirmar antes do Dia 1:**
- **Cloud Functions** exigem o plano Blaze do Firebase (cobrança por uso). Para o volume de um MVP, o custo tende a ser baixo, mas precisa ser aprovado pela equipe. Alternativa sem Functions: aceitar o convite direto no cliente, com regra do Firestore que valida o token. É menos robusta.
- **Log de acesso:** gravar no cliente pode ser contornado. Para o MVP, grava-se no cliente e registra-se a limitação. Se houver Functions, o log passa para o servidor.

## 2. Modelo de dados (Firestore)

```
usuarios/{uid}
  nome, email, perfil ("responsavel" | "terapeuta"), criadoEm

criancas/{criancaId}
  nome, dataNascimento, criadoPor (uid do terapeuta ou responsável)

vinculos/{vinculoId}
  criancaId, responsavelUid, terapeutaUid, especialidade, ativo, aceitoEm

convites/{token}
  criancaId, criadoPor (uid), perfilAlvo ("responsavel"), expiraEm, usado (bool)

diarios/{diarioId}
  criancaId, terapeutaUid, especialidade, data,
  atividades[], habilidades[], participacao (1 a 5), observacoes,
  status ("rascunho" | "concluido"), criadoEm, atualizadoEm

acessos/{acessoId}   (log de acesso – MVP)
  uid, criancaId, acao, em
```

**Regra central:** um usuário só lê uma criança ou diário se existir `vinculos` com `ativo = true` que o ligue a ele.

## 3. Estrutura de telas (web responsivo)

| # | Tela | Perfil | Observação |
|---|---|---|---|
| 1 | Login / cadastro | Todos | Escolha de perfil no cadastro |
| 2 | Aceitar convite | Responsável | Abre pelo link; mostra a criança e o terapeuta |
| 3 | Início | Responsável | Lista de crianças vinculadas |
| 4 | Linha do tempo | Responsável e terapeuta | Filtros por especialidade e período |
| 5 | Detalhe do diário | Responsável e terapeuta | Somente leitura para o responsável |
| 6 | Novo diário | Terapeuta | Formulário; salva rascunho |
| 7 | Crianças e convites | Terapeuta | Gera o link de convite |
| 8 | Configurações | Todos | Dados do perfil e sair |

## 4. Cronograma

### Semana 1 – Base e fundação

**Dia 1 – Preparação**
- Criar projeto no Firebase (Auth, Firestore, Hosting; Functions se aprovado).
- Criar repositório, projeto Vite com React e TypeScript.
- Definir paleta, fontes e componentes básicos (botão, campo, cartão).
- *Entrega:* app vazio publicado no Hosting.

**Dia 2 – Dados e segurança**
- Implementar o modelo de dados da seção 2.
- Escrever as regras do Firestore.
- Testar as regras com o emulador (acesso permitido e negado para cada perfil).
- *Entrega:* testes de regras passando.

**Dia 3 – Login e perfis**
- Tela de cadastro (com escolha de perfil) e login.
- Proteção de rotas por perfil.
- *Entrega:* login funcionando nos dois perfis.

**Dia 4 – Convite e vínculo**
- Terapeuta cadastra a criança e gera o link de convite (com validade e uso único).
- Tela de aceite para o responsável; cria o vínculo ativo.
- *Entrega:* convite gerado, aceito e vínculo visível nos dois lados.

**Dia 5 – Diário de sessão**
- Formulário do terapeuta: data, especialidade, atividades, habilidades, participação, observações.
- Salvar rascunho e concluir.
- *Entrega:* diário salvo no Firestore.

### Semana 2 – Experiência e entrega

**Dia 6 – Linha do tempo**
- Lista de diários por data, com filtro por especialidade e período.
- Responsável vê só a criança vinculada; terapeuta vê só os seus pacientes.
- *Entrega:* linha do tempo nos dois perfis.

**Dia 7 – Detalhe e responsividade**
- Tela de detalhe do diário (somente leitura para o responsável).
- Ajustar layout para celular, tablet e computador.
- *Entrega:* telas testadas nos três tamanhos.

**Dia 8 – Acessibilidade e log de acesso**
- Revisar contraste, tamanhos de fonte, foco do teclado e textos simples.
- Registrar log de acesso aos diários.
- Testar acesso indevido (ex.: responsável tentando abrir outra criança).
- *Entrega:* checklist de acessibilidade e testes de acesso concluídos.

**Dia 9 – Testes com usuários**
- Testar com 2 a 3 pessoas: um terapeuta registra um diário e um responsável acha um registro.
- Medir: registro em menos de 3 minutos; achar registro em até 2 toques.
- Corrigir o que for mais crítico.
- *Entrega:* relatório curto com resultados.

**Dia 10 – Publicação e entrega**
- Deploy final no Firebase Hosting.
- README com instruções de execução e decisões técnicas.
- Demonstração de ponta a ponta.
- *Entrega:* link público e documentação.

## 5. Critérios de aceite do MVP

- [ ] Login e cadastro nos dois perfis
- [ ] Convite por link, com validade e uso único, aceito pelo responsável
- [ ] Responsável vê somente a criança vinculada
- [ ] Terapeuta vê somente os seus pacientes
- [ ] Diário criado, salvo como rascunho e concluído
- [ ] Linha do tempo com filtros por especialidade e período
- [ ] Layout funciona em celular, tablet e computador
- [ ] Teste de acesso indevido sem falhas
- [ ] Métricas de sucesso medidas (seção 8 do PRD)

## 6. Riscos e plano B

| Risco | Impacto | Ação |
|---|---|---|
| Prazo de 2 semanas apertado | Alto | Cortar primeiro: filtro por período, depois acessibilidade avançada. Manter login, vínculo e diário. |
| Cloud Functions não aprovadas | Médio | Aceitar convite no cliente com regra do Firestore (menos robusto). |
| Regras de acesso com falha | Alto | Testes automatizados no Dia 2 e no Dia 8. |
| Pouco tempo para testes com usuários | Médio | Usar colegas e familiares como participantes simulados. |

## 7. Fora do escopo

Conforme o PRD, seção 9: painel da clínica, chat, notificações, exportação em PDF e aplicativo nativo.

## 8. Pendências para começar

1. Aprovar o plano de Cloud Functions (plano Blaze) ou optar pela alternativa sem Functions.
2. Confirmar a data de início e a divisão de tarefas entre as duas pessoas.
3. Confirmar que o stack da seção 1 está de acordo.
