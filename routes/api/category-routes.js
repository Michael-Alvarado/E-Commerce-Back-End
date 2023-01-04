const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Gets all categories with associated data
router.get('/', async (req, res) => {
	try {
		const data = await Category.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Gets specific category by provided ID
router.get('/:id', async (req, res) => {
	try {
		const data = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});

		if (!data) {
			res.status(400).json({
				message: 'Unable to locate a category matching the provided ID.',
			});
		} else {
			res.status(200).json(data);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// Creates new category
router.post('/', async (req, res) => {
	try {
		const newCat = await Category.create(req.body);

		res.status(200).json(newCat);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Updates a category based on ID provided in request
router.put('/:id', async (req, res) => {
	try {
		const update = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(update);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Deletes a category based on ID provided in request
router.delete('/:id', async (req, res) => {
	try {
		const data = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!data) {
			res
				.status(400)
				.json({
					message: 'Unable to locate a category matching the provided ID.',
				});
		} else {
			res.status(200).json(data);
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
