export default class Item {
    count;
    type;
    color;
    backgroundGradient;
    constructor(count, type) {
      this.count = count;
      this.type = type;

      switch (type) {
        case "landmarkTrophy": // récompense quand on arrive a un endroit précis a geneve ( pas implémenté)
            this.unitPrice = "not_buyable";
            this.backgroundGradient = "linear-gradient(#FFDD00, #DE9B096e)";
            this.color = "#FFDD00";
            break;
        case "park": // récompense quand on arrive a un endroit précis a geneve
            this.unitPrice = "15";
            this.backgroundGradient = "linear-gradient(#02CC1D, #3019006e)";
            this.color = "#02CC1D";
            break;
        case "aquatic":
            this.unitPrice = "30";
            this.backgroundGradient = "linear-gradient(#021DCC, #6287CC6e)";
            this.color = "#021DCC";
            break;
        case "common":
            this.unitPrice = "5";
            this.backgroundGradient = "linear-gradient(#02ccbb, #0161596e)";
            this.color = "#02ccbb";
            break;
        case "rare":
            this.unitPrice = "444";
            this.backgroundGradient = "linear-gradient(#00FFEE, #EB23916e)";
            this.color = "rgb(250, 16, 145)";
            break;
        default:    
            
            break;
      }
    }
  
  }