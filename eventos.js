function verificaUsuario(){
    if (!localStorage.getItem("userDASH")){
        window.location = "index.html";
    }
}


function gerarRelatorio(){
    var txtInicio = document.getElementById("txtDataInicio").value;
    var txtFim    = document.getElementById("txtDataFim").value;

    console.log("Datas informadas = "+txtInicio+ " / " + txtFim);

    var msgBody = {
        inicio : txtInicio,
        fim : txtFim
    }

    var cabecalho = {
        method : "POST",
        body   : JSON.stringify(msgBody),
        headers: {
            "content-type": "application/json"
        }
    }

    fetch("http://localhost:8080/eventosporperiodo", cabecalho)
        .then(res => res.json())
        .then(lista => preencheRelatorio(lista));

    // como eu leio isso?
    // res = fetch(...)
    // lista = res.json()
    // preencheRelatorio(lista) 
}

function preencheRelatorio(lista){
    var strTable = `<table class="table table-hover">
                       <thead>
                          <tr>
                             <th>#</th>
                             <th>Data</th>
                             <th>Alarme</th>
                             <th>Equipamento</th>
                             <th>IP</th>
                         </tr>
                       </thead>
                       <tbody>`;

    // agora eu tenho um loop de linhas da tabela (isso aqui eu gero dinameicamente)
    for (i=0; i<lista.length; i++){
        var evento = lista[i];
        strTable = strTable + `<tr>
                                  <td>${evento.numSeq}</td>
                                  <td>${evento.data}</td>
                                  <td>${evento.alarme.nome}</td>
                                  <td>${evento.equipamento.hostname}</td>
                                  <td>${evento.equipamento.ipaddr}</td>
                               </tr>`;
    }

    strTable += `     </tbody>
                  </table>`;

    document.getElementById("relatorio").innerHTML = strTable;
}