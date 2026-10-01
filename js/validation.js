export function aplicarMascaraCPF(v){return v.replace(/\D/g,"").slice(0,11).replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2");}
export function aplicarMascaraTelefone(v){const n=v.replace(/\D/g,"").slice(0,11);return n.length<=10?n.replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{4})(\d)/,"$1-$2"):n.replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{5})(\d)/,"$1-$2");}
export function aplicarMascaraCEP(v){return v.replace(/\D/g,"").slice(0,8).replace(/(\d{5})(\d)/,"$1-$2");}
function cpfValido(v){const n=v.replace(/\D/g,"");return n.length===11&&!/^([0-9])\1{10}$/.test(n);}
export function validarFormulario(form){
const d=new FormData(form),e={};
["nome","cpf","telefone","cep","email","perfil","senha","confirmacao"].forEach(c=>{if(!String(d.get(c)||"").trim())e[c]="Preencha este campo.";});
if(!e.cpf&&!cpfValido(String(d.get("cpf"))))e.cpf="Informe um CPF válido.";
if(!e.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.get("email"))))e.email="Informe um e-mail válido.";
if(!e.senha&&String(d.get("senha")).length<6)e.senha="A senha deve ter pelo menos 6 caracteres.";
if(!e.confirmacao&&d.get("senha")!==d.get("confirmacao"))e.confirmacao="As senhas não são iguais.";
if(!d.get("termos"))e.termos="Aceite os termos para continuar.";
return e;
}
export function mostrarErros(form,erros){
form.querySelectorAll(".error-message").forEach(x=>x.textContent="");
form.querySelectorAll("input,select").forEach(x=>{x.classList.remove("input-error");x.removeAttribute("aria-invalid");});
Object.entries(erros).forEach(([campo,msg])=>{const input=form.elements[campo],erro=document.getElementById("erro-"+campo);if(input){input.classList.add("input-error");input.setAttribute("aria-invalid","true");}if(erro)erro.textContent=msg;});
}
