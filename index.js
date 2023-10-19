const express = require('express')
const app = express()
//express app 을 선언을 하고, listen 메서드를 요청하는 코드 사이에서 여러가지 라우팅 세팅을 할 수 있다.
const port = 3000
app.use(express.static('public'));
// Static 파일을 선언하기. 라우팅 규칙 세팅 이전에 사용 선언. 선언한 디렉토리에 있는 파일을 불러올 수 있다.

app.use(express.urlencoded({extended: false}))
// http 요청에서 body 부분에 해당하는 부분을 받아 올 수 있게 된다.
// 받아 오지 않으면 post 요청에서 값을 읽어 오지 못한다.

app.set('view engine', 'ejs')
app.set('view engine', 'pug')
// template engine 사용 ejs, pug 등...
// express 에서 template engine 을 사용하고자 할 때, 지켜야하는 규칙 중 하나는 다음과 같다.
// template engine 으로 만들어진 파일은 반드시 views 폴더 내에 위치해야한다.



app.get('/test', (req, res) => {
  res.send('test')
})
// send 를 통해 문자열을 전달
// send 를 사용하기보다는 온전한 파일을 전달하는 것이 더 좋은 방법이다.

app.get('/calculator', (req,res) =>{
    let result = Number(req.query.num1) + Number(req.query.num2)
    res.send(`계산결과 = ${result}`)
})

app.post('/calculator', (req,res) =>{
    console.log(req.body)
    let result = Number(req.body.num1) + Number(req.body.num2)
    res.render('result', { title: 'Hey', result: result})
})
// post 요청을 통해 접근하는 URL 을 보면 query 문이 없음을 확인할 수 있다.
// post 요청을 통해서 접근하는 값은 body 를 통해 가져온다. app.use 요청 코드 부분을 확인하라.
// sendFile 을 통해 사용자가 요청하면 온전한 파일은 보내지만, 저장한 result 변수를 보낼 수 없는 이슈가 발생한다.
// 클라이언트 단에서도 서버가 보내는 데이터를 잘 받을 수 있도록 template engine 을 사용할 순간이다.
// index.html 에서 form 태그를 통해 post 요청을 하여 보낸 input 값을 서버에서 받아왔다.
// 이 받아 온 값도 사용하면서 result.html 이라는 파일도 같이 클라이언트에게 보내주기 위해서는 render가 필요하다. 
// render의 경우 template engine으로 만들어진 파일을 보여줄 수도 있고, js data 를 넘겨줄 수 있다. (+ 유지 보수 및 속도 측면에서 장점)
// 공식문서의 template engine 사용 방법 확인
// render 메서드로 요청한다.

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
  })
// sendFile 을 통해 경로를 지정하여 파일을 불러옴

app.all("*", (req, res) => {
    res.status(404).send("찾을 수 없는 페이지입니다!")
})
// 응답에 관련된 메서드는 공식문서의 API reference 4.x - Response 등을 참고
// 위에서는 res.send(), res.sendFile(), res.status 를 사용해보았다.
// 많이 사용하는 메서드로는 res.json(), res.render() 등이 있다.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})