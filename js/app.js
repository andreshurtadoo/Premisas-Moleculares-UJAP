//VAR
const inputP = document.getElementById("p");
const inputQ = document.getElementById("q");
const inputR = document.getElementById("r");
const inputS = document.getElementById("s");
const inputT = document.getElementById("t");
const inputLogico = document.getElementById("formula");

const textAreaNatural = document.getElementById("floatingTextarea2"); //textArea Natural
const textAreaLogico = document.getElementById("floatingTextarea");  //textArea Logico
const resLogica = document.getElementById("resLogica");

//Functions
// Funcion que agrega la letra de la premisa al input logico
function setPremisa(id){
    switch(id){
        case 1:
            inputLogico.value += 'p';
            break;
        case 2:
            inputLogico.value += 'q';
            break;
        case 3:
            inputLogico.value += 'r';
            break;
        case 4:
            inputLogico.value += 's';
            break;
        case 5:
            inputLogico.value += 't';
            break;
    }
}

// Funcion que agrega el simbolo del conectivo al input logico
function setConectivo(id){
    switch(id){
        case 1:
            inputLogico.value += '^'; 
            break;
        case 2:
            inputLogico.value += 'v';
            break;
        case 3:
            inputLogico.value += '→';
            break;
        case 4:
            inputLogico.value += '↔';
            break;
        case 5:
            inputLogico.value += '¬';
            break;
    }
}

// Funcion que hace el cambio que logico a natural
function getFormula(){
    textAreaLogico.value = "";
    const premisas = ['p','q','r','s','t'];
    const conectivos = ['^','v','→','↔','¬'];
    const valor = ['𝘆','𝗼','𝘀𝗶','𝘀𝗼𝗹𝗼 𝘀𝗶','𝗻𝗼'];
    let formula = inputLogico.value.toLowerCase().trim().split('');
    // CICLO X FORMULA [P, ^, Q]
    for (let f = 0; f < formula.length; f++) {
        const x = formula[f];
        let band = true;
        // CICLO X PREMISAS ['p','q','r','s','t']
        for (let p = 0; p < premisas.length; p++) {
            const y = premisas[p];
            if (y == x) {
                textAreaLogico.value += document.getElementById(x).value + " ";
                band = true;
                break;
            }else{
                band = false;
            }
        }
        // CICLOS X CONECTIVO 
        if (band == false) {
            for (let c = 0; c < conectivos.length; c++) {
                const z = conectivos[c];
                if (z == x) {
                    textAreaLogico.value += valor[c] + " ";
                }
            }
        }
    }
}

// Funcion que hace el cambio que natural a logico
function getNatural(){
    let natural = textAreaNatural.value.toLowerCase().trim().split(' ');
    let union = '';
    let grupo = [];
    let conectivos = [];
    for (let index = 0; index < natural.length; index++) {
        const x = natural[index];
        if((x != 'si') && (x != 'o') && (x != 'y')){
            union += x + " ";
            // console.log(union);
        }else{
            // console.log('FIND ONE');
            grupo.push(union);
            conectivos.push(x);
            union = '';
        }
    }
    grupo.push(union)
    crearNatural(grupo,conectivos);
}

// Funcion que escribe el resultado
function crearNatural(grupo, conectivos){
    resLogica.value = '';
    const premisas = ['p', 'q', 'r', 's', 't'];
    let band = false;

    // Recorre las premisas del grupo
    for (let k = 0; k < grupo.length; k++) {
        let count = 0;
        let bandVerify = false;
        let premisaGrupo = grupo[k];

        // Comprobrar que no tenga un negado
        let verify = premisaGrupo.split(' ');
        verify.forEach(element => {
            if(element != 'no'){
                if(count == 0){
                    premisaGrupo = "";
                    count = 1;
                }
                premisaGrupo += element + " "
            }else bandVerify = true
        });

        console.log("premisaGrupo = " + premisaGrupo);
        console.log('luego ' + bandVerify);

        // Recorre las premisas por defecto
        for (let j = 0; j < premisas.length; j++) {
            let premisa = premisas[j];
            let valorPremisa = document.getElementById(premisa).value;
            console.log("valor premisa = " + valorPremisa);

            // Comparar ambas premisas
            if(valorPremisa.trim() == premisaGrupo.trim()){
                console.log('FIND ONE!!');

                // Comprobar si estaba en negado
                console.log(bandVerify);
                if(bandVerify == true){
                    resLogica.value += `¬${premisas[j]}`;
                }else { resLogica.value += premisas[j]; }
                
                // Encontrar Conectivo
                if(conectivos.length > 0){
                    for (let x = 0; x < conectivos.length; x++) {
                        const element = conectivos[x];
                        if(element == 'y') {
                            resLogica.value += '^';
                            conectivos.splice(0,1);
                        }
                        else if(element == 'o') {
                            resLogica.value += 'v';
                            conectivos.splice(0,1);
                        }
                        else if(element == 'si') {
                            resLogica.value += '→';
                            conectivos.splice(0,1);
                        }
                    }
                }

                band = true;
                break
            }else{
                console.log('No se parece');
                band = false;
            }
        }
        if(band == false){
            console.log('Se añade una variable X');
            // Comprobar si estaba en negado
            console.log(bandVerify);
            if(bandVerify == true){
                resLogica.value += '¬x';
            }else { resLogica.value += 'x'; }

            // Encontrar Conectivo
            if(conectivos.length > 0){
                for (let x = 0; x < conectivos.length; x++) {
                    const element = conectivos[x];
                    if(element == 'y') {
                        resLogica.value += '^';
                        conectivos.splice(0,1);
                    }
                    else if(element == 'o') {
                        resLogica.value += 'v';
                        conectivos.splice(0,1);
                    }
                    else if(element == 'si') {
                        resLogica.value += '→';
                        conectivos.splice(0,1);
                    }
                }
            }
        }
    }
    
}