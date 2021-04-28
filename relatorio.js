function carregaInfo(){
    var strUsuario = localStorage.getItem("userDASH");
    if (!strUsuario){ // ele não está no storage, logo vem com o valor "undefined"
        // volta pra tela de login
        window.location = "index.html";
    }
    

}