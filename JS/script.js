/* Aqui será definido o script para execução das tarefas do projeto To Do List */

const localStorageKey = 'lista-de-tarefas-al';


function validaSeJaExisteNovaTarefa(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    let tarefaNovaValor = document.getElementById('tarefa').value;
    let exists = values.find(x => x.name == tarefaNovaValor);
    return !exists ? false : true;
}


function add(){
    let tarefaNova = document.getElementById('tarefa');
    let list = document.getElementById('lista').innerHTML;
    tarefaNova.style.border = '';


    if (!tarefaNova.value){
        tarefaNova.style.border = '2px solid red';
        alert('Nenhuma informação resgistrada!\nCadastre nova tarefa!');
    }else if(validaSeJaExisteNovaTarefa()){
        tarefaNova.style.border = '2px solid red';
        alert('Está tarefa já existe!')
    }else{
        /* incremento no localStorage */
        let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        values.push({
            name: tarefaNova.value
        });
        localStorage.setItem(localStorageKey,JSON.stringify(values));
        tarefaNova.value = '';
        ShowValues();
    }   
}

function ShowValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    let list = document.getElementById('lista');
    list.innerHTML = '';
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id="btn-ok" onclick="removeItem('${values[i]['name']}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
      </svg></button></li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    let index = values.findIndex(x => x.name == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageKey,JSON.stringify(values));
    ShowValues();
}

ShowValues();