import _ from 'lodash';
import * as MembershipSelectors from './MembershipSelectors';
import * as GroupSelectors from './GroupSelectors';
import * as UserSelectors from './UserSelectors';
import * as ItemSelectors from './ItemSelectors';
import * as SessionSelectors from './SessionSelectors';

export default _.merge(MembershipSelectors, GroupSelectors, UserSelectors, ItemSelectors, SessionSelectors);