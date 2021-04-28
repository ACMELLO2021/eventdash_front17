function logar(){
    console.log("chamei a funcao...");
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("Digitou = "+txtLogin+"/"+txtSenha);


    /*
    1 - preciso montar a mensagem de envio do login (como eu não sei se o usuário digita racf ou email),
    vou mandar ambas as informações

    2 - preciso montar o cabeçalho da requisição indicando que vou fazer uso do método POST,
    e vou enviar uma mensagem como JSON

    3 - preciso enviar esta mensagem ao BackEnd

    4 - como vamos usar uma tecnologia chamada AJAX, a gente não tem a resposta em tempo real
    (pode demorar um pouqinho), então precisamos escrever uma rotina (trecho de código) para
    tratar o resultado quando ele vier
    */


    // passo 1- montando a mensagem
    var msgBody = {
        email: txtLogin,
        racf: txtLogin,
        senha: txtSenha
    }

    // passo 2 - montar o cabeçacalho da requiscao
    var cabecalho = {
        method : "POST",
        body   : JSON.stringify(msgBody),
        headers : {
            "content-type":"application/json"
        }
    }

    // passos 3, 4 - enviar a requisição via AJAX e quando houver (se houver) resultado, eu trato
    fetch("http://localhost:8080/login", cabecalho)
        .then(res => trataResultado(res));
}

function trataResultado(res){
    if (res.status == 200){
        res.json().then(usuario => {
            // armazeno o objeto que eu recebi no cache do browser
            localStorage.setItem("userDASH", JSON.stringify(usuario));
            // vou redirecionar para a página de relatório
            window.location = "relatorio.html";
        });
        // como eu leria isso??
        //
        // var usuario = res.json();
        // console.log(usuario);
        //
    }
    else if (res.status == 403){
        document.getElementById("msgErro").innerHTML = "Senha Invalida";
    }
    else if (res.status == 404){
        document.getElementById("msgErro").innerHTML = "Usuario nao encontrado";
    }
    else {
        document.getElementById("msgErro").innerHTML = "Erro desconhecido";
    }
}