var totalIngredients;
var ingredientsArr;
var pageSize = 50;


function getAllIngredients() {
    if (!ingredientsArr) {
        getIngredientsCount();
    }
}

function getIngredientsCount() {
    $.getJSON("/api/ingredients/count", ingredientsCount => {
        totalIngredients = parseInt(ingredientsCount);

        ingredientsArr = [];
        getIngredientsPage(0);
    });
}

function getIngredientsPage(curStartRecord) {
    if (curStartRecord > totalIngredients) {
        populateIngredientsAutocomplete(ingredientsArr)
        return;
    }

    $.getJSON("/api/ingredients/page?start_record=" + curStartRecord, ingredientsPage => {
        ingredientsArr.push(...ingredientsPage)
        console.log(ingredientsArr)

        curStartRecord += pageSize;
        getIngredientsPage(curStartRecord)
    });
}

function populateIngredientsAutocomplete(options) {
    console.log(options);
    // set_autocomplete('ingredientInput', 'ingredientComplete', options);
    // set_autocomplete('ingredientInput', 'ingredientComplete', options, start_at_letters=3, count_results=5);
    $('#ingredientInput').autocomplete();
    
}
