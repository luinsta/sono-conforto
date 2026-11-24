'use strict';
const CHAVE = 'sonoConfortoUsuarios';
const formulario = document.querySelector('#admin-form');
const nome = document.querySelector('#admin-nome');
const email = document.querySelector('#admin-email');
const pesquisa = document.querySelector('#pesquisa');
const lista = document.querySelector('#lista-usuarios');
const vazia = document.querySelector('#lista-vazia');
const contador = document.querySelector('#contador');
const mensagem = document.querySelector('#mensagem');
const excluirTodos = document.querySelector('#excluir-todos');
let usuarios = [];
let armazenamentoDisponivel = true;
function informar(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle('error', erro);
}
function carregarUsuarios() {
    try {
        const valor = localStorage.getItem(CHAVE);
        if (valor === null) return [];
        const dados = JSON.parse(valor);
        if (!dados || !Array.isArray(dados.usuarios) || !dados.usuarios.every(u => u && typeof u.id === 'string' && typeof u.nome === 'string' && typeof u.email === 'string' && typeof u.data === 'string' && !Number.isNaN(new Date(u.data).getTime())) || new Set(dados.usuarios.map(u => u.id)).size !== dados.usuarios.length) {
            throw new Error('Formato inválido');
        }
        return dados.usuarios;
    } catch (erro) {
        armazenamentoDisponivel = false;
        informar('Não foi possível ler os registros. Os dados existentes foram preservados.', true);
        return [];
    }
}
function salvarUsuarios(novosUsuarios) {
    if (!armazenamentoDisponivel) return false;
    try {
        if (novosUsuarios.length === 0) localStorage.removeItem(CHAVE);
        else localStorage.setItem(CHAVE, JSON.stringify({ usuarios: novosUsuarios }));
        usuarios = novosUsuarios;
        return true;
    } catch (erro) {
        informar('Não foi possível salvar. Nenhum registro foi alterado na lista.', true);
        return false;
    }
}
function normalizar(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
function renderizarLista() {
    const termo = normalizar(pesquisa.value);
    const filtrados = usuarios.filter(u => normalizar(u.nome).includes(termo) || normalizar(u.email).includes(termo));
    lista.replaceChildren();
    for (const usuario of filtrados) {
        const item = document.createElement('li');
        const linha = document.createElement('div');
        linha.className = 'user-row';
        const dados = document.createElement('div');
        const nomeExibido = document.createElement('strong');
        nomeExibido.textContent = usuario.nome;
        const emailExibido = document.createElement('span');
        emailExibido.textContent = usuario.email;
        const data = document.createElement('time');
        data.dateTime = usuario.data;
        data.textContent = 'Cadastro: ' + new Date(usuario.data).toLocaleString('pt-BR');
        dados.append(nomeExibido, emailExibido, data);
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'button danger';
        botao.textContent = 'Excluir';
        botao.setAttribute('aria-label', 'Excluir ' + usuario.nome);
        botao.addEventListener('click', () => removerUsuario(usuario.id));
        linha.append(dados, botao);
        item.append(linha);
        lista.append(item);
    }
    contador.textContent = `${filtrados.length} de ${usuarios.length} registro(s)`;
    vazia.hidden = filtrados.length > 0;
    vazia.textContent = !armazenamentoDisponivel ? 'Registros indisponíveis.' : usuarios.length ? 'Nenhum registro corresponde à pesquisa.' : 'Nenhum usuário cadastrado.';
    excluirTodos.disabled = !armazenamentoDisponivel || usuarios.length === 0;
}
function limparCampos() {
    formulario.reset();
    nome.focus();
}
function cadastrarUsuario(evento) {
    evento.preventDefault();
    const nomeLimpo = nome.value.trim();
    const emailLimpo = email.value.trim();
    if (!nomeLimpo || !emailLimpo || !email.validity.valid) {
        informar('Preencha um nome e um e-mail válido.', true);
        return;
    }
    const id = globalThis.crypto && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const usuario = { id, nome: nomeLimpo, email: emailLimpo, data: new Date().toISOString() };
    if (salvarUsuarios([...usuarios, usuario])) {
        limparCampos();
        pesquisa.value = '';
        renderizarLista();
        informar('Usuário cadastrado com sucesso.');
    }
}
function removerUsuario(id) {
    if (salvarUsuarios(usuarios.filter(u => u.id !== id))) {
        renderizarLista();
        informar('Usuário excluído.');
    }
}
formulario.addEventListener('submit', cadastrarUsuario);
document.querySelector('#limpar').addEventListener('click', () => { limparCampos(); informar('Campos limpos.'); });
pesquisa.addEventListener('input', renderizarLista);
excluirTodos.addEventListener('click', () => {
    if (confirm('Deseja excluir todos os usuários cadastrados neste navegador?') && salvarUsuarios([])) {
        pesquisa.value = '';
        renderizarLista();
        informar('Todos os usuários foram excluídos.');
    }
});
usuarios = carregarUsuarios();
if (!armazenamentoDisponivel) formulario.querySelector('button[type="submit"]').disabled = true;
renderizarLista();
