use recipes;

-- Get 5 random recipes 
WITH sorted_recipes AS (
  SELECT *, row_number() over (partition by LOWER(name) order by id desc) as seqnum
  FROM recipes
)
SELECT * 
FROM sorted_recipes
WHERE seqnum = 1
ORDER BY RAND()
LIMIT ${max_results};
