const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jobApplicationModel = require('../Models/jobApplication')
const emailModel = require('../Models/emailModel')
const companyModel = require('../Models/companyModel')
const skillModel = require('../Models/skillModel')
const multer = require('multer');
const upload = multer();
const nodemailer = require('nodemailer')
const moment = require('moment');
const cloudinary = require('cloudinary').v2;
const accountModel = require('../Models/accountModel')
const majorModel = require('../Models/majorModel')


// const date = new Date();
// const formattedDate = format(date, 'dd/MM/yyyy');

///[GET] http://localhost:5000/company
const listPost = async (req, res, next) => {
    try {
        jobPostModel.find({})
            .then(listpost => {
                // console.log(listpost)
                const a = listpost?.filter((post) => {
                    const regex = new RegExp(req.username, 'i');
                    return post?.namecompany && regex.test(post.namecompany);
                });
                res.json(a)

            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
}

const listCV = async (req, res, next) => {
    try {
        jobApplicationModel.find()
            .then(listpost => {
                // console.log(listpost)
                const a = listpost?.filter((post) => post?.namecompany === req.username)
                res.json(a)

            })
            .catch(next)

    } catch (error) {
        console.log(error);
    }

}

/// [GET] http://localhost:5000/company/details/:id
const showDetails = (req, res, next) => {
    try {
        jobPostModel.findOne({ _id: req.params.accId })
            .then(account =>
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

const showDetails_cv = (req, res, next) => {
    try {
        jobApplicationModel.findOne({ _id: req.params.accId })
            .then(account =>
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

/// [POST] http://localhost:5000/company/create
const createPost = async (req, res, next) => {
    try {
        //get info user 
        const { benefit, expdate, gender, location, namecompany, title, required, salary, major, responsibility } = req.body;
        if (!benefit || !expdate || !gender || !location || !namecompany
            || !title || !required || !salary || !responsibility || !major) {
            cloudinary.uploader.destroy(req.file.filename)
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        }
        if (!req.file) {
            res.send({
                status: false,
                message: "No files"
            })
        }

        // const {expdate2} = "23/04/20223"
        console.log(req.file);
        const now = new Date();
        const jobpost = await jobPostModel.create({
            benefit: req.body.benefit,
            expdate: req.body.expdate,
            gender: req.body.gender,
            location: req.body.location,
            namecompany: req.body.namecompany,
            title: req.body.title,
            required: req.body.required,
            salary: req.body.salary,
            logo: req.file.path,
            responsibility: req.body.responsibility,
            verify: false,
            filename: req.file.filename,
            major: req.body.major,
            DateSubmitted: now,
        });

        await jobpost.save();
        return res.json({
            success: true,
            message: "create jobpost success",
            jobpost: jobpost
        })
    } catch (error) {
        console.log(error);
    }
}

/// [PUT] http://localhost:5000/company/details/:id
const update = (req, res, next) => {
    try {
        jobPostModel.updateOne({ _id: req.params.accId }, req.body)
            .then(() => {
                res.json(req.body)
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}
/// [DELETE]  http://localhost:5000/company/:id
const Delete = (req, res, next) => {
    try {
        jobPostModel.findOne({ _id: req.params.accId })
            .then(user => {
                cloudinary.uploader.destroy(user.filename)
                jobPostModel.findByIdAndDelete({ _id: req.params.accId })
                    .then(() => {
                        res.json({
                            success: true,
                        })
                    })
            })
    } catch (error) {
        console.log(error);
    }

}

const send_email = (req, res, next) => {
    try {
        console.log(req.body)

        const tranforter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EmailSend,
                pass: process.env.AUTH_Pass,
            }
        })

        const mailOptions = {
            from: req.body.fromEmail,
            to: req.body.toEmail,
            subject: `Message from ${req.body.fromEmail}: ${req.body.subject}`,
            text: req.body.message
        }

        tranforter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("email sent " + info.response)
            }
        })
        

        const emailsend = emailModel.create({
            fromemail: req.body.fromEmail,
            toemail: req.body.toEmail,
            subject: req.body.subject,
            content: req.body.message,
        })

        jobApplicationModel.findOneAndUpdate({ _id: req.params.accId },{status: "Đã xác nhận qua Email"})
        .then(() =>res.status(200).json({
                    success: true,
                    message: "send mail success",
                    emailsend: emailsend
            }))
        .catch(next)
    } catch (error) {
    }
}

const update_profile = async(req, res, next) => {
    try {
         const a = await  companyModel.findOneAndUpdate({ emailcompany: req.email },req.body)    
         const b = await accountModel.findOneAndUpdate({email: req.email},{
                username: req.body.namecompany,
                phonenumber: req.body.phonecompany,
               
        })
        res.json({
            success: true,
            message:"update profile success",
        })
        await a.save()
        await b.save()
     
    } catch (error) {
        console.log(error);
    }
}

const profile = (req, res, next) => {
    try {
        companyModel.find({ emailcompany: req.email })
            .then((profile) => {
                res.json({
                    success: true,
                    profile: profile
                })
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

const refuse_cv = (req, res, next) => {
    try {
        jobApplicationModel.findOneAndUpdate({ _id: req.params.accId }, {status: "Đã từ chối"})
            .then(account =>
                res.json({
                    success: true,
                    message: "refuse success"
                })
            )
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}


const listSkill = async (req, res, next) =>{
    try {
        skillModel.find({})
            .then(listskill => {
            res.json(listskill)
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
  }


  const listCompany = async (req, res, next) =>{
    companyModel.find({})
      .then(listCompany => {
        res.json(listCompany);
      })
      .catch(next)
  }

  const listMajor = async (req, res, next) =>{
    try {
        majorModel.find({})
            .then(listMajor => {
            res.json(listMajor)
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
  }

const upload_logo = async (req, res)=>{
    try {
        if (!req.file) {
            res.send({
                status: false,
                message: "No files"
            })
        }
    
        companyModel.findOne({emailcompany: req.email})
            .then(user => {
                cloudinary.uploader.destroy(user.logo)
            })   
        const b = await companyModel.findOneAndUpdate({emailcompany: req.email},{$set:{ logo: req.file.path }})   
        await b.save()
        res.json({
            success: true,
            message: "upload success"
        })
    } catch (error) {
        console.log(error);   
    }
   
}

const Delete_many = async (req, res, next) =>{ 
    try {
        const ids = req.params.id.split(','); // lấy danh sách id từ url và split ra thành mảng
    
        const result = await jobPostModel.deleteMany({ _id: { $in: ids } }); // tìm và xóa tất cả bài đăng có _id trong danh sách ids
    
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  };

module.exports = {
    listPost: listPost,
    listCV: listCV,
    showDetails: showDetails,
    createPost: createPost,
    update: update,
    Delete: Delete,
    showDetails_cv: showDetails_cv,
    send_email: send_email,
    update_profile: update_profile,
    profile: profile,
    refuse_cv: refuse_cv,
    listSkill: listSkill,
    listCompany: listCompany,
    listMajor: listMajor,
    upload_logo: upload_logo,
    Delete_many: Delete_many,
    // Upload: Upload
}

