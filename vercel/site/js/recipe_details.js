$(document).ready(function () {
    $("#print-recipe").click(printDetails);

    var id = getUrlVars()["id"];
    $.getJSON("/api/recipes/id?id=" + id, recipe => {
        console.log("IID", id, "!", recipe);

        var imgFileName = "/site/img/recipes/recipe_" + recipe.name.toLowerCase().replaceAll(" ", "_") + ".png"
        $("#main-image").attr("src", imgFileName);
        $("#recipe-id").html(recipe.id);
        $("#recipe-title").html(recipe.name);


        var ingredients = recipe.ingredients.split(",");
        var ingredientsHTML = '<div class="col-md-4"> <ul>';
        $.each(ingredients, function (key, i) {
            ingredientsHTML += '<li>' + i + '</li>'
            if (key == Math.floor(ingredients.length / 3) || key == Math.floor(ingredients.length / 3) * 2) {
                ingredientsHTML += '<ul></div><div class="col-md-4"> <ul>'
            }
        });
        ingredientsHTML += '<ul></div>'
        $("#ingredients-container").html(ingredientsHTML);




        var instructionsHTML = '<ul class="list-group list-group-flush">';
        var instructionIdx = 1;
        recipe.instructions.split(/[0-9]+\. /).forEach(i => {
            if (i) {
                instructionsHTML += '<li class="list-group-item">' + instructionIdx + ". " + i + '</li>'
                instructionIdx += 1;
            }
        });
        instructionsHTML += '<ul></div>'
        $("#instructions-container").html(instructionsHTML);

        $("#cooking-time").html(recipe.cooking_time);
        $("#servings").html(recipe.serving_size);
        $("#cuisine-tag").html(recipe.cuisine_type);


        $("#preparation-time").html(recipe.preparation_time);
        $("#budget-bar").css("width", (recipe.budget / 10 * 100) + "%")
        $("#difficulty-bar").css("width", (recipe.difficulty_level / 10 * 100) + "%")


        // recipe.dietary_restrictions
        // recipe.tags


        $(".loader").remove();
        $(".after-loading").removeAttr("hidden");
    });

});


function printDetails() {
    window.print();
}