# Contexto do projeto — Sono & Conforto

## 1. Escopo e evidências
Documentação da versão de código disponibilizada, baseada nos arquivos locais. O site é um catálogo fictício de colchões, identificado pelos títulos, descrições, quatro cartões de produtos e aviso no rodapé. A área administrativa gerencia registros de usuários fictícios. O cadastro público e o login são interfaces demonstrativas, não serviços de autenticação. A publicação e a validação oficial não foram verificadas.

## 2. Inventário
```text
sono-conforto/
├── index.html
├── cadastro.html
├── login.html
├── admin.html
├── curriculo.html
├── css/
│   └── style.css
├── js/
│   └── admin.js
├── img/
│   ├── banner.svg
│   ├── solteiro.svg
│   ├── casal.svg
│   ├── queen.svg
│   ├── king.svg
│   ├── moon.svg
│   ├── check.svg
│   └── contact.svg
├── README.md
└── CONTEXTO_PROJETO.md
```
Cinco documentos HTML, uma folha CSS, um script JS, oito SVG e dois arquivos Markdown. Não há backend, dependências de pacotes ou arquivos de configuração.

## 3. Visão geral, telas e responsabilidades
| Arquivo | Conteúdo e funcionamento |
|---|---|
| index.html | Cabeçalho, menu, banner, diferenciais, catálogo com quatro categorias, oferta ilustrativa, seções sobre e contato (e-mail fictício), rodapé e currículo. Links internos levam às seções e páginas. |
| cadastro.html | Formulário `cadastro-form` com nome, e-mail, telefone, nascimento e senha; validações HTML e destino `login.html`. Campos não possuem `name`, evitando serialização. |
| login.html | Campos e-mail e senha; formulário demonstra navegação para o início sem autenticar. |
| admin.html | Formulário `admin-form`, busca `pesquisa`, lista `lista-usuarios`, mensagens e botões de limpar e excluir. Única página que importa `js/admin.js`. |
| curriculo.html | Currículo profissional do desenvolvedor, com formação, experiências, competências, cursos, certificações e idiomas; versão pública sem telefone e e-mail pessoais. |
| css/style.css | Identidade visual, layout, responsividade, estados de foco e componentes. |
| js/admin.js | Validação, atualização de registros, persistência, renderização e eventos da área Admin. |
| img/*.svg | Banner, quatro ilustrações de colchões e três ícones locais. |
| README.md | Descrição, integrante, execução, estrutura e instruções de publicação. |

## 4. HTML e navegação
Todos os HTML utilizam `lang="pt-BR"`, viewport, título, favicon, link CSS, cabeçalho (`header`), `nav`, `main` e `footer`. A home usa `section` e `article` nos produtos; imagens têm texto alternativo informativo ou vazio para ícones decorativos. Formulários têm `label` associado ao `id` de cada campo. `required`, tipos email/data e limites de comprimento fornecem validação nativa. A senha de cadastro exige seis caracteres. O menu e o rodapé são repetidos estaticamente nas cinco páginas; mudanças de navegação devem ser refletidas em cada uma.

## 5. CSS e identidade visual
Variáveis CSS em `:root`: azul-marinho `#182b42`, bege `#e9deca`, branco `#fff`, creme `#faf7f1`, dourado `#d8bb85`, além de cores de texto/erro. Georgia nos títulos e Arial no corpo. `.wrap` centraliza e limita largura; `.hero-grid`, `.product-grid`, `.form-layout`, `.fields` e `.about-grid` usam Grid. `.header-inner`, `.actions`, `.list-toolbar` e `.user-row` usam Flexbox. `.panel`, `.button`, `.outline`, `.danger`, `.status` e `.empty` definem componentes compartilhados. Media queries em 900px e 600px reorganizam a grade e formulários; `:hover` e `:focus-visible` fornecem feedback. Não há CSS externo.

## 6. JavaScript e regras
| Função | Entradas, processamento e resultado |
|---|---|
| `carregarUsuarios()` | Lê a chave, converte JSON, valida estrutura, tipos, datas e IDs únicos. Retorna lista ou sinaliza erro, preservando dados inválidos. |
| `salvarUsuarios(novosUsuarios)` | Grava o objeto JSON ou remove a chave quando vazia. Atualiza a variável `usuarios` somente após sucesso. Retorna booleano. |
| `informar(texto, erro)` | Atualiza a mensagem de status e alterna classe de erro. |
| `normalizar(texto)` | Normaliza acentos, maiúsculas e espaços nas extremidades para busca. |
| `renderizarLista()` | Filtra nome/e-mail, cria elementos `li`, `strong`, `span`, `time` e botões, atualiza contador, vazio e disponibilidade de exclusão total. Usa `textContent` para dados. |
| `limparCampos()` | Limpa formulário e devolve foco ao nome; não exclui registros. |
| `cadastrarUsuario(evento)` | Impede envio padrão, valida nome/e-mail, cria ID e data ISO, persiste, limpa formulário e filtro e atualiza interface. |
| `removerUsuario(id)` | Filtra pelo ID e salva o restante antes de renderizar. |

`CHAVE` identifica a única chave de armazenamento. `usuarios` é a lista em memória; `armazenamentoDisponivel` bloqueia escrita quando a leitura inicial falha. IDs são criados com `crypto.randomUUID` quando disponível, com alternativa baseada em tempo/aleatoriedade. Eventos: `submit` no formulário, `click` nos botões de limpar, excluir individual e excluir todos, `input` na busca. A exclusão total pede confirmação; a busca não muda os dados. E-mails duplicados são permitidos, pois não há regra de unicidade para e-mails. Datas são formatadas em português na interface, de acordo com o fuso local do navegador.

## 7. Fluxo e persistência
```text
Admin → formulário → validação → objeto {id,nome,email,data}
      → JSON.stringify({usuarios:[...]}) → Local Storage
      → renderizarLista() → lista não ordenada (DOM)
Recarregar → getItem → JSON.parse → renderizarLista
Pesquisar → filtrar em memória → renderizarLista
Excluir → filtrar por id ou limpar todos → salvar → renderizarLista
```
Exemplo de formato (dados fictícios):
```json
{"usuarios":[{"id":"exemplo","nome":"Ana Teste","email":"ana@example.com","data":"2026-11-24T12:00:00.000Z"}]}
```
A chave é `sonoConfortoUsuarios`. A persistência é local à origem e ao perfil do navegador; não é sincronizada com outros dispositivos. Não há cookies, SessionStorage, IndexedDB, banco de dados ou API HTTP no código. A exclusão do último registro remove a chave. A senha da interface pública não é persistida.

## 8. Tecnologias, arquitetura e interação
```text
Todas as páginas HTML ── css/style.css
                       └─ img/*.svg (conforme cada página)
admin.html ── js/admin.js ── DOM + Local Storage
```
Arquitetura estática executada no navegador (HTML, CSS e JavaScript nativo, SVG e JSON). Não há servidor de aplicação, bibliotecas, framework, CDN, fontes externas ou API comercial. O servidor HTTP estático é suficiente para hospedar os arquivos.

## 9. Manutenção e limitações
Preservar os IDs usados pelo script, a chave e o formato JSON, os links relativos e o padrão compartilhado de menu/rodapé. Não utilizar o formulário com dados reais: Local Storage não é adequado a dados sensíveis, a área Admin não é protegida e não há autenticação. Alterações simultâneas em várias abas não são sincronizadas. O site não demonstra pagamento, carrinho, estoque, preços reais, atendimento ou login efetivo. As medidas, a oferta e o endereço de contato são ilustrativos. O currículo apresenta informações profissionais fornecidas pelo autor, sem telefone ou e-mail pessoais. A URL publicada, resultados dos validadores oficiais e o vídeo ainda dependem de execução externa.

## 10. Conclusão
O código apresenta um catálogo estático responsivo e uma área administrativa com inclusão, pesquisa, limpeza e exclusão de registros persistidos no navegador. As páginas HTML compartilham estilos e ícones locais; a lógica administrativa concentra-se em `admin.js`. A documentação não presume serviços ou funcionalidades que não existem no código.
