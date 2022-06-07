import { Component } from "react";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Header from "../header";
import PeoplePage from "../people-page";
import RandomPlanet from "../random-planet/random-planet";
import "./app.css";

export default class App extends Component {
	swapiService = new SwapiService();

	state = {
		showRandomPlanet: true,
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
		const { showRandomPlanet } = this.state;
		const randomPlanetComponent = showRandomPlanet ? <RandomPlanet /> : null;
		return (
			<div className="swdb-app">
				<ErrorBoundry>
					<Header />
					{randomPlanetComponent}
					<button
						className="toggle-planet btn btn-warning btn-lg"
						onClick={this.toggleRandomPlanet}>
						Toggle Random Planet
					</button>
					<PeoplePage />
				</ErrorBoundry>
			</div>
		);
	}
}
