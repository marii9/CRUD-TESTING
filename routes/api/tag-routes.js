const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../model');

router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }]
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product, through: ProductTag }]
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'No tag found with this id' });
      }
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
    .then((tag) => {
      if (!tag[0]) {
        return res.status(404).json({ message: 'No tag found with this id' });
      }
      res.status(200).json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id }
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'No tag found with this id' });
      }
      res.status(200).json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;