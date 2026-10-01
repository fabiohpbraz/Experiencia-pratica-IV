const rotas={"/":"index.html","/index.html":"index.html","/projetos.html":"projetos.html","/cadastro.html":"cadastro.html"};
const normalizar=p=>p.endsWith("/")?"/":p;
const rotaDaPagina=p=>{
  const nome=p.split("/").filter(Boolean).pop();
  return nome?`/${nome}`:"/";
};
export function iniciarRoteador(render){
document.addEventListener("click",async e=>{
const link=e.target.closest("a[data-spa-link]");if(!link)return;
if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
const u=new URL(link.href);if(u.origin!==location.origin)return;
const rota=rotaDaPagina(u.pathname);if(!rotas[rota])return;e.preventDefault();await navegar(rota,true,render);
});
addEventListener("popstate",()=>navegar(location.pathname,false,render));
}
export async function navegar(path,historyOn,render){
const arquivo=rotas[rotaDaPagina(path)],app=document.querySelector("#app");if(!arquivo||!app)return;
try{
const r=await fetch(new URL(arquivo,document.baseURI));if(!r.ok)throw new Error("Não foi possível carregar a página.");
const doc=new DOMParser().parseFromString(await r.text(),"text/html"),novo=doc.querySelector("#app");
if(!novo)throw new Error("Área principal não encontrada.");
app.innerHTML=novo.innerHTML;if(historyOn)history.pushState({},"",new URL(arquivo,document.baseURI).pathname);document.title=doc.title;render();scrollTo({top:0,behavior:"smooth"});
}catch(err){app.innerHTML=`<section class="section"><div class="container"><h1>Erro ao carregar</h1><p>${err.message}</p></div></section>`;}
}
