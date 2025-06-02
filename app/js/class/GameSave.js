"use strict";
/**
 * Projet: Pocket Scavengers
 * Fichier: GameSave.js | Classe contenant les informations et la progression l'user
 * Auteur: Santiago SPRG
 * Date: 03.02.2025
 */

export default class GameSave {
    inventory;
    visitedPois;
    inventoryCapacity;

    AddItem(type, count) {
        if (this.inventoryCapacity.capacity != this.inventoryCapacity.count + 1) {
            this.inventory[type].count += count;
            this.inventoryCapacity.count += 1;
            return true;
        }
        else {
            return false;
        }
    }

    SetGameSave(inventory, visitedPois, invCapacity) {
        this.inventory = inventory;
        this.visitedPois = visitedPois;
        this.inventoryCapacity = invCapacity
    }
    GetVisitedPois() {
        let html = "<h3>Points de recolte rencontrés</h3>";
        this.visitedPois.forEach(poi => {
            html += `

        <div><b>${poi[0]} | ${poi[1]}</b></div>`;
        });
        return html;
    }
    GetInventory() {
        let html = `<h3>Inventaire</h3><h4>Capacité: ${this.inventoryCapacity.count}${this.inventoryCapacity.capacity}</h4>`;
        this.inventory.forEach(item => {
            html += `
          <div><b>${item.count}x ⬡ ${item.name}</b></div>`;
        });
        return html;
    }

    /**
     * Constructeur de la classe
     */
    constructor() {
        this.inventoryCapacity = { count: 0, capacity: 200 };
        this.inventory = [

        ];
        this.visitedPois = [

        ];
    }
}