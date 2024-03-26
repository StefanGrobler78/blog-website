import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000 || process.env.PORT;

let userIsLogged = false;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const passwordCheck = (req, res, next) => {
    const username = req.body["username"];
    const password = req.body["password"];
    if (password === "blog" && username === "sfg") {
        userIsLogged = true;
    }
    next();
  }
  app.use(passwordCheck);
    app.post('/login', (req, res) => {
        if (userIsLogged) {
            res.redirect('/admin');
        } else {
            res.redirect('/login');
        }
    });
app.post('/submit', (req, res) => {
    const title = req.body["blog-title"];
    const content = req.body["blog-body"];  
    const blogPost = [];
    if(title && content){
        blogPost.push({title, content});
        res.render('layout.ejs', {
            title: title,
            content: content
        });
    }
    else{
        res.redirect('/');
    }
});
app.delete('/', (req, res) => {
    const blogPost = [];
    res.redirect('/');
})
app.patch('/', (req, res) => {
    const blogPost = [];
    res.redirect('/');
})

// Routes
app.get('/', (req, res) => res.render('layout.ejs'));
app.get('/login', (req, res) => res.render('login.ejs'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));