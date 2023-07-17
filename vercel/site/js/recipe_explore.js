$(document).ready(function () {
    $(".filter-toggle").click(function () {
        if ($(this).hasClass("btn-success")) {
            $(this).removeClass("btn-success");
            $(this).addClass("btn-warning")
        } else {
            $(this).removeClass("btn-warning");
            $(this).addClass("btn-success")
        }

        searchByFilters();
    });

    searchByFilters();
});


function searchByFilters() {
    var budgetMin = 0;
    var budgetMax = 0;
    if ($("#budget-btn-1").hasClass("btn-success")) { budgetMax = 3 } else { budgetMin = 3; }

    if ($("#budget-btn-2").hasClass("btn-success")) { budgetMax = 6; }
    else if (!$("#budget-btn-1").hasClass("btn-success")) { budgetMin = 3; }

    if ($("#budget-btn-3").hasClass("btn-success")) { budgetMax = 10; }

    if (budgetMax < budgetMin) {
        budgetMin = 0;
        budgetMax = 10;
    }


    var diffMin = 0;
    var diffMax = 10;
    if ($("#diff-btn-1").hasClass("btn-success")) { diffMax = 3 } else { diffMin = 3; }

    if ($("#diff-btn-2").hasClass("btn-success")) { diffMax = 6; }
    else if (!$("#diff-btn-1").hasClass("btn-success")) { diffMin = 3; }

    if ($("#diff-btn-3").hasClass("btn-success")) { diffMax = 10; }

    if (diffMax < diffMin) {
        diffMin = 0;
        diffMax = 10;
    }

    var cuisine = [];
    $(".filter-button").each(function () {
        if ($(this).hasClass("btn-success")) {
            cuisine.push($(this).html());
        }
    });
    console.log(cuisine)


    $.getJSON("/api/recipes/filter?bMin="+budgetMin+"&bMax="+budgetMax+"&dMin="+diffMin+"&dMax="+diffMax+"&cuisines="+cuisine.join(","), events => {
        var recipesHTML = '<div class="row row-cols-4 text-center">';
        $.each(events, function (key, recipe) {
            recipesHTML += recipeToCardHTML(recipe);
            if (key == 3) {
                recipesHTML += '</div><div class="row row-cols-4 text-center">';
            }
        })
        recipesHTML += '</div>';
        $('#search-results').html(recipesHTML);
    });

}
