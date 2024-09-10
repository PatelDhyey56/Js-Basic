-- Group By using having Condition 
SELECT  gender,count(*) total 
FROM "People"
where id>30
group by gender 
having count(*)>50
ORDER BY gender desc
limit 10 offset 0