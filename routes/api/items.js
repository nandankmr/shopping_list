const router = require("express").Router();
const Item = require("../../models/Item");
const auth = require("../../middleware/auth");

// GET /api/items
//Get all Items
router.get("/", auth, (req, res) => {
  console.log("Get request");
  Item.find({ user: req.user.id }).then(items =>
    res.json(items.sort((a, b) => b.created - a.created))
  );
});

// POST /api/items
//Add Items
router.post("/", auth, (req, res) => {
  console.log(req.body);
  console.log("Post request");
  const newItem = new Item({ name: req.body.name, user: req.user.id });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => res.send(err));
});

// DELETE /api/items
//delete an Item
router.delete("/:id", auth, (req, res) => {
  console.log("Delete request");

  Item.findById(req.params.id)
    .then(item => {
      item.remove().then(() => res.json({ success: true }));
    })
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
