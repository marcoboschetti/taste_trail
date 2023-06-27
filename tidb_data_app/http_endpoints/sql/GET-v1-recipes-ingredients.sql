use recipes;

WITH filtered_recipes AS(
  SELECT *, row_number() over (partition by LOWER(name) order by id desc) as seqnum
  FROM recipes
  WHERE LOWER(ingredients) LIKE CONCAT('%',LOWER(${q1}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q2}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q3}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q4}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q5}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q6}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q7}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q8}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q9}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q10}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q11}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q12}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q13}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q14}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q15}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q16}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q17}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q18}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q19}),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(${q20}),'%')
)
SELECT *
FROM filtered_recipes 
WHERE seqnum = 1
LIMIT ${max_results};
