const Users = require('../models/Users');
const bcrypt = require("bcrypt");

class UserController {

    loginIndex(req, res, next) {
        res.render('login', {
            title: 'Login page'
        })
    };

    regisIndex(req, res, next) {
        res.render('register', {
            title: 'Register page'
        });
    };

    // login(req, res, next) {
    //     Users.find({"username" : req.body.username}, function(err,user) {
    //         if(err){

    //         }
    //     })

    // }

    register(req, res, next) {

        let user = req.body;
        let errors = [];

        if (!user.username) {
            errors.push({ msg: 'Please enter username' });
        }
        if (!user.password) {
            errors.push({ msg: 'Please enter password' });
        }
        if (!user.name ){
            errors.push({ msg: 'Please enter your name' });
        }
        if (!user.yob){
            errors.push({ msg: 'Please enter your year of birth' });
        }
        if (user.password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }
        if (user.password !== user.retypePassword){
            errors.push({ msg: 'Retype password does not match' });
        }

        if (errors.length > 0) {
            res.render('register', {
                errors,
                user
            });
        }
        else {
            Users.findOne({ username: user.username }).then(user => {
                if (user) {
                    errors.push({ msg: 'Username already exists' });
                    res.render('register', {
                        errors,
                        user
                    });
                }
                else {
                    const newUser = new Users(req.body);
                    //Hash password
                    bcrypt.hash(newUser.password, 10, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.redirect('/users/login');
                            })
                            .catch(next);
                    });
                }
            });
        }
    }
}

// update(req, res, next) {
//     Users.updateOne({ _id: req.params.userId }, req.body)
//         .then(() => {
//             res.redirect('/players')
//         })
//         .catch(next)
// }

// delete(req, res, next) {
//     Users.findByIdAndDelete({ _id: req.params.playerId })
//         .then(() => res.redirect('/players'))
//         .catch(next);
// }


module.exports = new UserController;