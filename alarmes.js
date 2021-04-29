function gerarRelatorio(){
    // antes de efetivamente gerar o relatório, vou fazer aquela verificaçao marota
    // se o usuário está ou não conectado

    if (!localStorage.getItem("userDASH")){
        window.location = "index.html";
    }

    fetch("http://localhost:8080/alarmes")
        .then(res => res.json())
        .then(lista => preencheRelatorio(lista));
}

function preencheRelatorio(lista){
    var strTabela = `<table class="table table-hover">
                        <thead>
                           <tr>
                              <th>#</th>
                              <th>Nome</th>
                              <th>Descricao</th>
                           </tr>
                        </thead>
                        <tbody>`;

    // loop preenchendo o corpo da tabela
    for (i=0; i<lista.length; i++){
        var alarme = lista[i];
        strTabela += ` <tr>
                            <td>${alarme.id}</td>
                            <td>${alarme.nome}</td>
                            <td>${alarme.descricao}</td>
                       </tr>`;
    }


    // fecho a tabela
    strTabela += `      </tbody>
                  </table>`;
    
    document.getElementById("relatorio").innerHTML = strTabela;

}