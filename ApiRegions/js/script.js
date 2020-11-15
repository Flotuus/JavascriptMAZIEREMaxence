$(document).ready(function() {

    let codeDepartement;
    let departements = document.getElementById("departements");
    let communes = document.getElementById("communes");
    communes.style.display = 'none'

    function ajaxDepartements(){
        var request= $.ajax({
            url: "https://geo.api.gouv.fr/departements?fields=nom,code", 
            method:"GET",
            dataType: "json",
            beforeSend: function( xhr ) {
                xhr.overrideMimeType( "application/json; charset=utf-8" );
            }});
        request.done(function( msg ) {


            $.each(msg, function(index,e){
                departements.innerHTML += "<option value="+ e.code +" >" + e.nom + "</option>";
            });

        });
        // Fonction qui se lance lorsque l’accès au web service provoque une erreur
        request.fail(function( jqXHR, textStatus ) {
            alert ('erreur');
        });
    }

    ajaxDepartements();

    departements.addEventListener("change",function(){
        codeDepartement = departements.value;
        ajaxCommunes();
    })

    function ajaxCommunes(){
        var request= $.ajax({
            url: "https://geo.api.gouv.fr/departements/"+ codeDepartement +"/communes?fields=nom&format=json&geometry=centre", 
            method:"GET",
            dataType: "json",
            beforeSend: function( xhr ) {
                xhr.overrideMimeType( "application/json; charset=utf-8" );
            }});
        request.done(function( msg ) {
            communes.style.display = 'block'
            communes.innerHTML = " <option value='0'>-- Selectionnez une commune --</option>";

            $.each(msg, function(index,e){
                communes.innerHTML += "<option>" + e.nom + "</option>";
            });
        });
        // Fonction qui se lance lorsque l’accès au web service provoque une erreur
        request.fail(function( jqXHR, textStatus ) {
            communes.style.display = 'none'
        });
    }
});