const Region = require('./model');
const Province = require('../province/model');

module.exports = {
    viewRegion: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus }

            const region = await Region.find().populate('province');

            res.render('admin/region/view', {
                region,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/region');
        }
    },

    viewAdd : async(req, res) => {
        try {
            const province = await Province.find(); 
            res.render('admin/region/add', {
                province
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/region');
        }
    },

    actionAdd : async(req, res) => {
        try {
            const { city, province } = req.body;

            let region = await Region({ city, province });
            await region.save();

            req.flash('alertMessage', 'Success add region');
            req.flash('alertStatus', 'success');
            res.redirect('/region');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/region');
        }
    },

    viewEdit : async(req, res) => {
        try {
            const { id } = req.params;
            const province = await Province.find();
            const region = await Region.findOne({ _id: id }).populate('province');
            res.render('admin/region/edit', {
                region,
                province
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/region');
        }
    },
    
    actionEdit : async(req, res) => {
        try {
            const { id } = req.params;
            const { city, province } = req.body;

            await Region.findOneAndUpdate({
                _id : id
            }, { city, province });

            req.flash('alertMessage', 'Success edit region');
            req.flash('alertStatus', 'success');
            res.redirect('/region');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/region');
        }
    },
    
    actionDelete : async(req, res) => {
        try {
            const { id } = req.params;
            await Region.findOneAndRemove({
                _id : id
            });

            req.flash('alertMessage', 'Success Delete region');
            req.flash('alertStatus', 'success');
            res.redirect('/region');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/region');
        }
    }
}