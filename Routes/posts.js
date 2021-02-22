const router = require('express').Router();
const verify = require('./verifytoken');
router.get('/',verify,(req,res)=>{
    res.json({posts:{title:"No access"}})
})
module.exports = router;