USE recipes;

-- Ingredients are a string separated by commas. Split them
WITH ingredients AS (
SELECT DISTINCT
  SUBSTRING_INDEX(
    SUBSTRING_INDEX(`ingredients`, ',', `numbers`.`n`),
    ',',
    -1
  ) AS `ingredient`
FROM
  `recipes`
  JOIN (
    SELECT 1 n UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5 UNION ALL
    SELECT 6 UNION ALL
    SELECT 7 UNION ALL
    SELECT 8 UNION ALL
    SELECT 9 UNION ALL
    SELECT 10 UNION ALL
    SELECT 11 UNION ALL
    SELECT 12 UNION ALL
    SELECT 13 UNION ALL
    SELECT 14 UNION ALL
    SELECT 15 UNION ALL
    SELECT 16 UNION ALL
    SELECT 17 UNION ALL
    SELECT 18 UNION ALL
    SELECT 19 UNION ALL
    SELECT 20
  ) `numbers` ON CHAR_LENGTH(`ingredients`) - CHAR_LENGTH(
    REPLACE
      (`ingredients`, ',', '')
  ) >= `numbers`.`n` - 1
)
SELECT ingredient
FROM ingredients
  -- LIMIT ${page}, ${page_size};
ORDER BY ingredient
LIMIT ${start_record},  ${end_record};