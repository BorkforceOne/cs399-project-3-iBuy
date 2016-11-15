/**
 * Created by Brandon Garling on 11/14/2016.
 */
export default class RESTErrors {
    Errors = [];

    constructor(errors) {
        if (Array.isArray(errors)) {
            errors.map(error => {
                this.Errors.push(error);
            });
        }
        else if (errors !== undefined) {
            this.Errors.push(errors);
        }
    }
}
