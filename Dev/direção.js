
var metodo = document.querySelector(".metodo");
var passo = document.querySelector(".passo");
var enviar = document.querySelector(".enviar");
var tipoRadio = document.forms[0].coddecod;
var tipo = document.querySelector(".tipo");
var chave = document.getElementById("chave").value;
var entrada = document.querySelector("#entrada");

//metodo muda a cor se não for selecionado
passo.style.display = "none";
metodo.addEventListener("change", function () {
    metodo.style.backgroundColor = "#009eff";
    metodo.style.transition = "none";
    if (metodo.selectedIndex == 1) {
        //"passo" aparece se Cifra for selecionado
        passo.style.display = "flex";
    } else {
        passo.style.display = "none";
    }
});

tipo.addEventListener("change", function () {
    //muda a mensagem do botão enviar conforme selecionado
    if (tipoRadio[0].checked) {
        enviar.textContent = "Codificar";
    } else {
        enviar.textContent = "Decodificar";
    }
});

passo.addEventListener("change", function () {
    // atualiza o valor da chave de cesar
    chave = document.getElementById("chave").value;
});

enviar.addEventListener("click", function (e) {
    e.preventDefault();
    var mensagem = entrada.value;
    if (metodo.selectedIndex == 0) {
        metodo.style.backgroundColor = "#ff6b6b";
        setTimeout(
            () => (metodo.style.backgroundColor = "#ff6b6b"),
            1000
        );
        metodo.style.transition = "1s";
    } else if (metodo.selectedIndex == 1) {
        if (tipoRadio[0].checked) {
            codificarCifra(mensagem, chave);
        } else {
            decodificarCifra(mensagem, chave);
        }
    } else {
        if (tipoRadio[0].checked) {
            codificarBase64(mensagem);
        } else {
            decodificarBase64(mensagem);
        }
    }
});

var resposta = document.querySelector(".resposta");
var mensagem1 = document.getElementById("mensagem1");
var mensagem2 = document.getElementById("mensagem2");
var imagem = document.getElementById("imagem");
var copiar = document.getElementById("copiar");

//codifica
function codificarBase64(mensagem) {
    var codigo = btoa(mensagem);
    mensagem1.style.display = "none";
    mensagem2.style.display = "none";
    imagem.style.display = "none";
    resposta.innerText = codigo;
    copiar.style.display = "initial";
}
//decodifica
function decodificarBase64(codigo) {
    var valido = true;
    // para evitar Failed to execute 'atob'
    for (var i = 0; i < codigo.length; i++) {
        var charCode = codigo[i].charCodeAt();
        if (
            !(
                (charCode >= 48 && charCode <= 57) ||
                (charCode >= 65 && charCode <= 90) ||
                (charCode >= 97 && charCode <= 122) ||
                charCode == 61 ||
                charCode == 43 ||
                charCode == 47 ||
                charCode == 32
            )
        ) {
            valido = false;
            tipo.style.backgroundColor = "lightcoral";
            setTimeout(
                () => (tipo.style.backgroundColor = "#009eff"),
                1000
            );
            tipo.style.transition = "1s";
            break;
        }
    }
    if (valido) {
        var mensagem = atob(codigo);
        mensagem1.style.display = "none";
        mensagem2.style.display = "none";
        imagem.style.display = "none";
        resposta.innerText = mensagem;
        copiar.style.display = "initial";
    }
}
//botao de copiar
copiar.onclick = () => {
    navigator.clipboard.writeText(resposta.innerText);
}


var resposta = document.querySelector(".resposta");
var mensagem1 = document.getElementById("mensagem1");
var mensagem2 = document.getElementById("mensagem2");
var imagem = document.getElementById("imagem");
var copiar = document.getElementById("copiar");

//codifica
function codificarCifra(mensagem, chave) {
    mensagem = mensagem.split("");
    chave = parseInt(chave, 10);
    var codigo = "";
    for (var i = 0; i < mensagem.length; i++) {
        var charCode = mensagem[i].charCodeAt();
        if (charCode >= 65 && charCode <= 90) {
            codigo += String.fromCharCode(((charCode + chave - 65) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            codigo += String.fromCharCode(((charCode + chave - 97) % 26) + 97);
        } else {
            codigo += mensagem[i];
        }
    }
    mensagem1.style.display = "none";
    mensagem2.style.display = "none";
    imagem.style.display = "none";
    resposta.innerText = codigo;
    copiar.style.display = "initial";
}
//decodifica
function decodificarCifra(mensagem, chave) {
    mensagem = mensagem.split("");
    chave = parseInt(chave, 10);
    var codigo = "";
    for (var i = 0; i < mensagem.length; i++) {
        var charCode = mensagem[i].charCodeAt();
        if (charCode >= 65 && charCode <= 90) {
            codigo += String.fromCharCode(((charCode - chave - 90) % 26) + 90);
        } else if (charCode >= 97 && charCode <= 122) {
            codigo += String.fromCharCode(((charCode - chave - 122) % 26) + 122);
        } else {
            codigo += mensagem[i];
        }
    }
    mensagem1.style.display = "none";
    mensagem2.style.display = "none";
    imagem.style.display = "none";
    resposta.innerText = codigo;
    copiar.style.display = "initial";
}
//botao de copiar
copiar.onclick = () => {
    navigator.clipboard.writeText(resposta.innerText);
}