'use strict';
module.exports = function() {
    require('./user/user.model.server');
    require('./page/page.model.server');
    require('./website/website.model.server');
    require('./widget/widget.model.server');
}();