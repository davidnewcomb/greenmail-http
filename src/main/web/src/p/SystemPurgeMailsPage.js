import {PurgeMailsUrl} from '../c/GmhUrl'
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
