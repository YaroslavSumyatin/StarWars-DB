import { Component } from "react";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import { PersonList, PersonDetails } from "../sw-components";
import "./people-page.css";

export default class PeoplePage extends Component {
	state = {
		selectedItem: null,
	};

	onPersonSelected = (selectedItem) => {
		this.setState({ selectedItem });
	};

	render() {
		const itemList = <PersonList onItemSelected={this.onPersonSelected} />;
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
