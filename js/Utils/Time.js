import Moment from 'moment';

const module = {};

export const TimeStrings = {

};
module.TimeStrings= TimeStrings;

export function getTimeToNow(time) {
    return Moment(time).toNow();
}
module.getTimeToNow = getTimeToNow;

export default module;