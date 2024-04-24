const idInput=document.getElementById('txtBuscador')
const f_fechas=document.getElementById('f_fec')
const f_estatus=document.getElementById('f_est')
const f_porPag=document.getElementById('cantidad')

idInput.addEventListener('keyup',buscar)
f_fechas.addEventListener('change',filtro)
f_estatus.addEventListener('change',filtro)
f_porPag.addEventListener('change',buscar)

function buscar(){
  const valor=idInput.value
  const datos=f_porPag.value;
  const orden=new URLSearchParams(window.location.search).get('orden') ? new URLSearchParams(window.location.search).get('orden') : '' ;
  const estatus=new URLSearchParams(window.location.search).get('e') ? new URLSearchParams(window.location.search).get('e') : f_estatus.value ;
  const fecha=new URLSearchParams(window.location.search).get('f') ? new URLSearchParams(window.location.search).get('f') : f_fechas.value ;
  const prueba=new URLSearchParams(window.location.search).get('p') ? new URLSearchParams(window.location.search).get('p') : 1 
  const url_nue=`${window.location.origin}${window.location.pathname}?b=${valor}&p=${prueba}&d=${datos}&e=${estatus}&f=${fecha}&orden=${orden}`
  window.history.replaceState({},'url',url_nue)
   
  const pagina_a=(window.location.pathname)
  getFetch(valor,pagina_a,prueba,datos,estatus,fecha,orden)
}

function filtro(){
  let prueba=1;
  const estatus=f_estatus.value;
  const fecha=f_fechas.value;
  if(estatus==0||fecha==0){
    prueba=new URLSearchParams(window.location.search).get('p')?new URLSearchParams(window.location.search).get('p'):1
  }else{
    prueba=1;
  }

  const orden=new URLSearchParams(window.location.search).get('orden') ? new URLSearchParams(window.location.search).get('orden') : '' ;
  const valor=new URLSearchParams(window.location.search).get('b') ? new URLSearchParams(window.location.search).get('b') : idInput.value ;
  const datos=new URLSearchParams(window.location.search).get('d') ? new URLSearchParams(window.location.search).get('d') : f_porPag.value ;
  const url_nue=`${window.location.origin}${window.location.pathname}?b=${valor}&p=${prueba}&d=${datos}&e=${estatus}&f=${fecha}&orden=${orden}`

  window.history.replaceState({},'url',url_nue)
   
  const pagina_a=(window.location.pathname)
  getFetch(valor,pagina_a,prueba,datos,estatus,fecha, orden)
}

function paginador(paginas){
  const orden=new URLSearchParams(window.location.search).get('orden') ? new URLSearchParams(window.location.search).get('orden') : '' ;
  const valor=new URLSearchParams(window.location.search).get('b')?new URLSearchParams(window.location.search).get('b'):idInput.value
  const datos=new URLSearchParams(window.location.search).get('d')?new URLSearchParams(window.location.search).get('d'):f_porPag.value
  const estatus=new URLSearchParams(window.location.search).get('e')?new URLSearchParams(window.location.search).get('e'):f_estatus.value
  const fecha=new URLSearchParams(window.location.search).get('f')?new URLSearchParams(window.location.search).get('f'):f_fechas.value
  const url_nue=`${window.location.origin}${window.location.pathname}?b=${valor}&p=${paginas}&d=${datos}&e=${estatus}&f=${fecha}&orden=${orden}`
  window.history.replaceState({},'url',url_nue)
  const pagina_a=(window.location.pathname)
  getFetch(valor,pagina_a,paginas,datos,estatus,fecha, orden)
}


function getFetch(valor,pagina,paginaAct,datos,estatus,fecha,orden){
    fetch(`${pagina}?b=${valor}&p=${paginaAct}&d=${datos}&e=${estatus}&f=${fecha}&orden=${orden}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Application': 'application/json',
            'peticion':'fetch'
        }
    }).then(async(resp) => {
      const tabla_borrar=document.getElementById('table')
      const response_json= await resp.text();
      if(tabla_borrar){
        tabla_borrar.remove()
      }
      document.getElementById('divTabla').innerHTML=response_json
    }).catch((error) => {
      location.href='pagina-no-encontrada'
    });
}