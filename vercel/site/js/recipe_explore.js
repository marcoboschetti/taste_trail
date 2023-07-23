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

    $('#title-input').on('input', function (e) {
        searchByFilters();
    });

    searchByFilters();
});


function searchByFilters() {
    $(".tt-loader").slideDown();
    $("#results-container").slideUp();
    $("#results-container").empty();


    var titleInput = $("#title-input").val();
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
            var val = $(this).html();
            if (val == "International") {
                val = "None";
            }
            cuisine.push(val);
        }
    });

    $.getJSON("/api/recipes/filter?title=" + titleInput + "&bMin=" + budgetMin + "&bMax=" + budgetMax + "&dMin=" + diffMin + "&dMax=" + diffMax + "&cuisines=" + cuisine.join(","), events => {
        var recipesHTML;
        if (!events.length) {
            recipesHTML = "<h2>No recipes found. Please try with other filters</h2>"
        } else {
            recipesHTML = '<div class="row row-cols-4 text-center">';
            $.each(events, function (key, recipe) {
                recipesHTML += recipeToCardHTML(recipe);
                if (key == 3) {
                    recipesHTML += '</div><div class="row row-cols-4 text-center">';
                }
            })
            recipesHTML += '</div>';
        }

        $("#results-container").empty();
        $(".tt-loader").slideUp();
        $('#results-container').append(recipesHTML);
        $('#results-container').slideDown();
    });

}
