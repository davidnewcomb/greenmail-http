import React, {
	Component
} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom"
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import {ViewMessageUrl} from '../c/HgmUrl'
import UnderConstruction from './UnderConstruction'

class ViewMessagePage extends Component {

	constructor(props) {
		super(props)

		this.state = {
			data: {},
			error: false
		}
	}

	componentDidMount() {

		this.setState({
			data: {
			  "headers": {
			    "Content-Transfer-Encoding": "7bit",
			    "Content-Type": "text/plain; charset=us-ascii",
			    "From": "blar@blar.com",
			    "MIME-Version": "1.0",
			    "Message-ID": "<733672688.0.1589203742037@localhost>",
			    "Subject": "sub1",
			    "To": "boo@dest1.com"
			  },
			  "flags": [
			    "RECENT"
			  ],
			  "mailbox": "#mail.-1832304717.INBOX"
			}
		})
		// let mailbox = this.props.match.params.mailbox
		// let uid = this.props.match.params.uid
		// //console.log(this.props)
		//
		// let url = ViewMessageUrl(mailbox, uid)
		// console.log(url)
		// axios.get(url)
		// 	.then(res => {
		// 		// for(let i = 0 ; i <res.data.length ; ++i) {
		// 		// 	res.data[i].id = '' + i
		// 		// 	for (let j = 0 ; j <res.data.length ; ++j) {
		// 		// 		res.data[i].properties[j].id = i + '.' + j
		// 		// 	}
		// 		// }
		// 		// const cfg = res.data
		// 		this.setState({
		// 			data: res.data
		// 		})
		// 	}, (error) => {
		// 		this.setState({
		// 			data: error,
		// 			url: url,
		// 			error: true
		// 		})
		// 	});
	}

	render() {
		if (this.state.error) {
			let eMessage = this.state.data.toString() + " " +this.state.url
			return <Alert variant="danger" dismissible>{eMessage}</Alert>
		}

		return <UnderConstruction/>

		// console.log('-----')
		// console.log(this.state.data)
		console.log('-----h')

		const x1 = this.state.data
		console.log(x1)
		const h1 = x1.headers
		console.log(h1)

		for (var m in x1.headers){
		    for (var i=0;i<x1.headers[m].length;i++){
		    console.log(x1.headers[m][i])
		    }
		}
		const k = Object.entries(h1)

		for (const [key, value] of x1.headers.entries()) {
		  console.log(key, value);
		}

		console.log(k)
		// // const headers = this.state.data.headers
		// console.log(this.state.data['headers'])
		// let h = this.state.data.headers
		// console.log(h.Subject);
		// // console.log(this.state.data.headers.From)

		let crap = {'hi': 'there'}
		console.log(crap)
		console.log(crap.hi)

		//let x = Object.entries(headers).map( (item,index) => {return `i=${index} value=${item}`})

		// const h = Object.keys(headers).map( (key, index) => {
		// 	console.log(key)
		// 	console.log(index)
		//
		// 	return `${key}=${headers[key]}||`
		// })
		// console.log(h)
		const page = ''// this.state.data.map(item => item.toString())
		return <div>{page}</div>
	}
}

export default ViewMessagePage
