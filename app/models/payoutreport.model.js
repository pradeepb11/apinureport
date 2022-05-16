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
    sql.query(`select t.merchant_id, m.merchant_title,sum(t.amount) as mySUM, count(*) as mycount
    from nupay_transaction_log as t
    left join user as u
    on t.merchant_id = u.merchant_id
    left join merchant as m
    on u.merchant_id = m.merchant_id
    where
    t.reason != 'Charge'
    AND t.status in ('success', 'COMPLETED','Transaction Successful')
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

    sql.query(`select count(nupay_transaction_id) as 'SuccessPayoutTxnCount',
    sum(amount) as 'SuccessPayoutTxnAmount'
    from nupay_transaction_log
    where
    reason != 'Charge'
    and
    status in ('success','COMPLETED','Transaction Successful')
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

    sql.query(`select count(nupay_transaction_id) as 'FailurePayoutTxnCount',
    sum(amount) as 'FailurePayoutTxnAmount'
    from nupay_transaction_log
    where 
    reason != 'Charge'
    and
    status not in ('success','COMPLETED','Transaction Successful')
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


payoutReport.getlThisMonthamtPayout = ({ starttimestamp, endtimestamp }, result) => {
    sql.query(`select date(from_unixtime(dnt)) as 'Date', sum(amount) as 'TotalAmount'
    from nupay_transaction_log
    where status in ('success', 'COMPLETED','Transaction Successful') and
    dnt >= ${starttimestamp} AND dnt <= ${endtimestamp}
    group by date(from_unixtime(dnt));`, (err, res) => {

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