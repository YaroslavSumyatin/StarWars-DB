import { Component } from "react";
import ErrorIndicator from "../error-indicator";
import "./error-boundry.css";

export default class ErrorBoundry extends Component {
	state = {
		errorCatched: false,
	};

	componentDidCatch() {
		this.setState({ errorCatched: true });
	}

	render() {
		if (this.state.errorCatched) {
			return (
				<div className="h-100 d-flex align-items-center justify-content-center">
					<ErrorIndicator />
				</div>
			);
		}
		return this.props.children;
	}
}
