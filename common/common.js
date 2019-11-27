const moment = require('moment');

module.exports = {

    // get periods according to index received from frontend period
    getPeriods: (period) => {
        const today = moment().utc(false).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        const dateFrom = moment().utc(false).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

        let result = {};

        switch (period) {
            case 1:
                // 7 days
                result = {
                    endDate: today.add(1, 'd'),
                    startDate: dateFrom.subtract(7, 'd')
                };
                break;
            case 2:
                // 1 month
                result = {
                    endDate: today.add(1, 'd'),
                    startDate: dateFrom.subtract(30, 'd')
                };
                break;
            case 3:
                // 3 months
                result = {
                    endDate: today.add(1, 'd'),
                    startDate: dateFrom.subtract(3, 'months')
                };
                break;
            case 4:
                // 6 months
                result = {
                    endDate: today.add(1, 'd'),
                    startDate: dateFrom.subtract(6, 'months')
                };
                break;
            default:
                result = {
                    startDate: today,
                    endDate: dateFrom.add(1, 'd')
                };
        };

        return result;
    },

    getLastMinutes: (minutes) => {
        return {
            endDate: moment().subtract(minutes, 'minutes')
        };
    },

    getTimeZoneOffset: () => {
        return moment().utcOffset() / 60
    }
};