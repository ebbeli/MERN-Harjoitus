const express = require("express");
const usersControllers = require("../controllers/user-controllers");

// luodaan tänne reititys users resurssille
const router = express.Router();

// esimerkkinä login-endpoint
//router.post('/api/users/login/', usersControllers.login);
router.get("/count", usersControllers.count);

router.get("/", usersControllers.getAll);
router.post("/login", usersControllers.login);
router.post("/signup", usersControllers.createUser);
router.delete("/delete/:uid", usersControllers.deleteUser);
router.get("/:uid", usersControllers.getUser);

module.exports = router;

/*
Feikki login tokenin ja id:n palautus
router.get('/login/', (req, res, next) => {
    res.send({
        token: 'test',
        "uid": "113"
    });
    console.log("GET toimii");
});
*/
