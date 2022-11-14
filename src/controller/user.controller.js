const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const saltRounds = 5;
const jwt = require("jsonwebtoken");
// const { tokenToString } = require("typescript");
const Token = require("../model/token.model");
// const sendVerificationMail = require('./../utils/sendEmail');
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const { findByIdAndDelete } = require("../model/user.model");

// const sendVerificationMail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.HOST,
//             service: process.env.SERVICE,
//             port: Number(process.env.EMAIL_PORT),
//             secure: Boolean(process.env.SECURE),
//             auth: {
//                 user: process.env.USER,
//                 pass: process.env.PASS
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             }
//         })

//         await transporter.sendMail({
//             from: process.env.USER,
//             to: email,
//             subject: subject,
//             text: text
//         })
//         console.log("Email sent successfully")
//     } catch (error) {
//         console.log("Email sent error: " + error.message)
//     }
// }

//Register a User | guest
// const createUser = async (req, res) => {
//     if (req.body) {
//         let email = req.body.email;
//         const user = await User.findOne({ email: email }, async (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 if (!result) {

//                     bcrypt.genSalt(saltRounds, function (err, salt) {
//                         bcrypt.hash(req.body.password, salt, async function (err, hash) {
//                             req.body.password = hash;

//                             let user = new User(req.body);
//                             try {
//                                 const data = await user.save()
//                                 const token = await new Token({
//                                     userId: user._id,
//                                     token: crypto.randomBytes(32).toString("hex"),
//                                 }).save();
//                                 const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
//                                 await sendVerificationMail(user.email, "Verify Email", url);
//                                 console.log(data);
//                                 res.status(200).send({ message: "An Email was sent to your account please verify" });

//                             } catch (err) {
//                                 console.log(err);
//                                 res.send(err);
//                             }

//                         });
//                     });
//                 } else {
//                     res.send({ message: "User Already Exist" });
//                 }
//             }
//         });
//     }
// }

let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false,
    }
})
const createUser = async (req, res) => {
    if (req.body) {
        let email = req.body.email;
        const user = await User.findOne({ email: email }, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (!result) {

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, async function (err, hash) {
                            req.body.password = hash;
                            req.body.googleUser = false;
                            req.body.emailToken = crypto.randomBytes(64).toString('hex'),
                                req.body.isVerified = false;
                            let usercreate = new User(req.body);
                            console.log(usercreate.emailToken);
                            try {
                                const data = await usercreate.save()
                                let mailOptions = {
                                    from: '"Verify your email" <expectralk@gmail.com',
                                    to: usercreate.email,
                                    subject: 'Verify your email - BussiFinder',
                                    html: ` <h2 align="center" style=" font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; "> Hi ${usercreate.fullName}! Thank you for joining with BussiFinder</h2>
                                            <h4 align="center" style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; "> Please verify your mail to continue...</h4>
                                            <div align="center">
                                                <a align="center" href="http://${req.headers.host}/user/verify-email?token=${usercreate.emailToken}">
                                                    <button style="  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;   background-color: turquoise; border: none; border-radius: 50px ; cursor:'pointer';  color: #fff; font-weight:800; font-size:20px;/* Dark grey */ padding: 15px 32px">Verify
                                                        Your Email
                                                    </button>
                                                </a>
                                            </div>
                                            <div align="center" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                                <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                                <p style="margin: 0;">
                                                    <a href="http://${req.headers.host}/user/verify-email?token=${usercreate.emailToken}">http://${req.headers.host}/user/verify-email?token=${usercreate.emailToken}</a>
                                                </p>
                                            </div>
                                            <p align="center" style="margin: 0;">Cheers,<br> BussiFinder</p>`
                                }

                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log("error", error)
                                        res.status(500).send(error);

                                    } else {
                                        console.log("Verification email is sent to your email address")
                                        console.log(data);
                                        res.status(200).send({ data: data, message: "Verification email is sent to your email address" });
                                    }
                                })

                            } catch (err) {
                                console.log(err);
                                res.status(500).send(err);
                            }

                        });
                    });
                } else {
                    res.status(500).send({ message: "User Already Exist" });
                }
            }
        });
    }
}

