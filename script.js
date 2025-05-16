//content setup
const recipe = {
    name: "text",
    include: true
};

const proteinArray = [{name: "Chicken wings", include: true}, {name: "Chicken legs", include: true}, {name: "Boneless chicken breast", include: true}, {name: "Bone in chicken breast", include: true}, {name: "Whole chicken", include: true}, {name: "Chicken thighs", include: true}, {name: "Roast chicken", include: true}, {name: "Chicken soup", include: true}, {name: "Ground beef", include: true}, {name: "Roast beef", include: true}, {name: "Blade steak", include: true}, {name: "Grilling steak", include: true}, {name: "Hamburgers", include: true}, {name: "Lasagna", include: true}, {name: "Beef soup", include: true}, {name: "Sausages", include: true}, {name: "Pork roast", include: true}, {name: "Ribs", include: true}, {name: "Ham", include: true}, {name: "Ham soup", include: true}, {name: "Turkey", include: true}, {name: "Turkey soup", include: true}, {name: "Haddock", include: true}, {name: "Salmon", include: true}, {name: "Shrimp", include: true}, {name: "Lobster", include: true}, {name: "Mussels", include: true}, {name: "Oysters", include: true}, {name: "Deli meat", include: true}, {name: "Vegetarian", include: true}, {name: "Whatever you want", include: true}];

const carbArray = [{name: "Mashed potatoes", include: true}, {name: "Baked potatoes", include: true}, {name: "Roasted potatoes", include: true}, {name: "French fries", include: true}, {name: "Sweet potato", include: true}, {name: "Pasta", include: true}, {name: "White rice", include: true}, {name: "Brown rice", include: true}, {name: "Jasmine rice", include: true}, {name: "Wild rice", include: true}, {name: "Rolls", include: true}, {name: "Biscuits", include: true}, {name: "Toast", include: true}, {name: "Pitas", include: true}, {name: "Tortilla", include: true}, {name: "Corn bread", include: true}, {name: "Pizza", include: true}, {name: "Corn", include: true}, {name: "Whatever you want", include: true}];

const vegArray = [{name: "Green peas", include: true}, {name: "Green beans", include: true}, {name: "Broccoli", include: true}, {name: "Carrots", include: true}, {name: "Snow peas", include: true}, {name: "Zucchini", include: true}, {name: "Cucumber", include: true}, {name: "Turnip", include: true}, {name: "Coleslaw", include: true}, {name: "Spinach salad", include: true}, {name: "Caesar salad", include: true}, {name: "Greek salad", include: true}, {name: "Whatever you want", include: true}];

//function to set up each checklist on startup
function listSetup(arrayName, foodType) {
    for (let i = 0; i < arrayName.length; i++){
        let boxId = `${foodType}${i}`;
    
        //create checkbox
        let box = document.createElement("input");
        box.setAttribute("id", boxId);
        box.setAttribute("type", "checkbox");
        box.setAttribute("checked", true);
    
        //add value to checkbox
        let boxValue = document.createElement("value");
        boxValue.setAttribute("for", boxId)
        boxValue.textContent = arrayName[i].name;
    
        //append both in that order to a new div
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "recipe-with-box");
    
        newDiv.appendChild(box);
        newDiv.appendChild(boxValue);
    
        //append div to the document
        let mainDiv = document.getElementById(`${foodType}-checkboxes`);
        mainDiv.appendChild(newDiv);
    };
};

listSetup(proteinArray, "protein");
listSetup(carbArray, "carb");
listSetup(vegArray, "veg");

//check which products have been selected from the list and return a random product
function getCustomElement(foodType, foodArray){
    let customArray = [];
    let customArrayCount = 0;

    for (let i = 0; i < foodArray.length; i++){
        foodArray[i].include = document.getElementById(`${foodType}${i}`).checked;
        if (foodArray[i].include){
            customArray[customArrayCount] = foodArray[i];
            customArrayCount++;
        }
    };

    let index = Math.floor(Math.random()*customArray.length);

    return customArray[index];
}

const generateBtn = document.getElementById("random-generator");
const displayRecipe = document.getElementById("result");

//generate and display a recipe
generateBtn.addEventListener("click", () => {
    let customProtein = getCustomElement("protein", proteinArray);
    let customVeg = getCustomElement("veg", vegArray);
    let customCarb = getCustomElement("carb", carbArray);

    let newTextContent = `${customProtein.name}, ${customVeg.name} and ${customCarb.name}`;
    displayRecipe.textContent = newTextContent;
});

//generate and display a specific product
function generateProductType(prodType, prodArray){
    let customProduct = getCustomElement(prodType, prodArray);
    const displayProduct = document.getElementById(`${prodType}-result`);
    displayProduct.textContent = `${customProduct.name}`;
}

const genProtein = document.getElementById("random-protein");
const genVeg = document.getElementById("random-veg");
const genCarb = document.getElementById("random-carb");
const genPlanner = document.getElementById("generate-planner");

genProtein.addEventListener("click", () => generateProductType("protein", proteinArray));
genVeg.addEventListener("click", () => generateProductType("veg", vegArray));
genCarb.addEventListener("click", () => generateProductType("carb", carbArray));
genPlanner.addEventListener("click", () => generatePlanner());

//generate a 28-day meal planner
let plannerTemplateGenerated = false;
function generatePlanner(){
    if (plannerTemplateGenerated){
        for (let i = 0; i < 28; i++){
            //get elements
            let proteinToday = document.getElementById(`protein${i}-planner`);
            let vegToday = document.getElementById(`veg${i}-planner`);
            let carbToday = document.getElementById(`carb${i}-planner`);

            //update content of elements
            proteinToday.textContent = `${getCustomElement("protein", proteinArray).name}`;
            vegToday.textContent = `${getCustomElement("veg", vegArray).name}`;
            carbToday.textContent = `${getCustomElement("carb", carbArray).name}`;
        }
    } else {
        plannerTemplateGenerated = true;
        for (let i = 0; i < 28; i++){
            //setup of elements
            const cell = document.getElementById(`cell${i+1}`);
            const dayDiv = document.createElement("div");
            dayDiv.setAttribute("id", `day${i}`);
            dayDiv.setAttribute("class", "planner-day")

            const proteinToday = document.createElement("p");
            proteinToday.setAttribute("id", `protein${i}-planner`);
            proteinToday.setAttribute("class", "planner-prod");
            
            const vegToday = document.createElement("p");
            vegToday.setAttribute("id", `veg${i}-planner`);
            vegToday.setAttribute("class", "planner-prod");
            
            const carbToday = document.createElement("p");
            carbToday.setAttribute("id", `carb${i}-planner`);
            carbToday.setAttribute("class", "planner-prod");
            
            //update content of elements
            proteinToday.textContent = `${getCustomElement("protein", proteinArray).name}`;
            vegToday.textContent = `${getCustomElement("veg", vegArray).name}`;
            carbToday.textContent = `${getCustomElement("carb", carbArray).name}`;

            //append elements to document
            dayDiv.appendChild(proteinToday);
            dayDiv.appendChild(vegToday);
            dayDiv.appendChild(carbToday);
            
            cell.appendChild(dayDiv);
        }
    }
}