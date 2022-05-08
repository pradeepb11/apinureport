# apinureport
payout report 
# body
{
  "start_date":"2018-05-04 08:17:55",
"end_date":"2019-05-20 11:01:07"
}
# query
SELECT ag.user_id, ag.name, cus.mycount, cus.mySUM
from user ag
INNER JOIN (
SELECT user_id,COUNT(*) AS mycount,
SUM(amount) AS mySUM
FROM transaction 
WHERE time_stamp >= '1525402075' AND time_stamp <='1558330267'
GROUP BY user_id) cus
ON cus.user_id=ag.user_id

payin report 
# body
{
  "start_date":"2021-07-09 02:51:22",
"end_date":"2021-07-16 05:29:04"
}
# query
SELECT ag.merchant_id, ag.name, cus.mycount, cus.mySUM
from user ag
INNER JOIN (
SELECT merchant_id ,COUNT(*) AS mycount,
SUM(amount) AS mySUM
FROM nupay_transaction_log 
WHERE dnt >= '1625842282.0' AND dnt <='1625842283.0'
GROUP BY merchant_id) cus
ON cus.merchant_id=ag.merchant_id