const createGoogleUser = async (req, res) => {
    if (req.body) {
        let email = req.body.email;
        const user = await User.findOne({ email: email }, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (!result) {

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, async function (err, hash) {
                            req.body.password = hash;
                            req.body.googleUser = true;
                            req.body.emailToken = null,
                                req.body.isVerified = true;
                            let user = new User(req.body);
                            try {
                                const data = await user.save()
                                console.log(data);
                                res.status(200).send(data);

                            } catch (err) {
                                console.log(err);
                                res.send(err);
                            }

                        });
                    });
                } else {
                    res.status(500).send({ message: "User Already Exist" });
                }
            }
        });
    }
}

//login Validate
const validateUser = async (req, res) => {
    console.log(req);

    let logUser = await User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            if (user == null) return res.status(500).send({ message: "User Not Found" });
            else {
                if (!user.isVerified) {

                    return res.status(400).send({ message: "Please Verify your E-mail Address" });
                } else {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (result) {
                            const token = jwt.sign({
                                email: user.email,
                                fullName: user.fullName,
                            }, process.env.JWT_SECRET)

                            const subscriptionDetails = {


                            }

                            res.status(200).send({ user: token ,userDetails:user});
                        } else {
                            console.log("Credentials Does Not Matched");
                            res.status(500).send({ message: "Credentials Does Not Matched" });
                        }
                    });
                }
            }


        }
    });
}



//get All User
const getAllUser = async (req, res) => {
    await User.find()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}
//get User by ID
const getUserById = async (req, res) => {
    await User.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
};

//get verifyUser
const verifyUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: 'Invalid link' });
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: 'Invalid Link' });

        await User.updateOne({ _id: user._id, verified: true })
        await token.remove();

        res.status(200).send({ message: 'Email verified successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//get verifyEmail
const verifyEmail = async (req, res) => {
    try {
        const token = req.query.token
        const user = await User.findOne({ emailToken: token })
        if (user) {
            user.emailToken = null
            user.isVerified = true
            await user.save()

            res.status(200).redirect('http://localhost:3000/signIn');
        }
        else {
            res.status(400).send({ message: 'Email is not verified' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//getUserByEmail
const getUserByEmail = async (req, res) => {
    console.log("req.body.email", req.body.email)
    const user = await User.findOne({ email: req.body.email  })
    console.log("user---", user);
    if (!user) {
        res.status(200).send(null)
    } else {
        res.status(200).send(user)
    }

}


// Update User 
const updateUser = async (req, res) => {
    console.log("Call Update User",req.body);
        

    if (req.body) {
        let count = req.body.predictionCount;
        let countLimit = req.body.predictionCountLimit;
        // if(count == countLimit &&  req.body.subscriptionStatus==="Active"){
        //     req.body.subscriptionStatus = "Over";
        // }
        try{
            const data = await User.findByIdAndUpdate({ _id: req.body.id }, req.body)
            console.log(data);
            res.status(200).send(data);
        }
        catch(err){
            console.log(err);
            res.status(500).send(err);
        }

    }
}

// Delete User
const deleteUser = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        if (!data) {
            res.status(404).send({ message: "User Not Found" });
        } else {
            res.status(200).send({ message: "User Deleted Successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// Search User
const searchUser = async (req, res) => {
    try {
        const data = await User.find({ email: { $regex: req.params.search, $options: 'i' } });
        if (!data) {
            res.status(404).send({ message: "User Not Found" });
        } else {
            res.status(200).send(data);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}



    

// pagination
const pagination = async (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    try {
        if (endIndex < await User.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.results = await User.find().limit(limit * 1).skip(startIndex).exec();
        res.status(200).send(results);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}




//upload User Profile Image Cloudinary
// const uploadProfileImage = async (req, res) => {
//     try {
//         const fileStr = req.body.data;
//         const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'ml_default',
//         });
//         console.log(uploadResponse);
//         res.status(200).send(uploadResponse);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// }

module.exports = {
    createUser,
    getAllUser,
    validateUser,
    verifyUser,
    verifyEmail,
    getUserByEmail,
    createGoogleUser,
    updateUser,
    getUserById,
    deleteUser,
    searchUser,
}