function paginacion(pag={}){
    let pagina=[]
    const total=Math.ceil(pag.total/pag.por_p)
    if(pag.total==0){
        if(pag.act==1){
            // console.log(1)
            for(let i=1;i<=pag.act;i++){
                pagina.push({pag:i,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:1,sig:pag.act,ant:pag.act,pri:1})
            }
        }else{
            // console.log(2)
            for(let i=1;i<=(parseInt(pag.act)<=parseInt(pag.max)?pag.act:1);i++){
                pagina.push({pag:i,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:1,sig:(pag.act<=pag.max?pag.act:1),ant:(pag.act<=pag.max?pag.act:1),pri:1})
            }
        }
    }else if(pag.act==1){
        if(pag.act==total){
            // console.log(3)
            pagina.push({pag:1,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:total,sig:pag.act,ant:pag.act,pri:1})
        }else{
            // console.log(4)
            for(let i=1;i<= (total >= pag.act+4 ? pag.act+4 : total);i++){
                pagina.push({pag:i,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:total,sig:pag.act+1,ant:pag.act,pri:1})    
            }
        }
    }else if(pag.act>1&&pag.act<total){
        if((pag.act-2)<=0&&(pag.act-1)>0){
            // console.log(5)
            for(let i=1;i<=pag.act+2;i++){
                pagina.push({pag:i,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:total,sig:pag.act+1,ant:pag.act-1,pri:1})   
            }
        }else{
            if((pag.act+2)>total){
                // console.log(6)
                for(let i=pag.act-2;i<=total;i++){
                    pagina.push({pag:i,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:total,sig:pag.act+1,ant:pag.act-1,pri:1})
                }
            }else{
                // console.log(7)
                for(let i=pag.act-2;i<=pag.act+2;i++){
                    pagina.push({pag:i,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:total,sig:pag.act+1,ant:pag.act-1,pri:1})
                }
            }
        }
    }else{
        if((pag.act-4)<=0){
            // console.log(8)
            for(let i=1;i<=pag.act;i++){
                pagina.push({pag:i,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:total,sig:pag.act,ant:pag.act-1,pri:1})
            }
        }else{
            // console.log(9)
            pag.act= pag.act<=total?pag.act:total
            for(let i=pag.act-4;i<=pag.act;i++){
                pagina.push({pag:i,act:(pag.act!=pag.max ||pag.act==pag.max ?pag.act:1),max:total,sig:pag.act,ant:pag.act-1,pri:1})
            }
        }
    }
    return pagina
}

module.exports={paginacion}