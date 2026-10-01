const CHAVE="lacosEsperancaCadastros";
export function obterCadastros(){
try{return JSON.parse(localStorage.getItem(CHAVE))||[];}catch{return[];}
}
export function salvarCadastro(cadastro){
const cadastros=obterCadastros();cadastros.push(cadastro);
localStorage.setItem(CHAVE,JSON.stringify(cadastros));
}
