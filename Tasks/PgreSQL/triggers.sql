--* create trigger function for people age validation 
create or replace function people_ageVlidator()
returns trigger  
language plpgsql as
$body$
begin
    if NEW.age < 18 then 
	   raise notice'The age is not  valid!!';
	else
		return NEW;
	end if;
end
$body$

--* Put trigger in public table 
CREATE TRIGGER people_before_insert
BEFORE INSERT
ON public."People"
FOR EACH ROW
EXECUTE FUNCTION people_ageVlidator();