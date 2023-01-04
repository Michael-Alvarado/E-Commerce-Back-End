const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Finds all tags
router.get('/', async (req, res) => {
	try {
		const data = await Tag.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Finds a single tag by it's 'ID'
router.get('/:id', async (req, res) => {
	try {
		const data = await Tag.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!data) {
			res.status(400).json({
				message: 'Unable to locate a tag matching the provided ID.',
			});
		} else {
			res.status(200).json(data);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// Creates a new tag
router.post('/', async (req, res) => {
	try {
		const newTag = await Tag.create(req.body);

		res.status(200).json(newTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Update's a tag's name by it's 'ID' value
router.put('/:id', async (req, res) => {
	try {
		const update = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(update);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete's a tag by the requested ID
router.delete('/:id', async (req, res) => {
	try {
		const data = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!data) {
			res.status(400).json({
				message: 'Unable to locate a tag matching the provided ID.',
			});
		} else {
			res.status(200).json(data);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
