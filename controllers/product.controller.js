const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

// let products = [
//     {id: 1, name: 'hammer'},
//     {id: 2, name: 'hammer2'},
//     {id: 3, name: 'hammer3'},
// ]

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const db = getDb();
    const product = await db
      .collection("products")
      .find({})
      .project({ _id: 0 })
      .skip(+page * limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.saveAProduct = async (req, res, next) => {
  try {
    const db = getDb();
    const product = req.body;
    const result = await db.collection("products").insertOne(product);
    console.log(result);

    if (!result.insertedId) {
      return res
        .status(400)
        .send({ status: false, error: "Something went wrong" });
    }

    res.send({
      success: true,
      message: `Product added with id: ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductDetail = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid product id." });
    }

    const product = await db
      .collection("products")
      .findOne({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProduct = (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const filter = { _id: id };
  const newData = products.find((product) => product.id === Number(id));

  newData.id = id;
  newData.name = req.body.name;

  res.send(newData);
};

module.exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const filter = { _id: id };
  deletedData = products.filter((product) => product.id !== Number(id));
  res.send(deletedData);
};
