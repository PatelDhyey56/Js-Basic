
--*  And Or Use
SELECT *,(price*70)/100 discounted_price FROM "Product"
where (price*70)/100 > 10000 and (price*70)/100 < 36000 ORDER BY discounted_price asc 

--* between use 
SELECT *,(price*70)/100 discounted_price FROM "Product"
where (price*70)/100 between 10000 and 36000 ORDER BY discounted_price asc 

--* in
SELECT *,(price*70)/100 discounted_price FROM "Product"
where id in(3,2) ORDER BY discounted_price asc 

--* like(~~) or not like(!~~)
--* case-insensitive matching use Ilike(~~*) , not Ilike(!~~*)
--* % _  ESCAPE use( $% ) 
SELECT *,(price*70)/100 discounted_price FROM "Product"
where name like'%op' ORDER BY discounted_price asc 

-- ---------------------------------------------------------------------------
--* COALESCE(null,0)--> check null if null it return first not null value  
--* COALESCE(null,null,0)--> return 0 

--* NULLIF(0,0)--> return null 
--* NULLIF(10,0)--> return 10 
--* NULLIF(10,50)--> return 10 

--* Ex--> 100/0 --> return Error
--*   Ans : COALESCE(100/NULLIF(0,0),0)--> return 0