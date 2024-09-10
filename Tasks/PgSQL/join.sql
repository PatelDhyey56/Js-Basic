--* Left Join 
select people.id,name,age,gender,order_date,address from "orders" 
left join "People" people on
people.id = orders.person_id 

--*Right join 
select people.id,name,age,gender,price,order_date,COALESCE(address,'')address  from "orders" 
right join "People" people on
people.id = orders.person_id 
--* modified condition
select people.id,name,age,gender,price,order_date,COALESCE(address,'')address  from "orders" 
right join "People" people on
people.id = orders.person_id 


--* Full outer join 
select * from "orders" 
full outer join "People" people on
people.id =orders.person_id 

--* Inner Join
select people.id,name,gender,age,address,"orders".id order_id,price,order_date  from "orders" 
INNER join "People" people on
people.id = orders.person_id 


--* join with group by 
--* total No of order by people in month of octomber which is > 150$
select people.id,name,gender,age,count(*) total_order,sum(price) price  from "orders" 
INNER join "People" people on
people.id = orders.person_id 
where extract(month from order_date)=10
group by people.id 
having sum(price)>150