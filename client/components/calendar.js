import React, { Component } from 'react';


export default class Calendar extends Component {
	componentDidMount() {
		const { calendar } = this.refs;

		$(calendar).fullCalendar();
	}

	render() {
		return (
			<div ref="calendar"></div>
		);
	}
}