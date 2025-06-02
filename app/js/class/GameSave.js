"use strict";
/**
 * Projet: Pocket Scavengers
 * Fichier: GameSave.js | Classe contenant les informations et la progression l'user
 * Auteur: Santiago SPRG
 * Date: 03.02.2025
 */
import Item from "./Item.js";
export default class GameSave {
    inventory;
    visitedPois;
    inventoryCapacity;

    AddItem(type, count) {
        let item = null;
        switch (type) {
            case 1: // récompense quand on arrive a un endroit précis a geneve
                item = new Item(count, "park");
                break;
            case 2:
                item = new Item(count, "aquatic");
                break;
            case 3:
                item = new Item(count, "common");
                break;
            case 4:
                item = new Item(count, "rare");
                break;
            default:
                break;
        }

        if (this.inventoryCapacity.capacity != this.inventoryCapacity.count + 1) {
            if (this.inventory[item.type] == undefined) {
                this.inventory[item.type] = item;
            }
            this.inventory[item.type].count += count;
            this.inventoryCapacity.count += 1;
            
            
            return item;
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
        this.visitedPois.forEach((poi) => {
            html += `

        <div><b>${poi[0]} | ${poi[1]}</b></div>`;
        });
        return html;
    }
    GetInventory() {
        let html = `<h3>Inventaire</h3><h4>Capacité: ${this.inventoryCapacity.count}/${this.inventoryCapacity.capacity}</h4>`;
        this.inventory.forEach((item) => {
            console.log(item);
            
            html += `<div><b>${item.count}x ⬡ ${item.type} ressource</b></div>`;
        });
        console.log("inventory : ",html);
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