$('#cepInput').mask('00000-000');


// CEP JSON 
$("#cepInput").on('blur', function () {

    /* Pega o valor do CEP sem máscara */
    var CEP = $("#cepInput").val().replace(/\D/g, '');

    /* Pega o endereço JSON da API */
    var CEP_API = `https://viacep.com.br/ws/${CEP}/json/`;

    $.getJSON(CEP_API, (cep) => {

        if ("erro" in cep) {
            $("#erro").html("CEP não encontrado!");
            disableNumber();
        }
        else {
            cleanErrorMessage();
            insertAdressValue(cep);
        }

    }).fail((jqXHR) => {
        /*console.log('Status:', jqXHR.status);*/
        cleanErrorMessage();

        /* CEP não é válido. Ex: 110 */
        if (jqXHR.status === 0)
            $("#erro").html("CEP inválido!");

        disableNumber();
    });
});

function insertAdressValue(cep) {
    $("#adressInput").val(cep.logradouro);
    $("#neighbourInput").val(cep.bairro);
    $("#cityInput").val(cep.localidade);
    $("#ufInput").val(cep.uf);

    ableNumber();
}

function cleanErrorMessage() {
    $("#erro").html("");
}

function ableNumber() {
    $("#numberInput").prop("disabled", false);
}

function disableNumber() {
    $("#numberInput").prop("disabled", true);
}

var clients = [];

function registerClient () {
    disableNumber();

    var client = {
        id: clients.length + 1,
        fullName: $("#nameInput").val() + " " + $("#surnameInput").val(),
        adress: $("#adressInput").val(),
        CEP: $("#cepInput").val(),
        neighbour: $("#neighbourInput").val(),
        city: $("#cityInput").val(),
        uf: $("#ufInput").val(),
    };

    saveClient(client);

    addNewRow(client);

     document.getElementById("formClient").reset();
}

function saveClient(client) {
    clients.push(client);
}

function addNewRow (client) {
    var table = document.getElementById("tableClient");

    var newRow = table.insertRow();

    var idNode = document.createTextNode(client.id);
    newRow.insertCell().appendChild(idNode);

    var nameNode = document.createTextNode(client.fullName);
    newRow.insertCell().appendChild(nameNode);

    var adressNode = document.createTextNode(client.adress);
    newRow.insertCell().appendChild(adressNode);

    var CEPNode = document.createTextNode(client.CEP);
    newRow.insertCell().appendChild(CEPNode);

    var neighbourNode = document.createTextNode(client.neighbour);
    newRow.insertCell().appendChild(neighbourNode);

    var cityNode = document.createTextNode(client.city);
    newRow.insertCell().appendChild(cityNode);

    var ufNode = document.createTextNode(client.uf);
    newRow.insertCell().appendChild(ufNode);
}


