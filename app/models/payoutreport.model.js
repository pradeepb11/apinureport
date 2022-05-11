// const { query } = require('express');
// const querys = require('../config/db.config.js');

const sql = require("./db.js");

//constructor
const payoutReport = (payoutreport) => {
    this.transaction_id = payoutreport.transaction_id;
    this.user_id = payoutreport.user_id,
        this.time_stamp = payoutreport.time_stamp;
    this.amount = payoutreport.amount
}

payoutReport.getTrastion = ({ starttimestamp, endtimestamp }, result) => {
    // console.log(result)
    sql.query(`select t.merchant_id, u.name, sum(t.amount) as mySUM, count(*) as mycount
  from nupay_transaction_log as t, user as u
  where
  t.merchant_id = u.merchant_id
  AND t.status = 'success'
  AND
  t.dnt >= ${starttimestamp} AND t.dnt <= ${endtimestamp}
  group by u.name, t.merchant_id
  order by t.merchant_id asc;`,
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

payoutReport.totalamtNcountSuccess = ({ starttimestamp, endtimestamp }, result) => {

    sql.query(`select count(nupay_transaction_id) as 'Success Payout Txn Count',
    sum(amount) as 'Success Payout Txn Amount'
    from nupay_transaction_log
    where status in ('success','COMPLETED')
    and dnt >= ${starttimestamp} AND dnt <= ${endtimestamp} ;`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Sucess Payout: ", res);
        result(null, res);
    })
}

payoutReport.totalamtNcountFailure = ({ starttimestamp, endtimestamp }, result) => {

    sql.query(`select count(nupay_transaction_id) as 'Failure Payout Txn Count',
    sum(amount) as 'Failure Payout Txn Amount'
    from nupay_transaction_log
    where status not in ('success','COMPLETED')
    and dnt >= ${starttimestamp} AND dnt <= ${endtimestamp} ;  `, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("Sucess Payout: ", res);
        result(null, res);
    })
}

module.exports = payoutReport;