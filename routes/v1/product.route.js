const express = require('express');
const productsControllers = require('../../controllers/product.controller');
const limiter = require('../../middleware/limiter');
const viewCount = require('../../middleware/viewCount');

const router = express.Router();


// router.get('/', (req, res) => {
    // const search = req.query.search;
    // productCollection.find({name: {$regex: search}})
    // .toArray((err, documents) => {
    //     res.send(documents);
    // })

//     res.send('product found')
// })

// router.post('/', (req, res) => {
        // const product = req.body;
        // productCollection.insertOne(product)
        // .then(result =>{
        //     console.log(result.insertedCount);
        //     res.send(result.insertedCount)
        // })
    //     res.send('product added')
    // })

router
    .route("/")
        .get(productsControllers.getAllProducts)
            .post(productsControllers.saveAProduct)

router
    .route('/:id')
        .get(viewCount, limiter, productsControllers.getProductDetail)
        .patch(productsControllers.updateProduct)
        .delete(productsControllers.deleteProduct);

module.exports = router;










