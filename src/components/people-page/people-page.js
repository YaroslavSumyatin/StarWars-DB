import { Component } from "react";
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import "./people-page.css";

export default class PeoplePage extends Component {
	state = {
		selectedPerson: null,
		errorCatched: false,
	};

	componentDidCatch() {
		this.setState({ errorCatched: true });
	}

	onPersonSelected = (selectedPerson) => {
		this.setState({ selectedPerson });
	};

	render() {
		if (this.state.errorCatched) {
			return <ErrorIndicator />;
		}
		return (
			<div className="row mb2">
				<div className="col-md-6">
					<ItemList onItemSelected={this.onPersonSelected} />
				</div>
				<div className="col-md-6">
					<PersonDetails personId={this.state.selectedPerson} />
				</div>
			</div>
		);
	}
}
