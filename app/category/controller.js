const Category = require('./model');

module.exports = {
    viewCategory: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus }

            const category = await Category.find();

            res.render('admin/category/view', {
                category,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },

    viewAdd : async(req, res) => {
        try {
            res.render('admin/category/add')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },

    actionAdd : async(req, res) => {
        try {
            const { nameCategory } = req.body;

            let category = await Category({ nameCategory });
            await category.save();

            req.flash('alertMessage', 'Success add Category');
            req.flash('alertStatus', 'success');
            res.redirect('/category');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },

    viewEdit : async(req, res) => {
        try {
            const { id } = req.params;

            const category = await Category.findOne({ _id: id });
            res.render('admin/category/edit', {
                category
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    
    actionEdit : async(req, res) => {
        try {
            const { id } = req.params;
            const { nameCategory } = req.body;

            await Category.findOneAndUpdate({
                _id : id
            }, { nameCategory });

            req.flash('alertMessage', 'Success edit category');
            req.flash('alertStatus', 'success');
            res.redirect('/category');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    },
    
    actionDelete : async(req, res) => {
        try {
            const { id } = req.params;
            await Category.findOneAndRemove({
                _id : id
            });

            req.flash('alertMessage', 'Success Delete category');
            req.flash('alertStatus', 'success');
            res.redirect('/category');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/category');
        }
    }
}