--* Transaction use for safe data manuplation (begin,commit,rollback)
--* if all query run successfully (without error) then
--*             then all query execute 
--*             else all query terminated
begin;
INSERT into "People"(name,age,gender) values('dhyey',228,'male') ;
commit;

--* this query not execute becouse of in 2'd query give Error 
--*                  so it not insert 1'st one also  
begin;
INSERT into "People"(name,age,gender) values('dhyey',20,'male') ;
INSERT into "People"(name,gender) values('dhyey','male') ;
commit;

--* gives Error   so it not insert any data   
begin;
INSERT into "People"(name,age,gender) values('dhyey',20,'male') ;
INSERT into "People"(name,age,gender) values('dhyey','288','male') ;
delete from "People" where ids =1;
commit;
--* solution is give true column name 
begin;
INSERT into "People"(name,age,gender) values('dhyey',20,'male') ;
INSERT into "People"(name,age,gender) values('dhyey','288','male') ;
delete from "People" where id =1;
commit; 