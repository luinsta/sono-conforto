# Sono & Conforto

Projeto acadêmico de Programação Web Front-end: catálogo fictício de colchões nos tamanhos solteiro, casal, queen e king, com cadastro e login demonstrativos e gestão local de usuários. Não há comércio eletrônico real, autenticação ou backend.

**Integrante:** Luís Fernando Rodrigues de Oliveira — Grupo 02 (individual).

## Estrutura

```text
sono-conforto/
├── index.html      # catálogo, apresentação e informações
├── cadastro.html   # formulário de cinco campos
├── login.html      # interface demonstrativa
├── admin.html      # gestão de usuários no navegador
├── curriculo.html  # currículo profissional do desenvolvedor
├── css/style.css   # estilos compartilhados e responsividade
├── js/admin.js     # DOM e Local Storage
├── img/            # oito ilustrações e ícones SVG locais
├── CONTEXTO_PROJETO.md
└── README.md
```

## Executar localmente

Abra a pasta `sono-conforto` no VS Code. Com Python instalado, execute `python -m http.server 8000` dentro dessa pasta e acesse `http://localhost:8000/` no navegador. No Windows, `py -m http.server 8000` é uma alternativa. Também é possível usar Live Server no VS Code. Prefira um servidor HTTP, pois o comportamento do Local Storage em URLs `file:` não é garantido.

## Administração

Acesse Admin no menu. Cadastre nome e e-mail fictícios; a lista exibe nome, e-mail e data. Os registros ficam em uma única chave `sonoConfortoUsuarios` com objeto JSON contendo a propriedade `usuarios`. Pesquise por nome ou e-mail, limpe os campos, exclua um registro ou confirme a exclusão de todos. A busca não altera o armazenamento. As credenciais da página de cadastro/login não são armazenadas nem enviadas; os campos não possuem atributo `name`, portanto o envio apenas navega para a página prevista.

## Tecnologias

HTML5, CSS3 (Grid, Flexbox e media queries), JavaScript nativo, APIs DOM e Web Storage, JSON e SVG. Não há dependências externas no site. As ilustrações são vetoriais originais feitas para este projeto.

## Publicação

O projeto está publicado no GitHub Pages e pode
ser acessado pelo endereço:

- [Acessar o website Sono & Conforto](https://luinsta.github.io/sono-conforto/)
- [Repositório do projeto](https://github.com/luinsta/sono-conforto)
