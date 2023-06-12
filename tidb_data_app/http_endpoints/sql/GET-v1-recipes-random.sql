use recipes;

-- generate a list of ids from recipes with different names. Then pick 5 at random
SELECT * 
FROM recipes
WHERE name in(
  SELECT
    `name`
  FROM
    `recipes`
  GROUP BY
    `name`
  HAVING
    COUNT(1) = 1
  ORDER BY
    RAND()
  LIMIT
    ${max_results}
);

