import db from "../models/index";
import { up } from "../seeders/demo-user";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    }
    catch (e) {
        console.log(e);
    }
}

let getAbout = (req, res) => {
    return res.render("about/getAbout.ejs")
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    // console.log(message);
    return res.redirect('/get-crud')
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    //console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            userData: userData
        });

    }
    else {
        return res.send("Not found");
    }
}

let updateCRUD = async (req, res) => {
    let data = req.body;
    console.log(data);
    await CRUDService.updateUserData(data);
    return res.redirect("/get-crud");
}

let deleteCRUD = async (req, res) => {
    let data = req.query;

    if (data) {
        await CRUDService.deleteUserById(data);
        //return res.send('OK')
        return res.redirect('/get-crud')
    }
    else {

    }
}
module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    updateCRUD: updateCRUD,
    deleteCRUD: deleteCRUD
}