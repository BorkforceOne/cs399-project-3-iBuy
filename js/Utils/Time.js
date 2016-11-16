import Moment from 'moment';

const module = {};

export const TimeStrings = {

};
module.TimeStrings= TimeStrings;

export function getTimeToNow(time) {
    return Moment(time).fromNow();
}
module.getTimeToNow = getTimeToNow;

export function getDatetimeFull(time) {
    return Moment(time).format('MMMM Do YYYY, h:mm a');
}
module.getDatetimeFull = getDatetimeFull;

export default module;