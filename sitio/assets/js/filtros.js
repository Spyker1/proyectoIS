
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