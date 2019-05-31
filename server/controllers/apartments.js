module.exports = {
	postData: (req,res) => {
		res.status(201).json({
			body: req.body,
			images: req.files
		});
	},
	getData: (req,res) => {
		res.end();
	}
}