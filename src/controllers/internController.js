const internModel = require('../models/InternModel')
const { isValidEmail, isValidRequestBody, isValidName, isValidNumber } = require("../validator/validator")
const collegeModel = require('../models/collegeModel')


const createIntern = async (req, res) => {
   res.setHeader('Access-Control-Allow-Origin','*')
    try {

        const reqBody = req.body
        const { name, mobile, email, collegeName } = reqBody

        if (!isValidRequestBody(reqBody)) return res.status(400).send({ status: false, message: "Collage data is required" })
        
        if (!name) return res.status(400).send({ status: false, message: "name is required" })   
        if (!isValidName(name.toLowerCase().trim())) return res.status(400).send({ status: false, message: "name is invalid" })
        
        if (!collegeName) return res.status(400).send({ statuts: false, message: "College name is required" })

        let collegeId = await collegeModel.findOne({ name: collegeName }).select({ _id: 1 })

        if (!collegeId) return res.status(404).send({ statuts: false, message: "College not found" })
        reqBody.collegeId = collegeId._id


        // --------------------------MobileNumber validation------------------
        if (!mobile) return res.status(400).send({ statuts: false, message: "Mobile number is required" })
        if (!isValidNumber(mobile)) return res.status(400).send({ statuts: false, message: "please provide valid mobile number" })
        let findMobile = await internModel.findOne({ mobile: mobile })
        if (findMobile) return res.status(400).send({ statuts: false, message: "Mobile number is Allready taken" })


        // --------------------------Email validation------------------
        if (!email) return res.status(400).send({ statuts: false, message: "email is required" })
        if (!isValidEmail(email)) return res.status(400).send({ statuts: false, message: "please provide valid emailId" })
        let findMail = await internModel.findOne({ email: email })
        if (findMail) return res.status(400).send({ statuts: false, message: "Email id is Allready taken" })


        const internData = await internModel.create(reqBody)
        const obj = {}
        obj.name = internData.name
        obj.mobile = internData.mobile
        obj.email = internData.email
        obj.collegeId = internData.collegeId

        res.status(201).send({ status: true, data: obj })
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}





module.exports = { createIntern}
