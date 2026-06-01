
let susenky = 0;
let silaKliknuti = 1; 
let btnSusenka = document.getElementById("btn-susenka");
let textSkore = document.getElementById("skore");

btnSusenka.addEventListener("click", function() {
    susenky += silaKliknuti; 
    textSkore.textContent = susenky; 
});
let btnBabicka = document.getElementById("btn-babicka");
let cenaBabicka = 10;

btnBabicka.addEventListener("click", function() {
    if (susenky >= cenaBabicka) {
        susenky -= cenaBabicka; 
        silaKliknuti++;        
        
        textSkore.textContent = susenky; 

        cenaBabicka += 10; 
        btnBabicka.textContent = `Najmout Babičku (Cena: ${cenaBabicka} sušenek)`;
    } else {
        alert("Nedostatek prostředků!");
    }
});
let btnTovarna = document.getElementById("btn-tovarna");
let cenaTovarna = 50;

btnTovarna.addEventListener("click", function() {
    if (susenky >= cenaTovarna) {
        susenky -= cenaTovarna;
        textSkore.textContent = susenky;   
        cenaTovarna += 50;
        btnTovarna.textContent = `Koupit Továrnu (Cena: ${cenaTovarna})`;
        
        setInterval(function() {
            susenky++; 
            textSkore.textContent = susenky;
        }, 1000); // 
    }
});

let btnDul = document.getElementById("btn-dul");
let cenaDul = 200; 

btnDul.addEventListener("click", function() {
    if (susenky >= cenaDul) {
        susenky -= cenaDul;
        textSkore.textContent = susenky;     
        cenaDul += 150; 
        btnDul.textContent = `Koupit Důl na čokoládu (Cena: ${cenaDul} sušenek)`;
        
    
        setInterval(function() {
            susenky += 5; 
            textSkore.textContent = susenky;
        }, 1000); 
    } else {
        alert("Nedostatek prostředků pro nákup Dolu!");
    }
});

let btnZlata = document.getElementById("btn-zlata");
btnZlata.addEventListener("click", function() {

    if (Math.random() < 0.5) {
        susenky += 100;
        alert("Štěstí! Získal jsi 100 sušenek! :)");
    } else {
        susenky -= 50;
        if (susenky < 0) {
            susenky = 0;
        }
        alert("Smůla! Ztratil jsi 50 sušenek. :(");
    }
    textSkore.textContent = susenky;
});