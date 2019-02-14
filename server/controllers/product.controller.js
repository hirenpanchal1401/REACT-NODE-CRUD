//const product = require('../services/product.service')
const db = require('../models/index');

const product  = db.products;

exports.create = async function (req, res) {
    let data;
    const totalAmount = req.body.prize * req.body.quantity;
    try {
      data = await product.create({
        productName : req.body.productName,
        productId : req.body.productId,
        prize : req.body.prize,
        quantity : req.body.quantity,
        totalAmount : totalAmount
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: 'Unable To Create.',
        data: err,
      });
    }
    if (data !== undefined) {
      res.status(200).json({
        status: true,
        message: 'Created Successfully',
        data,
      });
    }
  };
  
  exports.list = async function (req, res) {
    // PAGINATION
    let skipping = req.query.skip;
    let limiting = req.query.limit;
    let searching = req.query.search;
    // eslint-disable-next-line prefer-destructuring
    const asc = req.query.asc;
    // eslint-disable-next-line prefer-destructuring
    let sort = req.query.sort;
    let x = 'ASC';
    // eslint-disable-next-line prefer-destructuring
    const Op = db.Sequelize.Op;
    if (skipping === null || skipping === undefined || skipping === '') {
      skipping = 0;
    }
    if (limiting === '' || limiting === null || limiting === undefined) {
      limiting = 5;
    }
    if (searching === null || searching === undefined) {
      searching = '';
    }
    if (sort === null || sort === undefined || sort === '') {
      sort = 'id';
    }
    if (asc === '0') {
      x = 'DESC';
    } else {
      x = 'ASC';
    }
  
    let data;
    try {
      data = await product.findAll({
        where: { productName: { [Op.iLike]: `${searching}%` } },
        order: [[sort, x]],
        offset: skipping,
        limit: limiting,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: 'Unable To List Data',
        data: err,
      });
    }
    if (data !== undefined) {
      res.status(200).json({
        status: true,
        message: 'All mcq-sets Fetched Successfully',
        data,
        metadata: {
          sort: req.query.sort,
          asc: req.query.asc,
          search: req.query.search,
          limit: req.query.limit,
          skip: req.query.skip,
        },
      });
    }
  };
  
  exports.edit = async function (req, res) {
    let data;
    const totalAmount = req.body.prize * req.body.quantity;
    try {
      data = await product.update({
        productName : req.body.productName,
        productId : req.body.productId,
        prize : req.body.prize,
        quantity : req.body.quantity,
        totalAmount : totalAmount
      },
      { where: { id: req.params.id } });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: 'Unable To Update.',
        data: err,
      });
    }
    if (data !== undefined) {
      res.status(200).json({
        status: true,
        message: 'Updated Successfully',
        data,
      });
    }
  };
  
  exports.delete = async function (req, res) {
    let data;
    try {
      data = await product.destroy({ where: { id: req.params.id } });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: 'Unable To Delete.',
        data: err,
      });
    }
    if (data !== undefined) {
      res.status(200).json({
        status: true,
        message: 'Deleted Successfully',
        data,
      });
    }
  };
  