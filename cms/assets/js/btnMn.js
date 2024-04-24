let up = document.querySelectorAll('#sumar');
let down =document.querySelectorAll('#restar');

    

 up.forEach(mas => {
    mas.addEventListener('click',(event)=>{
       const id_pro=event.target.getAttribute('data-id-agr-pro');
       const  input = document.querySelector(`#input-agregar-cantidad-${id_pro}`)

       function getValue() {
        return parseInt(input.value);
    } 

        mas.onclick = function () {
            input.value = getValue() + 1;
        };

    })
 });   

 down.forEach(menos=>{
    menos.addEventListener('click',(event)=>{
        const id_pro=event.target.getAttribute('data-id-agr-pro');
        const  input = document.querySelector(`#input-agregar-cantidad-${id_pro}`)

        function getValue() {
            return parseInt(input.value);
        }
        
        menos.onclick = function () {
            if (getValue() <= 1) {
                return 1;
            } else {
                input.value = getValue() - 1;
            }
        };

    })
 })