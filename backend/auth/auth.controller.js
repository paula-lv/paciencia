const User = require('./auth.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'tfgpaula';
const { createTokens, getDatosToken } = require('../JWT.js'); 
const cookieParser = require('cookie-parser');

exports.createUser = async ( req, res )=> {
    console.log(req.body)
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email, 
            psw: bcrypt.hashSync(req.body.psw),
            tipo: req.body.tipo,
        }
    
        /*const user = await User.create (newUser, (err, user)=> {
            if(err && err.code == 11000) return res.status(409).send('El email ya existe');
            if (err) return res.status(500).send('Server error');
    
            const dataUser = {
                name: user.name,
                email: user.email,
            }
    
            //response
            res.send({ dataUser });
        });*/

        const user = await User.create(newUser);
        const respuesta = {
            name: user.name,
            email: user.email

        }
        console.log(user)
        res.json(respuesta);


    } catch(error) {
        res.json({error: error.message})
    }
    
}

exports.loginUser = async (req, res, next)=> {
    const userData = {
        email: req.body.email,
        psw: req.body.psw,
    }

    const user = await User.findOne({email: userData.email});
    console.log("usuario lindoooo" + user);

    if (user) {
        console.log("entra en el if")
        let tipoUsuario;

        const resultPassword = bcrypt.compareSync(userData.psw, user.psw); //devuelve true si la psw coincide con bd
        console.log(resultPassword)
        if (resultPassword) {

            const accessToken = createTokens(user);

            await res.cookie("access-token", accessToken, {
                maxAge: 24*60*60*30*1000,
                sameSite: 'lax',
                httpOnly: false,
            });
            if(user.tipo == 'regular') //user
                tipoUsuario = 83648205;
            if(user.tipo == 'admin') //admin
                tipoUsuario = 93847561;

            await res.cookie("tipo-usuario", tipoUsuario, {
                maxAge: 24*60*60*30*1000,
                sameSite: 'lax',
                httpOnly: false,
            });

            const dataUser = {
                name: user.name,
                email: user.email,
                tipo: user.tipo,
            }

            res.send({dataUser});
        }else {
            //contraseña incorrecta
            res.status(409).send({message: 'Hubo un error'});
        }
    }
    /*User.findOne({email: userData.email}, async (err, user)=> {
        let tipoUsuario;
        if (err) return res.status(500).send('Server error');
        if (!user) { //no existe el email
            res.status(409).send({message: 'Hubo un error'});
        } else {
            const resultPassword = bcrypt.compareSync(userData.psw, user.psw); //devuelve true si la psw coincide con bd
            if (resultPassword) {

                const accessToken = createTokens(user);

                await res.cookie("access-token", accessToken, {
                    maxAge: 24*60*60*30*1000,
                    sameSite: 'lax',
                    httpOnly: false,
                });
                if(user.tipo == 'regular') //user
                    tipoUsuario = 83648205;
                if(user.tipo == 'admin') //admin
                    tipoUsuario = 93847561;

                await res.cookie("tipo-usuario", tipoUsuario, {
                    maxAge: 24*60*60*30*1000,
                    sameSite: 'lax',
                    httpOnly: false,
                });

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    tipo: user.tipo,
                }

                res.send({dataUser});
            } else {
                //contraseña incorrecta
                res.status(409).send({message: 'Hubo un error'});
            }
        }
    })*/
}

exports.obtenerUsuario = async(req, res) => {
    try {
        const usuario = await User.findOne({email: req.params.email});
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('No se encuentra el usuario')
    }
}

exports.logOut = (req, res) => {
    req.clearCookie("access-token");
    req.clearCookie("tipo-usuario");
    res.send('Cookies eliminadas');
}