"use strict";

let killsFont = null;

let kills = 0;
let deaths = 0;

bindEventHandler("OnResourceReady", thisResource, function (event, resource) {
    let fontStream = openFile("pricedown.ttf");
    if (fontStream != null) {
        killsFont = lucasFont.createFont(fontStream, 22.0);
        fontStream.close();
    }
});

addEventHandler("OnPedWasted", function(event, ped, attacker, weapon, pedPiece) {
    if(ped.isType(ELEMENT_PLAYER)) {
        return deaths++;
    }
    if(attacker.isType(ELEMENT_PLAYER)){
        return kills++;
    }
    if(ped.isType(ELEMENT_PED)) {
        return kills++;
    }
});

addEventHandler("OnDrawnHUD", function (event) {
    if (killsFont != null){
        let hudX = 10; 
        let hudY = game.height - 80;  

        killsFont.render(`Kills: ${kills} Deaths: ${deaths}`, [hudX + 240, hudY], 0, 0.5, 0.0, killsFont.size, COLOUR_WHITE, false, false, false, true);
    }
});

