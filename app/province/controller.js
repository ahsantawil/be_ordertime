const Province = require('./model');

module.exports = {
    viewProvince: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus }

            const province = await Province.find();

            res.render('admin/province/view', {
                province,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/province');
        }
    },

    viewAdd : async(req, res) => {
        try {
            res.render('admin/province/add')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/province');
        }
    },

    actionAdd : async(req, res) => {
        try {
            const { nameProvince } = req.body;

            let province = await Province({ nameProvince });
            await province.save();

            req.flash('alertMessage', 'Success add Province');
            req.flash('alertStatus', 'success');
            res.redirect('/province');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/province');
        }
    },

    viewEdit : async(req, res) => {
        try {
            const { id } = req.params;

            const province = await Province.findOne({ _id: id });
            res.render('admin/province/edit', {
                province
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/province');
        }
    },
    
    actionEdit : async(req, res) => {
        try {
            const { id } = req.params;
            const { nameProvince } = req.body;

            await Province.findOneAndUpdate({
                _id : id
            }, { nameProvince });

            req.flash('alertMessage', 'Success edit province');
            req.flash('alertStatus', 'success');
            res.redirect('/province');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/province');
        }
    },
    
    actionDelete : async(req, res) => {
        try {
            const { id } = req.params;
            await Province.findOneAndRemove({
                _id : id
            });

            req.flash('alertMessage', 'Success Delete province');
            req.flash('alertStatus', 'success');
            res.redirect('/province');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/province');
        }
    }
}