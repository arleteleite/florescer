# PRD – Florescer (MVP)

**Status:** aprovado (exceto itens adiados na seção 10)
**Versão:** 1.0
**Data:** 2026-11-09

---

## 1. Visão geral

O Florescer é um diário terapêutico digital que aproxima famílias de crianças neurodivergentes e os profissionais que as atendem. Ao final de cada sessão, o terapeuta registra o que foi feito. A família consulta esses registros em uma linha do tempo, sem depender de comentários genéricos.

**Tagline:** *Cada criança tem seu tempo. Cada conquista merece ser vista.*

## 2. Problema

Famílias de crianças em terapia recebem respostas vagas ("foi colaborativo", "realizou as atividades propostas") e não sabem quais atividades foram feitas nem o que foi trabalhado. Isso dificulta o acompanhamento e a preparação para conversas com profissionais de saúde e educação.

## 3. Objetivos do MVP

- Dar às famílias acesso claro e contínuo aos registros das sessões.
- Permitir que o terapeuta registre a sessão de forma rápida.
- Proteger os dados sensíveis de saúde das crianças (LGPD desde o início).

**Fora de escopo nesta versão:** ver seção 9.

## 4. Público-alvo e perfis de acesso

| Perfil | Quem é | O que vê | O que faz |
|---|---|---|---|
| **Responsável (família)** | Pai, mãe ou responsável legal cadastrado | Somente a(s) criança(s) vinculada(s) a ele | Consulta a linha do tempo e os diários |
| **Terapeuta** | Profissional de terapia | Somente os pacientes sob seu cuidado | Cria e edita diários de sessão |

Perfil **Clínica** (gestão e painel de resultados) fica para a versão 2.

## 5. Histórias de usuário

**Responsável**
- Como responsável, quero ver a linha do tempo da minha criança por data, para saber o que foi feito em cada sessão.
- Como responsável, quero filtrar os registros por especialidade (ex.: fonoaudiologia), para achar rapidamente a sessão que procuro.
- Como responsável, quero ver os detalhes de um registro (atividades, habilidades, participação, observações), para conversar com outros profissionais.

**Terapeuta**
- Como terapeuta, quero registrar uma sessão ao final do atendimento em menos de 3 minutos, para não sobrecarregar minha rotina.
- Como terapeuta, quero ver apenas os meus pacientes, para respeitar a privacidade das demais crianças.

**Ambos**
- Como usuário, quero fazer login e acessar meu perfil, para ver somente o que me cabe.

## 6. Funcionalidades (MVP)

### 6.1 Login e perfis
- Cadastro e login com e-mail e senha.
- Escolha de perfil no cadastro: responsável ou terapeuta.
- Controle de acesso por perfil, aplicado no servidor e nas regras de dados.

### 6.2 Vínculo criança–responsável–terapeuta
- **Proposta (a confirmar, ver seção 10):** o terapeuta gera um convite com código ou link para a criança. O responsável aceita o convite e confirma sua identidade como responsável legal.
- Um vínculo só fica ativo após aceite do responsável.
- O terapeuta vê apenas as crianças com vínculo ativo com ele.

### 6.3 Diário de sessão (terapeuta)
- Campos: data, especialidade, atividades realizadas, habilidades trabalhadas, participação da criança (escala simples), observações.
- Formulário otimizado para tablet e celular.
- Possibilidade de salvar rascunho antes de concluir.

### 6.4 Linha do tempo (família e terapeuta)
- Registros ordenados por data, do mais recente ao mais antigo.
- Filtro por especialidade e por período.
- Cada item abre o detalhe do diário.

### 6.5 Consentimento e dados sensíveis (LGPD)
- Registro do consentimento do responsável no aceite do vínculo.
- Coleta mínima: somente os dados necessários para o diário.
- Criptografia em trânsito (HTTPS) e em repouso (provedor de nuvem).
- Log de acesso ao registro de cada criança (quem consultou e quando). **Essencial para a LGPD.**

## 7. Requisitos não funcionais

- **Responsivo:** celular (consulta rápida), tablet (preenchimento pelo terapeuta), computador (histórico ampliado).
- **Acessibilidade:** linguagem simples, fontes legíveis, contraste adequado, botões grandes.
- **Desempenho:** a linha do tempo carrega em até 2 segundos com 200 registros.
- **Segurança:** dados sensíveis somente para perfis autorizados; regras de acesso aplicadas no servidor.

## 8. Métricas de sucesso

| Métrica | Meta | Como medir |
|---|---|---|
| Tempo para registrar um diário | Menos de 3 minutos | Teste de uso com terapeuta |
| Achar um registro | Em até 2 toques | Teste de navegação com responsável |
| Acesso indevido | Zero casos | Teste de regras de acesso por perfil |

## 9. Fora de escopo (MVP)

- Painel da clínica e indicadores de resultados (versão 2).
- Gestão administrativa de clínicas e profissionais.
- Notificações push e chat entre família e terapeuta.
- Exportação em PDF dos diários.
- Aplicativo nativo para Android e iOS (a versão 1 é web responsiva).

## 10. Questões em aberto

1. **Vínculo:** **decidido** – link convite aceito pelo responsável (seção 6.2).
2. **Consentimento:** **adiado** – definir texto e fluxo do termo em uma versão futura.
3. **Retenção:** **adiado** – definir o prazo de guarda dos diários em uma versão futura.

*Impacto no MVP:* o item 6.5 (consentimento) fica reduzido a controle de acesso por perfil e log de acesso. O termo formal entra depois.

## 11. Premissas e restrições

- Equipe de 1 a 2 pessoas.
- Prazo de 2 semanas para o MVP.
- Stack a definir no plano de execução (proposta inicial: Firebase Auth + Firestore + Storage, com web responsiva).

## 12. Aprovação

- [x] Escopo do MVP aprovado
- [x] Vínculo (seção 6.2) aprovado – convite por link, aceito pelo responsável
- [x] Consentimento e retenção adiados (seção 10)
