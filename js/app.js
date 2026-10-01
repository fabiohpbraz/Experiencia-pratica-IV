import{iniciarRoteador}from"./router.js";
import{frentesAtuacao,valores,projetos}from"./data.js";
import{renderCards,renderCadastros}from"./templates.js";
import{obterCadastros,salvarCadastro}from"./storage.js";
import{aplicarMascaraCPF,aplicarMascaraTelefone,aplicarMascaraCEP,validarFormulario,mostrarErros}from"./validation.js";

function menu(){
const b=document.querySelector(".menu-toggle"),n=document.querySelector("#main-nav");if(!b||!n)return;
b.addEventListener("click",()=>{const aberto=n.classList.toggle("open");b.setAttribute("aria-expanded",String(aberto));b.querySelector(".sr-only").textContent=aberto?"Fechar menu":"Abrir menu";});
n.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{n.classList.remove("open");b.setAttribute("aria-expanded","false");}));
}
function conteudo(){
const f=document.querySelector("#frentesContainer"),v=document.querySelector("#valoresContainer"),p=document.querySelector("#projetosContainer");
if(f)f.innerHTML=renderCards(frentesAtuacao);if(v)v.innerHTML=renderCards(valores);if(p)p.innerHTML=renderCards(projetos);
}
function cadastros(){
const c=document.querySelector("#cadastrosContainer");if(c)c.innerHTML=renderCadastros(obterCadastros());
}
function formulario(){
const form=document.querySelector("#cadastroForm");if(!form)return;
form.elements.cpf?.addEventListener("input",e=>e.target.value=aplicarMascaraCPF(e.target.value));
form.elements.telefone?.addEventListener("input",e=>e.target.value=aplicarMascaraTelefone(e.target.value));
form.elements.cep?.addEventListener("input",e=>e.target.value=aplicarMascaraCEP(e.target.value));
form.addEventListener("submit",e=>{
e.preventDefault();const erros=validarFormulario(form);mostrarErros(form,erros);const s=document.querySelector("#formStatus");
if(Object.keys(erros).length){s.textContent="Verifique os campos destacados.";s.className="form-status status-error";form.querySelector(".input-error")?.focus();return;}
const dados=Object.fromEntries(new FormData(form));delete dados.senha;delete dados.confirmacao;delete dados.termos;
salvarCadastro(dados);s.textContent="Cadastro realizado com sucesso!";s.className="form-status status-success";form.reset();mostrarErros(form,{});cadastros();
});
}
function atual(){
const atual=location.pathname.split("/").pop()||"index.html";
document.querySelectorAll(".main-nav a").forEach(a=>{const d=new URL(a.href).pathname.split("/").pop()||"index.html",ok=d===atual;a.classList.toggle("active",ok);if(ok)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
}
function inicializar(){menu();conteudo();formulario();cadastros();atual();}
iniciarRoteador(inicializar);inicializar();
