const payinReports = require('../models/payinreport.model');
const timestamp = require('time-stamp');
var moment = require('moment');
//// Retrieve all Tutorials from the database (with condition).

exports.findByDate = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [req.body, "pending"];
    const filters = req.body;


    let startDate = filters.start_date;
    let endDate = filters.end_date;
    // let starttimestamp =  Date.parse("2018-05-04 8:17:55 ") / 1000;

    let starttimestamp = Date.parse(startDate) / 1000;
    let endtimestamp = Date.parse(endDate) / 1000;
    // let starttimestamp  = '1641493800.0';
    // let endtimestamp =  '1641580200.0';
    // const time_stamp = {starttimestamp,endtimestamp }

    console.log(starttimestamp, endtimestamp);

    payinReports.getTrastion({ starttimestamp, endtimestamp }, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        else res.status(200).json({
            status: "success",
            length: data ?.length,
            data: data,
        });
    })




};

exports.retrivetodaydatasucessPayin = async (req, res, next) => {

    var start = moment().startOf('day'); // set to 12:00 am today
    // console.log(start)
    var end = moment().endOf('day'); // set to 23:59 pm today
    // console.log(end)
    var starttimestamp = Math.floor(start / 1000);
    var endtimestamp = Math.floor(end / 1000);
    // console.log(starttimestamp, endtimestamp);
    await payinReports.totalamtNcountSucessPayin({ starttimestamp, endtimestamp }, (err, data) => {
        console.log(data)
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        else res.status(200).json({
            status: "success",
            length: data ?.length,
            data: data,
        });
    })

}

exports.retrivetodaydataFailurePayin = async(req, res, next) => {

  var start = moment().startOf('day'); // set to 12:00 am today
  // console.log(start)
  var end = moment().endOf('day'); // set to 23:59 pm today
  // console.log(end)
  var starttimestamp = Math.floor(start / 1000);
  var endtimestamp = Math.floor(end / 1000);
  // console.log(starttimestamp, endtimestamp);
  await payinReports.totalamtNcountFailure({ starttimestamp, endtimestamp }, (err, data) => {
      console.log(data)
      if (err)
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving tutorials."
          });
      else res.status(200).json({
          status: "success",
          length: data ?.length,
          data: data,
      });
  })

}