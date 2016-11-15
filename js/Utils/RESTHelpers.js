/**
 * Created by Brandon Garling on 11/14/2016.
 */
import RESTErrors from '../Models/RESTErrors';
import Actions from '../Store/Actions';

export function parseRESTResponse(json) {
    // Ensure it is in the format we expect from the backend
    if (json.Errors === undefined || !Array.isArray(json.Errors) || json.Payload === undefined) {
        throw new RESTErrors("Unexpected response");
    }
    if (json.Errors.length > 0) {
        throw new RESTErrors(json.Errors);
    }
    return json.Payload;
}

export function handleRESTErrors(dispatch, errors) {
    if (errors.constructor == RESTErrors) {
        errors.Errors.map(error => {
            dispatch(Actions.addNotification(error))
        });
    }
    else {
        dispatch(Actions.addNotification("Unhandled error occurred"))
    }
    console.log(errors);
}