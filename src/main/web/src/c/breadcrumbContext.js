import React, {Component} from 'react'

// https://reactjs.org/docs/context.html
// The is the default context! i.e. placeholders for the one
// to be passed in via value=
const BreadcrumbContext = React.createContext({
	addBreadcrumb: (title, link) => {
		console.error(`BreadcrumbContext.addBreadcrumb:${title}:${link}`)
	},
	removeBreadcrumb: (id) => {
		console.error(`BreadcrumbContext.removeBreadcrumb:${id}`)
	},
	getBreadcrumbs: () => {
		console.error('BreadcrumbContext.getBreadcrumbs')
	}
})
//const BreadcrumbContext = React.createContext()

const Provider = BreadcrumbContext.Provider
const Consumer = BreadcrumbContext.Consumer

class BreadcrumbContextProvider extends Component {

	constructor(props) {
		super(props)
		this.state = {
			breadcrumbs: [],
			addBreadcrumb: this.addBreadcrumb,
			removeBreadcrumb: this.removeBreadcrumb,
			getBreadcrumbs: this.getBreadcrumbs
		}
	}

	addBreadcrumb = (title, link) => {
		const id = link.replace( /[^a-zA-Z0-9]/g, "")

		let found = this.state.breadcrumbs.filter( i => i.link === link)
		if (found.length === 1) {
			return
		}

		const o = {id: id, title: title, link: link}
		this.setState( (prevState, state) => {
			const newBreadcrumbs = prevState.breadcrumbs.concat(o)
			return {
				breadcrumbs: newBreadcrumbs
			}
		})
	}

	removeBreadcrumb = (id) => {
		const a = this.state.breadcrumbs.filter(item => item.id !== id)
		this.setState({
			breadcrumbs: a
		})
	}

	getBreadcrumbs = () => {
		return this.state.breadcrumbs
	}

	render() {

		return (
			<Provider value={this.state}>
			{this.props.children}
			</Provider>
		)
	}
}

export {BreadcrumbContextProvider,
	Consumer as BreadcrumbContextConsumer,
	BreadcrumbContext}
