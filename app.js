var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var apiTestRouter = express.Router();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var cors = require('cors')


// app
app.use(cors())
app.set('misecreto', config.secreto);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

apiTestRouter.route('/security/login')
    .post(function(req, res) {
        console.log(req.body);

        if (req.body.Email === '1' && req.body.Password === '1') {
            var payload = {
                emailOtro: req.body.Email,
                userName: "Manuel"
            };
            console.log(payload);
            var token = jwt.sign(payload, app.get('misecreto'), {
                expiresIn: 60 * 60 // 5 minutos
            });
            console.log(token);

            res.json({
                token: token,
                expiration: token.expiration
            })
        } else {
            res.send(401);
        }
    });

apiTestRouter.route('/areasfuncionales')
    .get(function(req, res) {
        var respuesta = [{
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

apiTestRouter.route('/areasfuncionales/:id/procesos')
    .get(function(req, res) {
        var respuesta = [];

        console.info(req.params);

        if (req.params.id === '0') {
            respuesta = [{
                "id": 12,
                "nombre": "Solicitud de Vacaciones"
            }]
        }

        if (req.params.id === '1') {
            respuesta = [{
                    "id": 32,
                    "nombre": "Solicitud de Algo"
                },
                {
                    "id": 33,
                    "nombre": "Solicitud de Algo mas"
                }
            ]
        }

        if (req.params.id === '2') {
            respuesta = [{
                    "id": 22,
                    "nombre": "Solicitud de Otra cosa"
                },
                {
                    "id": 23,
                    "nombre": "Solicitud de y algo mas"
                }
            ]
        }


        res.json(respuesta);
    })

apiTestRouter.route('/procesos/:id/actividades')
    .get(function(req, res) {
        var respuesta = [];

        console.info(req.params);

        if (req.params.id === '12') {
            respuesta = [{ // GrupoActividad
                    "TipoGrupoActividad": 1,
                    "grupoActividades": [{
                        "Id": 0,
                        "Nombre": "Solicitud Vacaciones"
                    }]
                },
                { // GrupoActividad
                    "TipoGrupoActividad": 2,
                    "grupoActividades": [{
                            "Id": 1,
                            "Nombre": "Solicitud Vacaciones 1"
                        },
                        {
                            "Id": 2,
                            "Nombre": "Solicitud Vacaciones 2"
                        }
                    ]
                }
            ]
        }
        res.json(respuesta);
    })

apiTestRouter.route('/core/principal-routes/:id')
    .get(function(req, res) {
        var respuesta = [];

        if (req.params.id === '12') {
            respuesta = {
                "ruta": "rrhh-ingreso-solicitud"
            }
        }
        res.json(respuesta);
    })

app.use('/api', apiTestRouter);

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
})