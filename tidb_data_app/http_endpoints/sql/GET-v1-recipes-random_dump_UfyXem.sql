use recipes;

SELECT * 
FROM sorted_recipes
WHERE id = ${id}
LIMIT 1;
