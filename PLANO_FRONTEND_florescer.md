# Plano de execução – Frontend do Florescer (protótipo navegável)

**Objetivo:** publicar no GitHub Pages uma página web navegável que mostre o fluxo do sistema ao professor, com layout, cores e telas de exemplo.
**Base:** `PRD_florescer.md` (v1.0) e `PLANO_EXECUCAO_florescer.md`.
**Escopo desta etapa:** protótipo estático com dados fictícios. Não há login real nem banco de dados.

---

## 1. Decisões

| Área | Decisão | Motivo |
|---|---|---|
| Tecnologia | HTML, CSS e JavaScript puros, sem build | Funciona direto no GitHub Pages, sem instalação |
| Pasta publicada | `docs/` | O GitHub Pages aceita essa pasta sem configuração extra |
| Navegação | Rotas por hash (`#/inicio`, `#/diario/d1`) | Funciona em qualquer hospedagem estática, sem servidor |
| Dados | Mock em JavaScript | Demonstração sem backend |
| Evolução | O app React + Vite do plano de execução começa depois deste protótipo | Esta etapa valida fluxo e visual antes do código de produção |

## 2. Identidade visual

**Estilo:** limpo, moderno e acolhedor. Muito espaço em branco, cartões com bordas suaves e tipografia legível.

### Paleta

| Papel | Nome | Hex | Uso |
|---|---|---|---|
| Primária | Verde-sálvia profundo | `#2F6F5E` | Botões principais, títulos de destaque, indicadores |
| Primária hover | Verde escuro | `#245A4C` | Estado de passagem do mouse |
| Primária suave | Menta claro | `#E3F1EC` | Fundos de destaque e itens ativos do menu |
| Acento | Pêssego | `#F2A36B` | Avatares e detalhes, sem texto sobre ele |
| Acento suave | Pêssego claro | `#FDEBDD` | Chips de especialidade |
| Secundária | Lilás | `#5E4FA8` | Chips e perfil |
| Lilás suave | Lilás claro | `#ECE8F8` | Fundo do chip de perfil |
| Texto | Grafite esverdeado | `#1E2B2A` | Texto principal |
| Texto secundário | Cinza-verde | `#5B6B67` | Legendas e metadados |
| Fundo | Off-white | `#F6F9F8` | Fundo da página |
| Superfície | Branco | `#FFFFFF` | Cartões e menus |
| Borda | Cinza-menta | `#DCE6E2` | Divisórias e contornos |

**Contraste:** o texto principal e o texto secundário atendem ao mínimo de WCAG AA sobre o fundo. Texto branco só sobre o verde primário, nunca sobre o pêssego.

### Tipografia
- Família do sistema (`Segoe UI`, `system-ui`, `Roboto`), para carregar rápido e ter boa legibilidade.
- Títulos com peso 700; texto com 16 px ou mais no celular.

### Componentes
- Cartões com borda de 1 px, raio de 16 px e sombra leve.
- Botões: primário (preenchido), secundário (contorno) e fantasma.
- Chips por especialidade: verde (padrão), pêssego (terapia ocupacional) e lilás (fonoaudiologia).
- Escala de participação com 5 pontos.
- Linha do tempo vertical com data à esquerda.

## 3. Layout e navegação

| Tamanho | Layout |
|---|---|
| Celular (até 859 px) | Coluna única; menu inferior fixo com as opções do perfil |
| Computador (860 px ou mais) | Menu lateral fixo à esquerda; conteúdo à direita |
| Fora do login | Sem menu; página de login em duas colunas no computador |

Cabeçalho fixo com a marca, o perfil ativo, o link para o fluxo do sistema e o botão de sair.

## 4. Telas e rotas

| Rota | Tela | Perfil |
|---|---|---|
| `#/login` | Login e entrada como família ou terapeuta | Pública |
| `#/fluxo` | Fluxo do sistema, passo a passo, com perfis e acessos | Pública |
| `#/convite` | Aceitar convite de vínculo | Família |
| `#/inicio` | Início com a criança vinculada e a última sessão | Família |
| `#/linha-do-tempo` | Registros por data, com filtro por especialidade | Família e terapeuta |
| `#/diario/:id` | Detalhe de um registro | Família e terapeuta |
| `#/criancas` | Lista de crianças e geração do link de convite | Terapeuta |
| `#/novo-diario` | Formulário de registro da sessão | Terapeuta |
| `#/configuracoes` | Conta e sair | Família e terapeuta |

O acesso é controlado pelo perfil: uma rota de outro perfil redireciona para a tela inicial correta.

## 5. Estrutura de arquivos

```
docs/
├── index.html   estrutura da página (cabeçalho, menu, área de conteúdo, toast)
├── styles.css   paleta, layout e componentes
└── app.js       rotas por hash, telas, dados fictícios e interações
```

## 6. Cronograma

| Dia | Tarefa | Entrega |
|---|---|---|
| 1 | Paleta, tipografia e estrutura da página | `index.html` e `styles.css` base |
| 2 | Login, menu por perfil e rotas | Navegação entre perfis funcionando |
| 3 | Início, linha do tempo e detalhe do diário | Fluxo da família completo |
| 4 | Novo diário, crianças e convite | Fluxo do terapeuta completo |
| 5 | Página de fluxo do sistema e revisão de texto | Tela explicativa para o professor |
| 6 | Ajustes de responsividade e acessibilidade | Teste em celular, tablet e computador |
| 7 | Publicação no GitHub Pages e revisão final | Link público funcionando |

Como o protótipo é pequeno, os dias 1 a 5 podem caber em um único dia de trabalho focado.

## 7. Publicação no GitHub Pages

1. Criar o repositório no GitHub (ex.: `florescer`).
2. Enviar a pasta do projeto para o repositório.
3. No GitHub: **Settings → Pages → Build and deployment**.
4. Em **Source**, escolher **Deploy from a branch**; em **Branch**, escolher `main` e a pasta `/docs`.
5. Aguardar alguns minutos; o link fica no formato `https://<usuario>.github.io/florescer/`.

## 8. Critérios de aceite

- [ ] Página abre sem erros no console
- [ ] Entrada como família e como terapeuta funciona
- [ ] Cada perfil vê só as telas permitidas
- [ ] Linha do tempo filtra por especialidade
- [ ] Detalhe do diário mostra atividades, habilidades, participação e observações
- [ ] Formulário do terapeuta mostra confirmação ao salvar
- [ ] Convite pode ser gerado e aceito
- [ ] Layout funciona em celular e computador, sem rolagem horizontal
- [ ] Textos em português, sem termos técnicos na interface

## 9. Pendências

1. Confirmar a paleta (seção 2). Ela fica em um único bloco de variáveis no `styles.css`, então trocar as cores é rápido.
2. Confirmar o nome do repositório e se o professor deve acessar pelo link público.
3. Decidir se o link do GitHub Pages vai no PDF da atividade.
