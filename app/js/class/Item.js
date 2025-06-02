export default class Item {
    count;
    name;
    type;
    backgroundGradient;
    backgroundList;
    constructor(count, name, type) {
      this.count = count;
      this.name = name;
      this.type = type;

      switch (type) {
        case "landmarkTrophy": // récompense quand on arrive a un endroit précis a geneve ( pas implémenté)
            this.unitPrice = "not_buyable";
            this.backgroundGradient = "linear-gradient(#FFDD00, #DE9B096e)";
            break;
        case "park": // récompense quand on arrive a un endroit précis a geneve
            this.unitPrice = "15";
            this.backgroundGradient = "linear-gradient(#02CC1D, #3019006e)";
            break;
        case "aquatic":
            this.unitPrice = "30";
            this.backgroundGradient = "linear-gradient(#021DCC, #6287CC6e)";
            break;
        case "common":
            this.unitPrice = "5";
            this.backgroundGradient = "linear-gradient(#02ccbb, #0161596e)";
            break;
        case "rare":
            this.unitPrice = "444";
            this.backgroundGradient = "linear-gradient(#00FFEE, #EB23916e)";
            break;
        default:    
            break;
      }
    }
  
  }