'use strict';
const CHAVE = 'sonoConfortoUsuarios';
const formulario = document.querySelector('#cadastro-form');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const mensagem = document.querySelector('#cadastro-mensagem');

function informarErro(texto) {
    mensagem.textContent = texto;
    mensagem.classList.toggle('error', true);
    mensagem.hidden = false;
}

function carregarUsuarios() {
    const valor = localStorage.getItem(CHAVE);
    if (valor === null) return [];
    const dados = JSON.parse(valor);
    if (!dados || !Array.isArray(dados.usuarios) || !dados.usuarios.every(u => u && typeof u.id === 'string' && typeof u.nome === 'string' && typeof u.email === 'string' && typeof u.data === 'string' && !Number.isNaN(new Date(u.data).getTime())) || new Set(dados.usuarios.map(u => u.id)).size !== dados.usuarios.length) {
        throw new Error('Formato inválido');
    }
    return dados.usuarios;
}

formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    const nomeLimpo = nome.value.trim();
    const emailLimpo = email.value.trim();
    if (!nomeLimpo || !emailLimpo || !email.validity.valid) {
        informarErro('Preencha um nome e um e-mail válido.');
        return;
    }
    try {
        const usuarios = carregarUsuarios();
        const id = globalThis.crypto && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const usuario = { id, nome: nomeLimpo, email: emailLimpo, data: new Date().toISOString() };
        if (usuarios.some(u => u.id === id)) throw new Error('ID duplicado');
        localStorage.setItem(CHAVE, JSON.stringify({ usuarios: [...usuarios, usuario] }));
    } catch (erro) {
        informarErro('Não foi possível registrar o cadastro. Os registros existentes foram preservados.');
        return;
    }
    window.location.assign('login.html');
});
