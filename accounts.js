const express = require("express");

router = express.Router();

const mysqlConnection = require("./mysql");

//get: to retrieve
router.get("/user_account/card_type", (req, res) => {
    mysqlConnection.query(`select * from accounts where card_type = ('${req.body.card_type}')`, (err, results) => {
        if (err) {
            res.send("Error occured");
            console.log(err);
        } else {
            res.send(results);
        }
    })
});

//post: send to data to server for server to save
router.post("/user_account", (req, res) => {
    mysqlConnection.query(
        `insert into accounts(id, card_type, account_number, balance, max_limit, date_created)
        values (${req.body.id}, '${req.body.card_type}', '${req.body.account_number}', ${req.body.balance}, ${req.body.max_limit}, '${req.body.date_created}')`,
        (err, results) => {
            if (err) {
                res.send("Error occured");
                console.log(err); 
            } else {
                res.send("Data inserted successfully");
                res.send(results);
            }});
            console.log("Data received: ");
            console.log(req.body.id);
            console.log(req.body.card_type);
            console.log(req.body.account_number);
            console.log(req.body.balance);
            console.log(req.body.max_limit);
            console.log(req.body.date_created);
});

//put: to update
router.put("/user_account", (req, res) => {
    mysqlConnection.query(
        `update accounts set card_type = '${req.body.card_type}', balance = ${req.body.balance} where id = ${req.body.id}`,
        (err, results) => {
            if (err) {
                res.send("Error occured");
                console.log(err); 
            } else {
                res.send("Data updated successfully");
                res.send(results);
            }})
            console.log("Data added: ");
            console.log(req.body.id);
            console.log(req.body.card_type);
            console.log(req.body.balance);
});

//delete
router.delete("/user_account/id", (req, res) => {
    mysqlConnection.query(
        `delete from accounts where id = ${req.body.id}`, (err, results) => {
            if (err) {
                res.send("Error occured");
                console.log(err);
            } else {
                res.send("Data deleted successfully");
                res.send(results);
            }})
            console.log("Data deleted successfully");
});

module.exports = router;