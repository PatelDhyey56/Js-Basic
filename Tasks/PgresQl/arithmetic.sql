--* Arithmetic Operators

-- +  -  *  /  %
SELECT (price+1000) price FROM public."Product"
ORDER BY price DESC 

-- ^(squre) |/(root) ||/ (Cube root) @(Absolute value)
SELECT @(-(|/(id ^ 3))) id FROM public."Product"
ORDER BY id ASC 

-- for bitwise  &(And) |(or) #(xor) ~(not)  <<(right) >>(left)
SELECT (price & 3) price FROM public."Product"
ORDER BY id ASC 

-- for discounting product
SELECT (price*70)/100 discounted_price FROM public."Product"
ORDER BY discounted_price ASC 
