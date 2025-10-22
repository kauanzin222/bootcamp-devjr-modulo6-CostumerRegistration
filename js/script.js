$('#cepInput').mask('00000-000');


// CEP JSON 


$("#cepInput").on('blur', function (){
   
    var CEP = $("#cepInput").val().replace(/\D/g, '');

    var CEP_API = `https://viacep.com.br/ws/${CEP}/json/`;

    
    $.getJSON(CEP_API, (cep) => {

        $("#adressInput").val(cep.logradouro);
        $("#neighbourInput").val(cep.bairro); 
        $("#cityInput").val(cep.localidade); 
        $("#stateInput").val(cep.estado);
        
    })
})
   