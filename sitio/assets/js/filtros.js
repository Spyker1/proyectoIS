// const filtro_consola=document.querySelectorAll('.filtro_consola')

// filtro_consola.forEach(a=>{
//     a.addEventListener('click',async(event)=>{
//         const filtro_consola_busqueda=event.target.getAttribute('data-filtro-consola');
//         try{
//             window.location.href = `/consolas/${filtro_consola_busqueda}`;
            
//         }catch(err){
//             console.log(err);
//         }
//     })
// })


// const filtro_accesorios=document.querySelectorAll('.filtro_accesorios');

// filtro_accesorios.forEach(a=>{
//     a.addEventListener('click',async(event)=>{
//         const filtro_accesorio_busqueda=event.target.getAttribute('data-filtro-accesorio-consola');
//         try{
//             window.location.href = `/accesorios/${filtro_accesorio_busqueda}`;
            
//         }catch(err){
//             console.log(err);
//         }
//     })
// })

// const filtro_videojuegos_consola=document.querySelectorAll('.filtro_videojuegos-consola');

// filtro_videojuegos_consola.forEach(a=>{
//     a.addEventListener('click',async(event)=>{
//         const filtro_videojuegos_consola_busqueda=event.target.getAttribute('data-filtro-videojuegos-consola');
//         try{
//             window.location.href=`/videojuegos/consola/${filtro_videojuegos_consola_busqueda}`;
//         }catch(err){
//             console.log(err);
//         }
//     })
// })

// const filtro_videojuegos_genero=document.querySelectorAll('.filtro_videojuegos-genero');

// filtro_videojuegos_genero.forEach(a=>{
//     a.addEventListener('click',async(event)=>{
//         const filtro_videojuegos_genero_busqueda=event.target.getAttribute('data-filtro-videojuegos-genero');
//         try{
//             window.location.href=`/videojuegos/genero/${filtro_videojuegos_genero_busqueda}`;
//         }catch(err){
//             console.log(err);
//         }
//     })
// })

const filtro=document.querySelectorAll('.filtro');

filtro.forEach(a=>{
    a.addEventListener('click',async(event)=>{
        const filtro_p=event.target.getAttribute('data-filtro-p')
        const filtro_f=event.target.getAttribute('data-filtro')

        try{
            window.location.href=`/filtro/${filtro_p}/${filtro_f}`
        }catch(err){
            return err;
        }
    })
})