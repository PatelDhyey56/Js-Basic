
--*  And Or Use
SELECT *,(price*70)/100 discounted_price FROM public."Product"
where (price*70)/100 > 10000 and (price*70)/100 < 36000 ORDER BY discounted_price asc 

--* between use 
SELECT *,(price*70)/100 discounted_price FROM public."Product"
where (price*70)/100 between 10000 and 36000 ORDER BY discounted_price asc 

--* in
SELECT *,(price*70)/100 discounted_price FROM public."Product"
where id in(3,2) ORDER BY discounted_price asc 

--* like(~~) or not like(!~~)
--* case-insensitive matching use Ilike(~~*) , not Ilike(!~~*)
--* % _  ESCAPE use( $% ) 
SELECT *,(price*70)/100 discounted_price FROM public."Product"
where name like'%op' ORDER BY discounted_price asc 