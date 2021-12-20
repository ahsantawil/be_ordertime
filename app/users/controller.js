const User = require('./model');

module.exports = {
    viewUsers: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus }

            const user = await User.find();

            res.render('admin/users/view', {
                user,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/users');
        }
    },

    viewAdd : async(req, res) => {
        try {
            res.render('admin/users/add');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/users');
        }
    },

    actionAdd : async(req, res) => {
        try {
            const { username, password, fullName, address } = req.body;

            let user = await User({ username, password, fullName, address });
            await user.save();

            req.flash('alertMessage', 'Success add users');
            req.flash('alertStatus', 'success');
            res.redirect('/users');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/users');
        }
    },

    viewEdit : async(req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            res.render('admin/users/edit', {
                user
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/users');
        }
    },  
    
    actionEdit : async(req, res) => {
        try {
            const { id } = req.params;
            const { username, password, fullName, address } = req.body;

            await User.findOneAndUpdate({
                _id : id
            }, { username, password, fullName, address });

            req.flash('alertMessage', 'Success edit users');
            req.flash('alertStatus', 'success');
            res.redirect('/users');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/users');
        }
    },
    
    actionDelete : async(req, res) => {
        try {
            const { id } = req.params;
            await User.findOneAndRemove({
                _id : id
            });

            req.flash('alertMessage', 'Success Delete users');
            req.flash('alertStatus', 'success');
            res.redirect('/users');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/users');
        }
    }
}