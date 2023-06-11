use events;
-- SELECT the id and name of 5 random records that have different names
WITH selected AS (
  SELECT
    `id`,
    `name`
  FROM
    `event_template`
  WHERE
    `name` NOT IN(
      SELECT
        `name`
      FROM
        `event_template`
      GROUP BY
        `name`
      HAVING
        COUNT(*) > 1
    )
  ORDER BY
    RAND()
  LIMIT
    ${limit}
)
SELECT *
FROM event_template
WHERE id IN (SELECT id FROM selected);