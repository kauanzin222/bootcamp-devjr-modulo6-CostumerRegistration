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
    $("#stateInput").val(cep.estado);
    
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