--* Left Join 
select people.id,name,age,gender,order_date,address from public."orders" 
left join public."People" people on
people.id = public."orders"."person_id"

--*Right join 
select people.id,name,age,gender,price,order_date,COALESCE(address,'')address  from public."orders" 
right join public."People" people on
people.id = public."orders"."person_id"
--* modified condition
select people.id,name,age,gender,price,order_date,COALESCE(address,'')address  from public."orders" 
right join public."People" people on
people.id = public."orders"."person_id"


--* Full outer join 
select * from public."orders" 
full outer join public."People" people on
people.id = public."orders"."person_id"

--* Inner Join
select people.id,name,gender,age,address,public."orders".id order_id,price,order_date  from public."orders" 
INNER join public."People" people on
people.id = public."orders"."person_id" 


--* join with group by 
--* total No of order by people in month of octomber which is > 150$
select people.id,name,gender,age,count(*) total_order,sum(price) price  from public."orders" 
INNER join public."People" people on
people.id = public."orders"."person_id" 
where extract(month from order_date)=10
group by people.id 
having sum(price)>150