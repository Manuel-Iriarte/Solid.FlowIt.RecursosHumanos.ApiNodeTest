var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var apiTestRouter = express.Router();

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var config = require('./config');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var cors = require('cors')


// app
app.use(cors())
app.set('misecreto', config.secreto);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

apiTestRouter.route('/security/login')
.post(function(req, res){
    console.log(req.body.email);

    var payload = {
        email : req.body.email
    };

    var token = jwt.sign(payload, app.get('misecreto'), {
        expiresIn: 60*5 // 5 minutos
      });

    res.json({
        token: token,
        expiration:token.expiration
    })
});

apiTestRouter.route('/areafuncional')
    .get(function(req, res){
        var respuesta = 
        [{
                "id": 0,
                "nombre": "Recursos Humanos",
                "procesos": null
            },
            {
                "id": 1,
                "nombre": "Finanzas",
                "procesos": null
            },
            {
                "id": 2,
                "nombre": "Administración",
                "procesos": null
            }
            ]

        res.json(respuesta)
    });

apiTestRouter.route('/proceso/:id')
    .get(function(req, res){
        var respuesta = [];

        console.info(req.params);

        if(req.params.id === '0' ){
            respuesta = [
                {
                    "id":12,
                    "nombre": "Solicitud de Vacaciones"
                }
            ]
        }

        if(req.params.id === '1' ){
            respuesta = [
                {
                    "id":32,
                    "nombre": "Solicitud de Algo"
                },
                {
                    "id":33,
                    "nombre": "Solicitud de Algo mas"
                }
            ]
        }

        if(req.params.id === '2' ){
            respuesta = [
                {
                    "id":22,
                    "nombre": "Solicitud de Otra cosa"
                },
                {
                    "id":23,
                    "nombre": "Solicitud de y algo mas"
                }
            ]
        }
        

        res.json(respuesta);
    })

app.use('/api', apiTestRouter);

app.listen(port, function(){
    console.log('Running on PORT: ' + port);
})

