const router = require("express").Router();
const atob = require("atob")
router.post("/user",(req,res)=>{
    const tokenParts = req.body.token.split('.');
const encodedPayload = tokenParts[1];
const rawPayload = atob(encodedPayload);
const user = JSON.parse(rawPayload);
console.log(user);
res.send(user)
})
module.exports = router;