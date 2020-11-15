
let btChange = document.getElementById("btChange");
let imageCurseur = document.getElementById("imageCurseur");
let imageDessinALaMain = document.getElementById("imageDessinALaMain");
let imageLigne = document.getElementById("imageLigne");
let imageRectangle = document.getElementById("imageRectangle");
let imageFillRectangle = document.getElementById("imageFillRectangle");
let imageCercle = document.getElementById("imageCercle");
let imageFillCercle = document.getElementById("imageFillCercle");
let outilHTML = document.getElementById("outil");
let imageRouge = document.getElementById("imageRouge");
let imageBleu = document.getElementById("imageBleu");
let imageVert = document.getElementById("imageVert");
let imageJaune = document.getElementById("imageJaune");
let imageNoir = document.getElementById("imageNoir");
let imageBlanc = document.getElementById("imageBlanc");
let couleurHTML = document.getElementById("couleur");
let couleurPerso = document.getElementById("couleurPerso");
let epaisseurHTML = document.getElementById("epaisseur")

let outil = "curseur";
let couleur = "noir";
let couleurHexa = "#000000";
let epaisseur = "3";
let lastX;
let lastY;


btChange.addEventListener("click", setCanvas, false);

imageCurseur.addEventListener("click", function () {
    outil = "curseur";
    outilHTML.textContent = "Curseur";
}, false);

imageDessinALaMain.addEventListener("click", function () {
    outil = "dessinALaMain";
    outilHTML.textContent = "Dessin à la main";
}, false);

imageLigne.addEventListener("click", function () {
    outil = "ligne";
    outilHTML.textContent = "Ligne";
}, false);

imageRectangle.addEventListener("click", function () {
    outil = "rectangle";
    outilHTML.textContent = "Rectangle";
}, false);

imageFillRectangle.addEventListener("click", function () {
    outil = "fillRectangle";
    outilHTML.textContent = "Rectangle Rempli";
}, false);

imageCercle.addEventListener("click", function () {
    outil = "cercle";
    outilHTML.textContent = "Cercle";
}, false);

imageFillCercle.addEventListener("click", function () {
    outil = "fillCercle";
    outilHTML.textContent = "Cercle Rempli";
}, false);

imageRouge.addEventListener("click", function () {
    couleur = "rouge";
    couleurHTML.textContent = "Rouge";
}, false);

imageBleu.addEventListener("click", function () {
    couleur = "bleu";
    couleurHTML.textContent = "Bleu";
}, false);

imageVert.addEventListener("click", function () {
    couleur = "vert";
    couleurHTML.textContent = "Vert";
}, false);

imageJaune.addEventListener("click", function () {
    couleur = "jaune";
    couleurHTML.textContent = "Jaune";
}, false);

imageNoir.addEventListener("click", function () {
    couleur = "noir";
    couleurHTML.textContent = "Noir";
}, false);

imageBlanc.addEventListener("click", function () {
    couleur = "blanc";
    couleurHTML.textContent = "Blanc";
}, false);

couleurPerso.addEventListener("change",function(){
        couleur = "perso";
        couleurHTML.textContent = "Couleur personnalisée ";
})

epaisseurHTML.addEventListener("change",function(){
    epaisseur = epaisseurHTML.value;
})


let canvas = document.getElementById("canvas");
canvas.hidden = true;

function setCanvas(){
    canvas.hidden = false;
    let height = document.getElementById("height");
    let width = document.getElementById("width");

    canvas.setAttribute('width',parseInt(width.value,10));
    canvas.setAttribute('height',parseInt(height.value,10));

    canvas.addEventListener('mousemove', e => canvasMouseMove(canvas, e), false);
    canvas.addEventListener('mousedown', e => canvasMouseDown(canvas, e), false);
    canvas.addEventListener('mouseup', e => canvasMouseUp(canvas, e), false);

    ctx = canvas.getContext('2d');
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,parseInt(width.value,10),parseInt(height.value,10));
    canvas.temporaire = document.createElement('canvas');
    canvas.temporaire.width = canvas.width;
    canvas.temporaire.height = canvas.height;
    canvas.temporaireCtx = canvas.temporaire.getContext('2d');
    return canvas;
}

function canvasMouseDown(canvas, e){
    canvas.click = true;
    canvas.departX = e.clientX - canvas.getBoundingClientRect().left;
    canvas.departY = e.clientY - canvas.getBoundingClientRect().top;
    canvas.temporaireCtx.drawImage(canvas,0,0);
    x = e.offsetX;
    y = e.offsetY;
}

