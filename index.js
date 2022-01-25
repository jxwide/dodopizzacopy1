const e = require('express')
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 3000
const urlencodedParser = express.urlencoded({extended: false});

app.set('view engine', 'hbs');
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "", 
    database: "dodopizza"
});

app.use(cookieParser('234472333'))

app.get('/', (req, res) => {
    //res.render('index.hbs');
    res.redirect('/pizza');
    
})
app.get('/pizza', (req, res) => {
    // SELECT * FROM `pizza`
    //console.log(req.cookies.comboenters);

    pool.query("SELECT * FROM `pizza`", (err, rrr) => {
        if(err) return console.log(err);
        res.render('pizza.hbs', {
            mass: rrr
        });
    });
})

app.get('/combos', (req, res) => {
    //res.cookie('comboenters', '123')
    // SELECT * FROM `combo`
    pool.query("SELECT * FROM `combo`", (err, rrr) => {
        if(err) return console.log(err);
        res.render('combo.hbs', {
            cm: rrr
        });
    });
})

app.get('/snacks', (req, res) => {
    // SELECT * FROM `snacks`
    pool.query("SELECT * FROM `snacks`", (err, rrr) => {
        if(err) return console.log(err);
        res.render('snacks.hbs', {
            sn: rrr
        });
    });
})

app.get('/desserts', (req, res) => {
    // SELECT * FROM `desserts`
    pool.query("SELECT * FROM `desserts`", (err, rrr) => {
        if(err) return console.log(err);
        res.render('desserts.hbs', {
            sn: rrr
        });
    });
})

app.get('/drinks', (req, res) => {
    // SELECT * FROM `drinks`
    pool.query("SELECT * FROM `drinks`", (err, rrr) => {
        if(err) return console.log(err);
        res.render('drinks.hbs', {
            sn: rrr
        });
    });
})

app.get('/lk', (req, res) => {
    // SELECT * FROM `combo`
    //pool.query("SELECT * FROM `combo`", (err, rrr) => {
    //    if(err) return console.log(err);
    //    console.log(rrr);
    //    res.render('combo.hbs', {
    //        cm: rrr
    //    });
    //});
    cookie_loginned = req.cookies.loginned;
    cookie_login = req.cookies.login;
    cookie_pass = req.cookies.pass;
    if (cookie_loginned)
    {
        pool.query("SELECT `pass` FROM `users` WHERE `login` = ?", [cookie_login], (err, rrr) => {
            if(err) return console.log(err);
            if(rrr[0] == undefined)
            {
                cookie_loginned = false;
                return res.redirect('/lk/login')     
            }
            if (rrr[0]['pass'] == cookie_pass) {
                // аккаунт существует
                // norm
                res.render('lk.hbs')
            } else {
                cookie_loginned = false;
                return res.redirect('/lk/login')
            }
        });
    } else res.redirect('/lk/login')
})

app.get('/exit', (req, res) => {
    res.clearCookie('loginned');
    res.clearCookie('login');
    res.clearCookie('pass');
    res.redirect('/')
})

app.get('/lk/register', (req, res) => {
    res.render('lk_register.hbs')
})

app.get('/lk/login', (req, res) => {
    res.render('lk_login.hbs')
})

app.post('/lk/register', urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let input_email = req.body.input_email;
    let input_pass = req.body.input_pass;


    if (input_email.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Слишком длинный Email'});
    if (input_pass.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Слишком длинный пароль'});
    if (input_email.length == 0 || input_pass.lenght == 0) return res.render('msg.hbs', {title: 'Ошибка', text: 'Заполните поля'});

    pool.query("SELECT * FROM `users` WHERE `login` = ?", [input_email], (err, rrr) => {
        if(err) return console.log(err);

        if(rrr[0] == undefined)
        {
            pool.query("INSERT INTO `users` (`login`, `pass`) VALUES (?, ?)", [input_email, input_pass], (err, rrr) => {
                if(err) return console.log(err);
                res.cookie('loginned', true)
                res.cookie('login', input_email)
                res.cookie('pass', input_pass)
                res.render('msg.hbs', {title: 'Успешно', text: 'Аккаунт создан'});
            });
        } else res.render('msg.hbs', {title: 'Ошибка', text: 'Аккаунт уже существует'});
    });
})

app.post('/lk/login', urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let input_email = req.body.input_email;
    let input_pass = req.body.input_pass;

    if (input_email.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Слишком длинный Email'});
    if (input_pass.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Слишком длинный пароль'});
    if (input_email.lenght == 0 && input_pass.lenght == 0) return res.render('msg.hbs', {title: 'Ошибка', text: 'Заполните поля'});

    pool.query("SELECT `pass` FROM `users` WHERE `login` = ?", [input_email], (err, rrr) => {
        if(err) return console.log(err);
        if(rrr[0] == undefined) return res.render('msg.hbs', {title: 'Ошибка', text: 'Неверный логин или пароль'});
        if (rrr[0]['pass'] == input_pass) {
            // аккаунт существует
            res.cookie('loginned', true)
            res.cookie('login', input_email)
            res.cookie('pass', input_pass)
            return res.render('msg.hbs', {title: 'Успешно', text: 'Вход в аккаунт выполнен'});
        } else {
            return res.render('msg.hbs', {title: 'Ошибка', text: 'Неверный логин или пароль'});
        }
    });
})

app.get('/pizza/order/:id', (req, res) => {
    // SELECT * FROM `pizza` WHERE `id` = id
    let pizza_id = req.params.id;

    pool.query("SELECT * FROM `pizza` WHERE `id` = ?", [pizza_id], (err, rrr) => {
        if(err) return console.log(err);
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

    if (order_country.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Проверьте данные'});
    if (order_town.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Проверьте данные'});
    if (order_street.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Проверьте данные'});
    if (order_home.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Проверьте данные'});
    if (order_kv.lenght > 60) return res.render('msg.hbs', {title: 'Ошибка', text: 'Проверьте данные'});
    if (order_country.lenght == 0 && order_town.lenght == 0 && order_street.lenght == 0) return res.render('msg.hbs', {title: 'Ошибка', text: 'Проверьте данные'});

    let query = "INSERT INTO `orders` (`pizzaid`, `country`, `town`, `street`, `home`, `kv`, `section`) VALUES (?, ?, ?, ?, ?, ?, ?);";

    pool.query(query, [pizza_id, order_country, order_town, order_street, order_home, order_kv, sectionid], (err, rrr) => {
        if(err) return console.log(err);
        res.render('msg.hbs', {title: 'Заказ принят', text: 'Ожидайте заказ.'});
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))