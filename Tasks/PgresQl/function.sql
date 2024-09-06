--* return multiple things in function
--* 1) setof 
--* 2) Table with dafination 
--*     Ex :- Table (id numeric, name varchar , age numeric , gende rvarchar)

--* create function in SQl
create or replace function male_people(gender varchar)
returns setof public."People" as
$body$
 select * from public."People" where gender=gender
$body$
language sql

--* Call function
select (male_people('male'))

-- /---------------------------------------------------------------------------
--* create function in PS/PGSQL 

create or replace function people_gender(gender_type varchar)
returns setof public."People" as
$body$
begin
 return query select * from public."People" where gender=gender_type;
end
$body$
language plpgsql

--* Call Function for multiple return retrivel
select (people_gender('male')).*
--* for column values
--TODO select (people_gender('male')).name 

-- /---------------------------------------------------------------------------
--* With declare variable use in function defination
create or replace function people_gender(gender_type varchar)
returns setof public."People" as
$body$
for declareing some
declare 
 data record
begin
 return query select * from public."People" where gender=gender_type;
end
$body$
language plpgsql


-- /---------------------------------------------------------------------------
--* for Define function perameter and return types in function defination
create or replace function people_gender(In bd_year int,out name varchar,
out age varchar ,out day varchar,out month varchar)
$body$
begin
 return query 
 select extrect(month from bith_date) as month ,
 extrect(day from bith_date) as day ,
 age,name into name, age , day , month
 from public."People" where extrect(year from bith_date)=bd_year
 limit 1;
end
$body$
language plpgsql