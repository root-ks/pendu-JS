var cptNbMotXML=0;
var motADeviner; 
var lettreDeDepart; 

function initGame()
{
getSizeOfXml();
//initGetOneWordRand();
alert(cptNbMotXML);
}


/*---------------------------------------------*/
 $("#bouttonEnvoi").click(function() 
    {
        var test = false;
         $("#LettreDejaDit li").each(function() 
            {
               test =  verifierPresenceDansLettreDejaUtilise($(this));
            });

        //Si test est faux alors on ajoute on ajout la lettre dans le formulaire dans la liste 
        if (test==false)
        {
            $("<li>").html($("#lettre").val()).appendTo("#LettreDejaDit");
           
        }
    });

//Fonction qui se declanche par appel de #bouttonEnvoi
//verifier si la lettre dans le formulaire et la meme que dans l'élement courant
function verifierPresenceDansLettreDejaUtilise()
{
if (e.text() == $("#lettre").val())
{
   alert("Vous avez deja utilisé cette valeur");
   return true;
}
else 
{
    return false;
}
}
/*---------------------------------------------*/
//Recupere un event action clavier sur la partie ajout d'un lettre
$("#lettre").keypress(function() 
{
verifierQueSeulUneLettreEnvoi();
});
//S'assure que seul une lettre soit passer dans l'input 
function verifierQueSeulUneLettreEnvoi()
{      
    if($("#lettre").val().length!=0)
    {
        var a="";
        $("#lettre").val(a);
    }
}
/*---------------------------------------------*/
//Affiche le nombre de case correspondent au nombre lettre dans le mot
function initCase(a)
{
for (var i = 0; i<a; i++)
{
    $("<li>").html(i).appendTo("#espaceDeJeu ul");
}
}
/*---------------------------------------------*/
//Appel la fonction TraitementXML qui range dans la variable globale cptNbMotXML
//le nombre de mot contenu dans le fichier XML
function getSizeOfXml()
{
    $.get("../XML/publication.xml",{},TraitementXML,"xml");
}

function TraitementXML(Xreponse)
{
var Xstatus = $(Xreponse).find('mot').each(
                function()
                {  
                    cptNbMotXML++; 
                }
            );

}

/*---------------------------------------------*/
//Appel la fonction getXML qui range dans la variable globale motADeviner 
//le mot avec lequel on va jouer et lettreDeDepart la lettre a affiche au debut
function initGetOneWordRand() 
{
$.get("../XML/publication.xml",{},getXML,"xml");
}

function getXML (Xreponse)
{
var indiceMotAPrendre = (Math.floor((cptNbMotXML-1)*Math.random())+1); 
var cpt = 1;    
var Xstatus = $(Xreponse).find('mot').each(
                function()
                {  
                    if(cpt==indiceMotAPrendre)
                    {
                        motADeviner = $(this).find('nom').text();
                        lettreDeDepart = $(this).find('lettre').text();
                    }
                    else 
                    {
                        cpt++;
                    }
                }
            );
}