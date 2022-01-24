const express = require('express')
const mysql = require('mysql')
const path = require('path')
const app = express()
const port = 3000
const urlencodedParser = express.urlencoded({extended: false});

app.set('view engine', 'hbs');
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "", 
    database: "dodopizza"
});

app.get('/', (req, res) => {
    //res.render('index.hbs');
    res.redirect('/pizza');
})
app.get('/pizza', (req, res) => {
    // SELECT * FROM `pizza`
    pool.query("SELECT * FROM `pizza`", (err, rrr) => {
        if(err) return console.log(err);
        console.log(rrr);
        res.render('pizza.hbs', {
            mass: rrr
        });
    });
})

app.get('/combos', (req, res) => {
    // SELECT * FROM `combo`
    pool.query("SELECT * FROM `combo`", (err, rrr) => {
        if(err) return console.log(err);
        console.log(rrr);
        res.render('combo.hbs', {
            cm: rrr
        });
    });
})

app.get('/snacks', (req, res) => {
    // SELECT * FROM `snacks`
    pool.query("SELECT * FROM `snacks`", (err, rrr) => {
        if(err) return console.log(err);
        console.log(rrr);
        res.render('snacks.hbs', {
            sn: rrr
        });
    });
})

app.get('/desserts', (req, res) => {
    // SELECT * FROM `desserts`
    pool.query("SELECT * FROM `desserts`", (err, rrr) => {
        if(err) return console.log(err);
        console.log(rrr);
        res.render('desserts.hbs', {
            sn: rrr
        });
    });
})

app.get('/drinks', (req, res) => {
    // SELECT * FROM `drinks`
    pool.query("SELECT * FROM `drinks`", (err, rrr) => {
        if(err) return console.log(err);
        console.log(rrr);
        res.render('drinks.hbs', {
            sn: rrr
        });
    });
})

app.get('/pizza/order/:id', (req, res) => {
    // SELECT * FROM `pizza` WHERE `id` = id
    let pizza_id = req.params.id;

    pool.query("SELECT * FROM `pizza` WHERE `id` = ?", [pizza_id], (err, rrr) => {
        if(err) return console.log(err);
        console.log(rrr);
        res.render('pizza_order.hbs', {
            pizza_name: rrr[0]['name'],
            pizza_comp: rrr[0]['comp'],
            pizza_price: rrr[0]['price']
        });
    });
})

app.get('/order/:section/:id', (req, res) => {
    // SELECT * FROM `pizza` WHERE `id` = id
    let pizza_id = req.params.id;
    let sectionid = req.params.section;

    /*
    pool.query("SELECT * FROM `pizza` WHERE `id` = ?", [pizza_id], (err, rrr) => {
        if(err) return console.log(err);
        console.log(rrr);
        res.render('pizza_order.hbs', {
            pizza_name: rrr[0]['name'],
            pizza_comp: rrr[0]['comp'],
            pizza_price: rrr[0]['price']
        });
    });
    */
    res.render('pizza_order.hbs');
})

app.post('/order/:section/:id', urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    let pizza_id = req.params.id;
    let sectionid = req.params.section;
    // request.body.userName
    let order_country = req.body.order_country;
    let order_town = req.body.order_town;
    let order_street = req.body.order_street;
    let order_home = req.body.order_home;
    let order_kv = req.body.order_kv;

    if (order_country.lenght > 60) return res.redirect('/pizza');
    if (order_town.lenght > 60) return res.redirect('/pizza');
    if (order_street.lenght > 60) return res.redirect('/pizza');
    if (order_home.lenght > 60) return res.redirect('/pizza');
    if (order_kv.lenght > 60) return res.redirect('/pizza');
    if (order_country.lenght == 0 && order_town.lenght == 0 && order_street.lenght == 0) return res.redirect('/pizza');

    let query = "INSERT INTO `orders` (`pizzaid`, `country`, `town`, `street`, `home`, `kv`, `section`) VALUES (?, ?, ?, ?, ?, ?, ?);";

    pool.query(query, [pizza_id, order_country, order_town, order_street, order_home, order_kv, sectionid], (err, rrr) => {
        if(err) return console.log(err);
        res.redirect('/pizza');
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))