var totalIngredients;

function recipeToCardHTML(recipe) {
    var cuisineVal = "International";
    if (recipe.cuisine_type && recipe.cuisine_type != "None") {
        cuisineVal = recipe.cuisine_type;
    }

    var imgFileName = "recipe_"+ recipe.name.toLowerCase().replaceAll(" ","_")+".png"
    var cardHTML = `
    <div class="card">
      <img class="card-img-top" src="/site/img/recipes/`+imgFileName+`" alt="Unsplash">
      <div class="card-header">
        <h5 class="card-title mb-0">`+ recipe.name + `</h5>
      </div>
      <div class="card-body">
        <span class="badge bg-secondary">`+ cuisineVal + `</span>
        <a href="#" class="btn btn-primary">Check recipe</a>
      </div>
    </div>
`;
    return cardHTML;
}