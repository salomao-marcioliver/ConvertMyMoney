const express = require("express")
const app = express()
const path = require("path")
const { convert, toMoney } = require('./lib/convert')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render("home")
});

app.get("/cotacao", (req, res) => {
    const { cotacao, quantidade } = req.query
    if (cotacao && quantidade) {
        const conversao = convert(cotacao, quantidade)
        res.render('cotacao', { error: false, cotacao: toMoney(cotacao), quantidade: toMoney(quantidade), conversao: toMoney(conversao) })
    }else{
        res.render('cotacao', {error: 'Valores inválidos'})
    }
})

app.listen(3000, error => {
    if (error) {
        console.log(error)
    } else {
        console.log("Servidor rodando!")
    }
})