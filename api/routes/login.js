const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const mongoose = require('mongoose');   


router.post('/',(req, res, next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1)
        {
            return res.status(401).json({
                msg:'user not exist'
            })
        }

        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                  msg:'password matching failed'  
                })
            }
            if(result){
                const token = jwt.sign({
                    username:user[0].username,
                    email:user[0].email
                },
                'this is dmmy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:user[0].username,
                    email:user[0].email,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})
// router.get('/',(req, res,next)=>{
//     res.status(200).json({
//         message:'user route working'
//     })
// })

module.exports = router;
