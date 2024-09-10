--*  without using offset
--* get last page id and fetch data using previous and next direction 
SELECT * FROM public."People" where id>10 ORDER BY id ASC limit 10

--* like in pre
SELECT * FROM public."People" where id<10
ORDER BY id DESC limit 10

--* in next 
SELECT * FROM public."People" where id>10
ORDER BY id ASC limit 10

--* use for Both incrising and dicrising order With pagination query  
select t.* 
from (
	SELECT * FROM "People"
	where id < 62 order by id desc limit 10
) t
order by id asc 