'use strict';
module.exports = function(mongoose) {
    require('./user/user.model.server')(mongoose);
    require('./page/page.model.server')(mongoose);
    require('./website/website.model.server')(mongoose);
    require('./widget/widget.model.server')(mongoose);
};