function carregaInfo(){
    var strUsuario = localStorage.getItem("userDASH");
    if (!strUsuario){ // ele não está no storage, logo vem com o valor "undefined"
        // volta pra tela de login
        window.location = "index.html";
    }

    // aqui começa o preenchimento das infos...
    // agora maninpulo o usuario como um objeto
    var usuario = JSON.parse(strUsuario);

    document.getElementById("fotoUser").innerHTML = `<img src="${usuario.linkFoto}" width="100%">`;
    document.getElementById("bioUser").innerHTML  = `<h4>${usuario.nome}</h4>
                                                     <hr>
                                                     <strong>Racf:</strong> ${usuario.racf} <br>
                                                     <strong>Email:</strong> ${usuario.email} <br>
                                                     <strong>Ramal:</strong> ${usuario.ramal}`;



}