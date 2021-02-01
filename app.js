const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = 3000
const DB = require('./DB')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/watch', async(req,res)=>{
  const stuRes = await DB.find('stuData',{})
  console.log(stuRes);
  res.send(stuRes)
})
app.post('/add', async (req, res) => {
  const { stuId, rand } = req.body
  if(!stuId || !rand) {
    res.send('error error')
  }
  const stuRes = await DB.find('stuData', {'stuId':stuId})
  if(stuRes.length){
    // 更新操作
    const settingRes = await DB.update('stuData',{'stuId':stuId},{'rand':rand})
    res.send({
      msg:'update success'
    })
  }else{
    // 添加操作
    const settingRes = await DB.insert('stuData', {'stuId':stuId, 'rand':rand})
    res.send({
      msg:'insert success'
    })
  }
})
app.listen(port, () => console.log(`服务开启成功`))