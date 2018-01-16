let request = require('request');

const LEVEL_DEBUG = 'debug';
const LEVEL_INFO = 'info';
const LEVEL_NOTICE = 'notice';
const LEVEL_WARNING = 'warning';
const LEVEL_ERROR = 'error';
const LEVEL_CRITICAL = 'critical';
const LEVEL_EMERGENCY = 'emergency';

module.exports = function (project, secret, api) {

    api = api || 'https://logfoot.obodi.eu';

    let log = function (subject, context, level, cb) {
        request.post({
            url: api,
            body: {
                secret: secret,
                project: project,
                subject: subject,
                context: context,
                level: level
            },
            json: true
        }, function (error, response, body) {

            if (!cb) {
                return;
            }

            if (error || response.statusCode !== 200) {
                return cb(error);
            }

            return cb(null);
        });
    };

    return {
        debug: function (subject, context, cb) {
            log(subject, context, LEVEL_DEBUG, cb);
        },
        info: function (subject, context, cb) {
            log(subject, context, LEVEL_INFO, cb);
        },
        notice: function (subject, context, cb) {
            log(subject, context, LEVEL_NOTICE, cb);
        },
        warning: function (subject, context, cb) {
            log(subject, context, LEVEL_WARNING, cb);
        },
        error: function (subject, context, cb) {
            log(subject, context, LEVEL_ERROR, cb);
        },
        critical: function (subject, context, cb) {
            log(subject, context, LEVEL_CRITICAL, cb);
        },
        emergency: function (subject, context, cb) {
            log(subject, context, LEVEL_EMERGENCY, cb);
        }
    };
};