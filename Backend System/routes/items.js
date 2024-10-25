const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const Sequelize = require('sequelize');

// GET items with filtering and sorting
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy, order } = req.query;

        // Build the query options
        let where = {};

        // If category is provided, add it to the where clause
        if (category) {
            where.category = category;
        }

        // If minPrice or maxPrice is provided, add it to the where clause
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Sequelize.Op.gte] = parseFloat(minPrice);
            if (maxPrice) where.price[Sequelize.Op.lte] = parseFloat(maxPrice);
        }

        // Build the sort options
        let orderOption = [];

        // If sortBy is provided, add it to the order option
        if (sortBy) {
            orderOption.push([sortBy, order === 'desc' ? 'DESC' : 'ASC']);
        }

        // Execute the query with sorting
        const items = await Item.findAll({ where, order: orderOption });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error });
    }
});

module.exports = router;
