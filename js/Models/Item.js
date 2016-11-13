/**
 * Created by Brandon Garling on 11/9/2016.
 */
import Moment from 'moment';

let nextId = -1;
export default class Item {
    Id;
    PurchaserId = null;
    GroupId = null;
    Name = "";
    Quantity = 1;
    Cost = 1;
    Category = "";
    Due = Moment().toISOString();
    Color = "#00f";

    constructor(id) {
        if (id === undefined)
            this.Id = nextId--;
        else
            this.Id = id;
    }
}
