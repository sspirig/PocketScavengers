"use strict";
/**
 * Projet: Pocket Scavengers
 * Fichier: User.js | Classe contenant les informations de l'user
 * Auteur: Santiago SPRG
 * Date: 03.02.2025
 */
export default class User {

    username;
    status; // variables possibles "connected" ou "disconnected"

    gameSave; // objet de la classe GameSave


    /**
     * Constructeur de la class
     */
    constructor(usrname) {
        this.username = usrname;
        this.status = "connected";
        
    }
}