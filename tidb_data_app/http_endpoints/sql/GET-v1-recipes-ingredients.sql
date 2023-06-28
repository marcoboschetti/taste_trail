use recipes;

WITH filtered_recipes AS(
  SELECT *, row_number() over (partition by LOWER(name) order by id desc) as seqnum
  FROM recipes
  WHERE LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q1},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q2},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q3},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q4},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q5},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q6},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q7},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q8},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q9},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q10},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q11},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q12},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q13},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q14},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q15},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q16},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q17},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q18},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q19},'_',' ')),'%')
  AND LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q20},'_',' ')),'%')
)
SELECT *
FROM filtered_recipes 
WHERE seqnum = 1
LIMIT ${max_results};
