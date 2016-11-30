var Article = require('../../data/models/article');
function loadArticle(req, res, next) {
    Article.findOne({title: req.params.title})
            .populate('author')
            .exec(function(err, article) {
                if (err) {
                    return next(err);
                }
                if (!article) {
                    return res.status(404).send('Not found');
                }
                req.article = article;
                next();
            });
}
module.exports = loadArticle;