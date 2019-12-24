const axios = require('axios').default;
const Qs = require('qs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8011;
const app = express();

const CONFIG = {
    baseURL: 'http://www.ad.siemens.isoftstone.com/LPAMSDEV/cnlp'
};

app.use(bodyParser.urlencoded({
    // extended: false
}));

app.all('*', (req, res, next)=>{
    axios.request({
        url: CONFIG.baseURL + req.url,
        method: req.method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': req.headers['authorization'] || req.headers['Authorization']
        },
        data: Qs.stringify(req.body),
    }).then(data=>{
        res.status(data.status).json((data.data));
        res.end();
    }).catch(err=>{
        res.status(err.response.status).json(err.response.data);
        res.end();
    })
});

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`);
});
