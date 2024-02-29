const router=require('express').Router();

const apiRoute=require('./api');

const homeroute=require('./home-routes');

const dashboardroute=require('./dashboard-routes');

router.use('/api',apiRoute);
router.use('/', homeroute);
router.use('/dashboard',dashboardroute);
router.use((req,res)=>{
    res.status(404).end();
});

module.exports=router;