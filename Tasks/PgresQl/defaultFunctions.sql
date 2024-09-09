--*  random() | pi()

--* power(val,powerof)-->return ans | sqrt(val) | cbrt(val)-->cube root 
--* factorial(val) | abs(val)-->Positive value 
--* ceil(val) | floor(val)
--* round(val, point values) | trim_scale(val)-->remove Zero's | trunc(val,point values)-->convert to samll value in digit
select sqrt(power(round(random()*10),2))

--* gcd(val1,val2) | lcm(val1,val2) | mod(val1,val2)-->%,

--* log(val) | radians(val)-->return a radians value  
--* sin | cos | cot | tan |  tan2(val1,val2)
--* sin(val) | asign(val)-->Inverse use sind(val)-->with digree 

--* Extract(value from val) --> day | month | year |  
SELECT * FROM public.orders
where extract(month from order_date)=1 and extract(day from order_date)=2 
