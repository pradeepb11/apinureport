// const { query } = require('express');
// const querys = require('../config/db.config.js');

const sql = require("./db.js");

//constructor
const payinReport = (payinreport) => {
    this.nupay_transaction_id = payoutreport.nupay_transaction_id;
    this.merchant_id = payoutreport.merchant_id,
        this.dnt = payoutreport.dnt;
    this.amount = payoutreport.amount
}

payinReport.getTrastion = ({ starttimestamp, endtimestamp }, result) => {
    // console.log(result)
    sql.query(`select u.merchant_id,u.name, sum(t.amount) as mySUM, count(*) as mycount
  from transaction as t, user as u
  where
  t.user_id = u.user_id
  AND t.result = 6
  AND
  t.time_stamp >= ${starttimestamp} AND t.time_stamp <= ${endtimestamp}
  group by u.name, u.merchant_id 
  order by u.merchant_id asc`,
        (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("tutorials: ", res);
            result(null, res);
        })
}


payinReport.totalamtNcountSucessPayin = ({ starttimestamp, endtimestamp }, result) => {

    sql.query(`select count(transaction_id) as 'Success Payin Txn Count',
    sum(amount) as 'Success Payin Txn Amount'
    from transaction
    where result = 6 and time_stamp >= ${starttimestamp} AND time_stamp <=  ${endtimestamp}  `, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("Sucess Payout: ", res);
        result(null, res);
    })
}

payinReport.totalamtNcountFailure = ({ starttimestamp, endtimestamp }, result) => {

    sql.query(`select count(transaction_id) as 'Failure Payout Txn Count',
    sum(amount) as 'Failure Payout Txn Count'
    from transaction
    where result != 6 and time_stamp >= ${starttimestamp} AND time_stamp <= ${endtimestamp}  `, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("Sucess Payout: ", res);
        result(null, res);
    })
}

module.exports = payinReport;