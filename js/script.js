$('#cepInput').mask('00000-000');


// CEP JSON 


$("#cepInput").on('blur', function () {

    var CEP = $("#cepInput").val().replace(/\D/g, '');

    var CEP_API = `https://viacep.com.br/ws/${CEP}/json/`;

    $.getJSON(CEP_API, (cep) => {

        if ("erro" in cep)
            $("#erro").html("CEP não encontrado!");
        else {
            LimpaErro();
            IncluiValorEndereco(cep);
        }

    }).fail((jqXHR) => {
        console.log('Status:', jqXHR.status);
        LimpaErro();

        if (jqXHR.status === 0)
            $("#erro").html("CEP inválido!");
    });

});

function IncluiValorEndereco(cep) {

    $("#adressInput").val(cep.logradouro);
    $("#neighbourInput").val(cep.bairro);
    $("#cityInput").val(cep.localidade);
    $("#stateInput").val(cep.estado);

    HabilitaNumero(0);
}

function LimpaErro() {
    $("#erro").html("");
}

function HabilitaNumero(status) {
    if (status == 1)
      $("#numberInput").prop("disabled", true);
    else
      $("#numberInput").prop("disabled", false);
}