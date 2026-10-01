export function renderCards(lista){
return lista.map(item=>`<article class="card"><h3>${item.titulo}</h3><p>${item.descricao}</p></article>`).join("");
}
export function renderCadastros(lista){
if(!lista.length)return '<p class="empty-state">Nenhum cadastro realizado ainda.</p>';
return `<div class="table-wrapper"><table><caption class="sr-only">Cadastros realizados</caption><thead><tr><th scope="col">Nome</th><th scope="col">E-mail</th><th scope="col">Perfil</th></tr></thead><tbody>${lista.map(item=>`<tr><td>${item.nome}</td><td>${item.email}</td><td>${item.perfil}</td></tr>`).join("")}</tbody></table></div>`;
}
