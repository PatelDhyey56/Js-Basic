--* -> convert data to json  
--* -> convert data to string  

--* for Array
SELECT details->'use'->>0 FROM "Product"
ORDER BY id ASC 
--* Or Write this  
SELECT details#>>'{use,0}' FROM "Product"
ORDER BY id ASC 

--* for json 
SELECT details->'details'->>'type' FROM "Product"
ORDER BY id ASC 

--* Filtering data @
SELECT * FROM "Product"
where details->'use' @>'["Technology"]'
ORDER BY id ASC  
--* Or use this
SELECT * FROM "Product"
where details @@ '$.details.type=="gaming laptop"'
ORDER BY id ASC   
-- ---------------------------------------------
SELECT * FROM "Product"
where (details->'format'->>'price')::numeric>50000
ORDER BY id ASC   