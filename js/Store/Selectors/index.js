import _ from 'lodash';
import * as MembershipSelectors from './MembershipSelectors';
import * as GroupSelectors from './GroupSelectors';
import * as UserSelectors from './UserSelectors';
import * as ItemSelectors from './ItemSelectors';

export default _.merge(MembershipSelectors, GroupSelectors, UserSelectors, ItemSelectors);