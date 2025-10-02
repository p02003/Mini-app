const Item = require('../models/itemModel');

exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
};

exports.createItem = async (req, res) => {
  const item = new Item(req.body);
  const saved = await item.save();
  res.status(201).json(saved);
};

exports.updateItem = async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
};
