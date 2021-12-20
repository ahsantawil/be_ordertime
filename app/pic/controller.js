const Pic = require('./model');

module.exports = {
    viewPic: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus }

            const pic = await Pic.find();

            res.render('admin/pic/view', {
                pic,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pic');
        }
    },

    viewAdd : async(req, res) => {
        try {
            res.render('admin/pic/add')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pic');
        }
    },

    actionAdd : async(req, res) => {
        try {
            const {fullName, phoneNumber, jobTitle } = req.body;

            let pic = await Pic({ fullName, phoneNumber, jobTitle });
            await pic.save();

            req.flash('alertMessage', 'Success add pic');
            req.flash('alertStatus', 'success');
            res.redirect('/pic');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pic');
        }
    },

    viewEdit : async(req, res) => {
        try {
            const { id } = req.params;

            const pic = await Pic.findOne({ _id: id });
            res.render('admin/pic/edit', {
                pic
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pic');
        }
    },
    
    actionEdit : async(req, res) => {
        try {
            const { id } = req.params;
            const { fullName, phoneNumber, jobTitle } = req.body;

            await Pic.findOneAndUpdate({
                _id : id
            }, { fullName, phoneNumber, jobTitle });

            req.flash('alertMessage', 'Success edit pic');
            req.flash('alertStatus', 'success');
            res.redirect('/pic');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pic');
        }
    },
    
    actionDelete : async(req, res) => {
        try {
            const { id } = req.params;
            await Pic.findOneAndRemove({
                _id : id
            });

            req.flash('alertMessage', 'Success Delete pic');
            req.flash('alertStatus', 'success');
            res.redirect('/pic');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pic');
        }
    }
}