const router = require("./base.routes");

router.get('/') => ('users/index-profile')
router.get('/edit') => ('users/edit-profile')
router.post('/edit') => ('users/index-profile')
router.get('/list') => ('users/list-profile')
router.get('/details') => ('users/details-profile')
router.post('/delete') => ('index')
//router.get('/contact') => ('users/details-profile')