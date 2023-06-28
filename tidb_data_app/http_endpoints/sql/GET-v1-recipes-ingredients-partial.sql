use recipes;

-- get recipes and a new column from "match_score" that is 1 if the ingredients contains the word "salt", else 0

use recipes;

WITH filtered_recipes AS(
  SELECT *, 
  row_number() over (partition by LOWER(name) order by id desc) as seqnum,
  (
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q1},'_',' ')),'%') THEN 1 ELSE 0 END +
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q2},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q3},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q4},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q5},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q6},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q7},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q8},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q9},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q10},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q11},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q12},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q13},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q14},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q15},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q16},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q17},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q18},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q19},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q20},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q21},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q21},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q23},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q24},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q25},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q26},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q27},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q28},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q29},'_',' ')),'%') THEN 1 ELSE 0 END + 
    CASE WHEN LOWER(ingredients) LIKE CONCAT('%',LOWER(REPLACE(${q30},'_',' ')),'%') THEN 1 ELSE 0 END
  ) as match_score
  FROM recipes
)
SELECT *
FROM filtered_recipes 
WHERE seqnum = 1
AND match_score > 0
ORDER BY match_score DESC
LIMIT ${max_results};