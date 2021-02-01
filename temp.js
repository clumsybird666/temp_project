var schedule = require('node-schedule');
const { default: axios } = require("axios");
const DB = require('./DB')
var rule = new schedule.RecurrenceRule();
rule.hour =0;
rule.minute =0;
rule.second =0;
var j = schedule.scheduleJob(rule, async function(){
  const url = 'https://bfxyrun.hebeinu.edu.cn/__WeChat_API__/execPage/ajax/jkjl_save.php'
  const stuRes = await DB.find('stuData',{})
  for (let i = 0; i < stuRes.length; i++) {
      // 早上体温填报
  axios({
    url: url,
    method:'POST',
    data:`action=jkjlSave&stuid=${stuRes[i].stuId}&rand=${stuRes[i].rand}&temp=36.6&A01=%E5%90%A6&A02=%E5%90%A6&A03=%E6%97%A0&A04=&A05=&A06=&A07=&A08=&A10=&A11=&A12=&A13=&A14=&A15=&sAddr=&countryS=&cityS=&proS=&wcflag=0&num=1`,
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  }).then(res=>{
    console.log(res.data);
  })
  // 中文体温填报
  axios({
    url: url,
    method:'POST',
    data:`action=jkjlSave&stuid=${stuRes[i].stuId}&rand=${stuRes[i].rand}&temp=36.6&A01=%E5%90%A6&A02=%E5%90%A6&A03=%E6%97%A0&A04=&A05=&A06=&A07=&A08=&A10=&A11=&A12=&A13=&A14=&A15=&sAddr=&countryS=&cityS=&proS=&wcflag=0&num=2`,
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  }).then(res=>{
    console.log(res.data);
  })
  }
});