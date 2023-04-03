const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jobApplicationModel = require('../Models/jobApplication')
const studentModel = require('../Models/studentModel')
const skillModel = require('../Models/skillModel')
const companyModel = require('../Models/companyModel')
const accountModel = require('../Models/accountModel')
const majorModel = require('../Models/majorModel')




///[GET] http://localhost:5000/company
const listPost = async (req, res, next) => {
    try {
        jobPostModel.find({})
            .then(listPost => {
                res.json(listPost)
            })
            .catch(next)
    }
    catch (error) {
        console.log(error)
    }
}

const listCV = async (req, res, next) => {
    try {
        jobApplicationModel.find({})
            .then(listapp => {
                //console.log(listapp)
                const a = listapp?.filter((app) => {
                    const regex = new RegExp(req.email, 'i');
                    return app?.email && regex.test(app.email);
                });
                res.json(a)

            })
            .catch(next)
    } catch (error) {
        console.log(error)

    }


}

/// [GET] http://localhost:5000/company/details/:id
const detailsPost = (req, res, next) => {
    try {
        jobPostModel.findOne({ _id: req.params.accId })
            .then(account =>
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error)

    }

}

const detailsCV = (req, res, next) => {
    try {
        jobApplicationModel.findOne({ _id: req.params.accId })
            .then(account =>
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error)

    }

}

/// [POST] http://localhost:5000/company/create
const createCV = async (req, res, next) => {
    try {
        // get info user 
        const { name, major, email, namecompany, nameschool, title, logo ,id_post} = req.body;
        if (!name || !major || !email || !namecompany
            || !nameschool || !logo || !id_post) {
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
        const now = new Date();
        console.log(now);
        console.log(req.file);
        const jobaplli = await jobApplicationModel.create({
            date: now,
            name: name,
            major: major,
            email: email,
            namecompany: namecompany,
            nameschool: nameschool,
            status: "Đang chờ xác nhận",
            url: req.file.path,
            verify: false,
            title: title,
            logo: logo,
            id_post: id_post,
        })
        return res.json({
            success: true,
            message: "create jobapp success",
            jobaplli: jobaplli
        })
    } catch (error) {
        console.log(error)
    }
}


/// [PUT] http://localhost:5000/update-profile
const update_profile = (req, res, next) => {
    try {
        //const {gender,studentname,  address, code, major, school } = req.body
        studentModel.findOneAndUpdate({ studentemail: req.email }, req.body)
            .then(() => {
                res.json({
                    success: true,
                    profile: req.body
                })
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

const profile = (req, res, next) => {
    try {
        studentModel.findOne({ studentemail: req.email })
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

const listSkill = async (req, res, next) => {
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

const change_pass = async (req, res, next) => {
    try {
        const { oldPass, newPass, cfmPass } = req.body
        if (!oldPass || !newPass || !cfmPass) {
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        }
        if (newPass != cfmPass) {
            return res.status(400).json({
                success: false,
                message: "confirm password incorrect"
            })
        }
        const user = await accountModel.findOne({ email: req.email })
        if (!user) {
            return res.status(404).send({ message: "User Not found." });

        }
        else if (oldPass != user.password) {
            return res.status(404).send({ message: "Old password incorrect." });
        }
        user.password = cfmPass
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Change success"
        })

    } catch (error) {
        console.log(error)
    }
}

const add_favorite = async (req, res, next) => {
    try {
        studentModel.updateOne({ studentemail: req.email }, { $push: { favorite: req.params.accId } })
            .then((profile) => {
                res.json({
                    success: true,
                    message: "Add success",
                    profile: profile,
                })
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}

const delete_favorite = async (req, res, next) => {
    try {
        studentModel.updateOne({ studentemail: req.email }, { $pull: { favorite: req.params.accId } })
            .then((profile) => {
                res.json({
                    success: true,
                    message: "Delete success",
                    profile: profile,
                })
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
}
const get_favorite = async (req, res, next) => {
    try {
        studentModel.findOne({ studentemail: req.email } )
            .then((profile) => {
                console.log(profile.favorite[0]); // lấy phần tử đầu tiên trong mảng
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
}


const up_cv = async ( req, res , next) => {
    if (!req.file) {
        res.send({
            status: false,
            message: "No files"
        })
    }
    console.log(req.file);
    studentModel.findOneAndUpdate({studentemail: req.email}, {$push: {list_cv: req.file.path}})
        .then((profile) => {
            console.log(profile.list_cv)
            res.json({
                success: true,
                message: "Adđ success",
                profile: profile.list_cv,
            })
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



  const listCompany = async (req, res, next) =>{
    companyModel.find({})
      .then(listCompany => {
        res.json(listCompany);
      })
      .catch(next)
  }
  
  const showDetails = (req, res, next) =>{
        try {
            companyModel.findOne({_id: req.params.accId})
                .then(Company => 
                    res.json(Company)
                )
                .catch(next)
        } catch (error) {
            console.log(error)
        }
    
    }

module.exports = {
    listPost: listPost,
    listCV: listCV,
    createCV: createCV,
    detailsCV: detailsCV,
    detailsPost: detailsPost,
    update_profile: update_profile,
    profile: profile,
    listSkill: listSkill,
    add_favorite: add_favorite,
    change_pass: change_pass,
    delete_favorite: delete_favorite,
    up_cv: up_cv,
    get_favorite: get_favorite,
    listMajor: listMajor,
    listCompany: listCompany,
    showDetails:showDetails,
}

