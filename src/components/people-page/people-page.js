import { Component } from "react";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import { PersonList, PersonDetails, StarshipList } from "../sw-components";
import "./people-page.css";

export default class PeoplePage extends Component {
	swapiService = new SwapiService();

	state = {
		selectedItem: null,
	};

	onPersonSelected = (selectedItem) => {
		this.setState({ selectedItem });
	};

	render() {
		const itemList = <StarshipList onItemSelected={this.onPersonSelected} />;
		const itemDetails = <PersonDetails itemId={this.state.selectedItem} />;

		return (
			<div>
				<ErrorBoundry>
					<Row left={itemList} right={itemDetails} />
				</ErrorBoundry>
			</div>
		);
	}
}
