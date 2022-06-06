import { Component } from "react";
import ErrorIndicator from "../error-indicator";
import Header from "../header";
import PeoplePage from "../people-page";
import RandomPlanet from "../random-planet/random-planet";
import "./app.css";

export default class App extends Component {
	state = {
		showRandomPlanet: true,
		errorCatched: false,
	};

	componentDidCatch() {
		this.setState({ errorCatched: true });
	}

	toggleRandomPlanet = () => {
		this.setState((state) => {
			return { showRandomPlanet: !state.showRandomPlanet };
		});
	};

	render() {
		const { showRandomPlanet, errorCatched } = this.state;
		if (errorCatched) {
			return <ErrorIndicator />;
		}
		const randomPlanetComponent = showRandomPlanet ? <RandomPlanet /> : null;
		return (
			<div>
				<Header />
				{randomPlanetComponent}
				<button
					className="toggle-planet btn btn-warning btn-lg"
					onClick={this.toggleRandomPlanet}>
					Toggle Random Planet
				</button>
				<PeoplePage />
			</div>
		);
	}
}
