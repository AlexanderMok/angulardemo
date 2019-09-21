const express = require("express");
const productRoutes = express.Router();

let Product = require("../models/Product");

/**
 * add api
 */
productRoutes.route("/add").post(function (req, resp) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            resp.status(200).json({ "Product": "Product has been added." });
        })
        .catch(err => {
            resp.status(400).send("unable to save data.");
        });
});

/**
 * get all api
 */
productRoutes.route("/").get(function (req, resp) {
    Product.find(function (err, products) {
        if (err) {
            console.log(err);
        } else {
            resp.json(products);
        }
    });
});

/**
 * update api
 */
productRoutes.route("/update/:id").post(function (req, resp) {
    Product.findById(req.params.id, function (err, product) {
        if (!product) {
            resp.status(404).send("Not found.");
        } else {
            product.ProductName = req.body.ProductName;
            product.ProductDescription = req.body.ProductDescription;
            product.ProductPrice = req.body.ProductPrice;
            product.save()
                .then(product => {
                    resp.json("Product updated.");
                })
                .catch(err => {
                    resp.status(400).send("unable to update data.");
                })
        }
    });
});

/**
 * delete api
 */
productRoutes.route("/delete/:id").delete(function (req, resp) {
    Product.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
        if (err) {
            resp.json(err);
        } else {
            resp.json("Product removed");
        }
    });
});

module.exports = productRoutes;