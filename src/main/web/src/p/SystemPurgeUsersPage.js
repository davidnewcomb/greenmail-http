import {PurgeUsersUrl} from '../c/HgmUrl'
import NoDataPage from './NoDataPage'

class SystemPurgeMailsPage extends NoDataPage {

	overrideMessage() {
		return "Deleted all users"
	}

	overrideUrl() {
		return PurgeUsersUrl()
	}
}
export default SystemPurgeMailsPage
