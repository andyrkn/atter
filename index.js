var connect = require('connect');
var serveStatic = require('serve-static');

connect((request, response) => {
    console.log(request);
})
    .use(serveStatic(__dirname)).listen(3000, () => {
        console.log('Server running on 3000...\nYou can now acces the site from http://localhost:3000');
    });