function canvasMouseMove(canvas, e){
    if (canvas.click){
        x2 = e.clientX - canvas.getBoundingClientRect().left;
        y2 = e.clientY - canvas.getBoundingClientRect().top;
        couleurHexa = "#000000";

        if (couleur === "rouge"){
            couleurHexa = "#FF0000";
        }
        else if (couleur === "bleu"){
            couleurHexa = "#0000FF";
        }
        else if (couleur === "vert"){
            couleurHexa = "#00FF00";
        }
        else if (couleur === "jaune"){
            couleurHexa = "#FFFF00";
        }
        else if (couleur === "blanc"){
            couleurHexa = "#FFFFFF";
        }
        else if (couleur === "perso"){
            couleurHexa = couleurPerso.value;
            console.log(couleurHexa);
        }

        if (outil === "dessinALaMain") {
            drawHandFree(x,y,e.offsetX,e.offsetY,couleurHexa,epaisseur);
            x = e.offsetX;
            y = e.offsetY;
        }
        else if (outil === "ligne") {
            drawImage(canvas, 0, 0, canvas.temporaire);
            drawLine(canvas, canvas.departX, canvas.departY, x2, y2,couleurHexa, epaisseur);
        }
        else if (outil === "rectangle") {
            drawImage(canvas, 0, 0, canvas.temporaire);
            drawRectangle(canvas, canvas.departX, canvas.departY, x2, y2,couleurHexa, epaisseur);
        }
        else if (outil === "fillRectangle") {
            drawImage(canvas, 0, 0, canvas.temporaire);
            drawFillRectangle(canvas, canvas.departX, canvas.departY, x2, y2,couleurHexa, epaisseur);
        }
        else if (outil === "cercle") {
            drawImage(canvas, 0, 0, canvas.temporaire);
            drawCircle(canvas, canvas.departX, canvas.departY, x2, y2,couleurHexa, epaisseur);
        }
        else if (outil === "fillCercle") {
            drawImage(canvas, 0, 0, canvas.temporaire);
            drawFillCircle(canvas, canvas.departX, canvas.departY, x2, y2,couleurHexa, epaisseur);
        }
    }
}

function canvasMouseUp(canvas, e){
    canvas.click = false;
}

function drawHandFree(x1,y1,x2,y2,couleurHexa,epaisseur) {

    ctx.beginPath();
    ctx.lineWidth = epaisseur;
    ctx.strokeStyle = couleurHexa;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();


}


//Dessine une ligne
function drawLine(canvas, x1, y1, x2, y2,couleurHexa,epaisseur){
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = couleurHexa;
    ctx.lineWidth = epaisseur;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawRectangle(canvas, x1, y1, x2, y2,couleurHexa,epaisseur){
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = couleurHexa;
    ctx.lineWidth = epaisseur;
    ctx.beginPath();
    ctx.rect(x1,y1,x2-x1,y2-y1);
    ctx.stroke()

}

function drawFillRectangle(canvas, x1, y1, x2, y2,couleurHexa,epaisseur){
    ctx = canvas.getContext('2d');
    ctx.fillStyle = couleurHexa;
    ctx.lineWidth = epaisseur;
    ctx.fillRect(x1,y1,x2-x1,y2-y1);

}

function drawCircle(canvas, x1, y1, x2, y2,couleurHexa,epaisseur){
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = couleurHexa;
    ctx.lineWidth = epaisseur;
    ctx.beginPath();
    if(Math.abs(x2-x1) >= Math.abs(y2-y1) ){
        ctx.arc(x1,y1, Math.abs(x2-x1), 0, 2 * Math.PI,false);
    }else{
        ctx.arc(x1,y1, Math.abs(y2-y1), 0, 2 * Math.PI,false);
    }
    ctx.stroke();
}

function drawFillCircle(canvas, x1, y1, x2, y2,couleurHexa,epaisseur){
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = couleurHexa;
    ctx.lineWidth = epaisseur;
    ctx.beginPath();
    if(Math.abs(x2-x1) >= Math.abs(y2-y1) ){
        ctx.arc(x1,y1, Math.abs(x2-x1), 0, 2 * Math.PI,false);
    }else{
        ctx.arc(x1,y1, Math.abs(y2-y1), 0, 2 * Math.PI,false);
    }
    ctx.fillStyle = couleurHexa;
    ctx.fill();
    ctx.stroke();
}

// Dessine une image
function drawImage(canvas, x, y, image){
    ctx = canvas.getContext('2d');
    ctx.drawImage(image, x, y);
}

































