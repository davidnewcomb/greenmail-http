import {PurgeMailsUrl} from '../c/HgmUrl'
import NoDataPage from './NoDataPage'

class SystemPurgeMailsPage extends NoDataPage {

	overrideMessage() {
		return "Deleted all mails"
	}

	overrideUrl() {
		return PurgeMailsUrl()
	}
}

export default SystemPurgeMailsPage
