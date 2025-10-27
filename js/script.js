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
            disableButton();
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
        disableButton();
    });
});

function insertAdressValue(cep) {
    $("#adressInput").val(cep.logradouro);
    $("#neighbourInput").val(cep.bairro);
    $("#cityInput").val(cep.localidade);
    $("#ufInput").val(cep.uf);

    ableNumber();
    ableButton();
}

function cleanErrorMessage() {
    $("#erro").html("");
}

function ableButton () {
    $("#saveButton").prop("disabled", false);
}

function ableNumber() {
    $("#numberInput").prop("disabled", false);
}

function disableButton() {
    $("#saveButton").prop("disabled", true);
}

function disableNumber() {
    $("#numberInput").prop("disabled", true);
}

var clients = [];

function registerClient() {
    disableNumber();
    disableButton();

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

function addNewRow(client) {
    var table = document.getElementById("tableClient");

    var newRow = table.insertRow();

    // Insert ID
    var idNode = document.createTextNode(client.id);
    addCell(newRow, idNode);

    // Insert name
    var nameNode = document.createTextNode(client.fullName);
    addCell(newRow, nameNode);

    // Insert adress
    var adressNode = document.createTextNode(client.adress);
    let cell = newRow.insertCell();

    cell.className = "d-none d-md-table-cell";
    cell.appendChild(adressNode);

    // Insert CEP 
    var CEPNode = document.createTextNode(client.CEP);
    cell = newRow.insertCell();

    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(CEPNode);

    // Insert neighbour 
    var neighbourNode = document.createTextNode(client.neighbour);
    cell = newRow.insertCell();

    cell.className = "d-none d-sm-table-cell";
    cell.appendChild(neighbourNode);

    // Insert city
    var cityNode = document.createTextNode(client.city);
    addCell(newRow, cityNode);

    // Insert UF
    var ufNode = document.createTextNode(client.uf);
    addCell(newRow, ufNode);
}

function addCell(newRow, node) {
    newRow.insertCell().appendChild(node);
}