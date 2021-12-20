module.exports = {
    index: async(req, res) => {
        try {

            res.render('admin/dashboard/view')
        } catch (err) {
            console.log(err);
        }
    }
}