use recipes;

SELECT * 
FROM recipes
WHERE id = ${id}
LIMIT 1;
