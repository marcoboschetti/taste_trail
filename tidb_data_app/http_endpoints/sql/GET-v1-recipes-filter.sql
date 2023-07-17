-- Return a list of recipes based on input filters. It should include min and max budget, min and max complexity and a list of cuisine types 
use recipes;

SELECT *
FROM recipes 
WHERE difficulty_level >= ${min_difficulty}
	AND difficulty_level <= ${max_difficulty}
	AND budget >= ${min_budget}
	AND budget <= ${max_budget}
  	AND (CHAR_LENGTH(${title_query}) = 0 OR LOWER(name) LIKE CONCAT("%",LOWER(${title_query}),"%")) 
  	AND LOWER(cuisine_type) IN (
      LOWER(${q1}),
      LOWER(${q2}),
      LOWER(${q3}),
      LOWER(${q4}),
      LOWER(${q5}),
      LOWER(${q6}),
      LOWER(${q7}),
      LOWER(${q8}),
      LOWER(${q9}),
      LOWER(${q10}),
      LOWER(${q11}),
      LOWER(${q12}),
      LOWER(${q13}),
      LOWER(${q14})
  )
ORDER BY id DESC
LIMIT ${max_results};