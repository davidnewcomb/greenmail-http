import {PurgeUsersUrl} from '../c/GmhUrl'
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
