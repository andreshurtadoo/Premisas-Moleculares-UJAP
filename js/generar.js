// CONSTANTES
const premisas = [p,q,r,s,t];
const simbolo = ['𝗽','𝗾','𝗿','𝘀','𝘁'];
const btnGenerar = document.getElementById("btnGenerar");
const olList = document.getElementById("olList");

// FUNCIONES

// Genera las premisas moleculares
function proposiciones(premisaA, premisaB, simboloA, simboloB){
    const conectivos = ['𝘆', '𝗼', '𝘀𝗶', '𝘀𝗼𝗹𝗼 𝘀𝗶'];
    const logicos = ['∧','∨','→','↔']
    
    // TRUE - TRUE
    for (let index = 0; index < conectivos.length; index++) {
        // console.log(`${premisaA} ${conectivos[index]} ${premisaB}`);
        olList.innerHTML += `<li class="list-group-item list-group-item-action list-group-item-primary">(${simboloA} ${logicos[index]} ${simboloB}) ${premisaA} ${conectivos[index]} ${premisaB}</li>`
    }

    // FALSE - TRUE
    for (let index = 0; index < conectivos.length; index++) {
        // console.log(`no ${premisaA} ${conectivos[index]} ${premisaB}`);
        olList.innerHTML += `<li class="list-group-item list-group-item-action list-group-item-secondary">(¬${simboloA} ${logicos[index]} ${simboloB}) 𝗻𝗼 ${premisaA} ${conectivos[index]} ${premisaB}</li>`
    }

    // TRUE - FALSE
    for (let index = 0; index < conectivos.length; index++) {
        // console.log(`${premisaA} ${conectivos[index]} no ${premisaB}`);
        olList.innerHTML += `<li class="list-group-item list-group-item-action list-group-item-secondary">(${simboloA} ${logicos[index]} ¬${simboloB}) ${premisaA} ${conectivos[index]} 𝗻𝗼 ${premisaB}</li>`
    }

    // FALSE - FALSE
    for (let index = 0; index < conectivos.length; index++) {
        // console.log(`no ${premisaA} ${conectivos[index]} no ${premisaB}`);
        olList.innerHTML += `<li class="list-group-item list-group-item-action list-group-item-secondary">¬(${simboloA} ${logicos[index]} ${simboloB}) 𝗻𝗼 ${premisaA} ${conectivos[index]} 𝗻𝗼 ${premisaB}</li>`
    }
}

// Genera las cominaciones entre las premisas => pq, pr, ps....
function pares(){
    for (let x = 0; x < premisas.length; x++) {
        if(premisas[x].value == ''){
            continue;
        }else{
            for (let y = x+1; y < premisas.length; y++) {
                if(premisas[y].value == ''){
                    continue;
                }else{
                    console.log(`${premisas[x].value} - ${premisas[y].value}`);
                    proposiciones(premisas[x].value, premisas[y].value, simbolo[x], simbolo[y])
                }
            }
        }
    }
}

// Llama la funcion pares
btnGenerar.addEventListener('click', ()=>{
    pares();     
})



