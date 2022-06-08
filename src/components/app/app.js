import { Component } from "react";
import SwapiService from "../../services/swapi-service";
import DummyService from "../../services/dummy-service";
import ErrorBoundry from "../error-boundry";
import Header from "../header";
import PeoplePage from "../people-page";
import RandomPlanet from "../random-planet/random-planet";
import { SwapiServiceProvider } from "../swapi-service-context";
import "./app.css";

export default class App extends Component {
	state = {
		showRandomPlanet: true,
		swapiService: new SwapiService(),
	};

	onServiceChange = () => {
		this.setState(({ swapiService }) => {
			const Service = swapiService instanceof SwapiService ? DummyService : SwapiService;
			return {
				swapiService: new Service(),
			};
		});
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
		const { showRandomPlanet, swapiService } = this.state;
		const randomPlanetComponent = showRandomPlanet ? <RandomPlanet /> : null;
		return (
			<div className="swdb-app">
				<ErrorBoundry>
					<SwapiServiceProvider value={swapiService}>
						<Header onServiceChange={this.onServiceChange} />
						{randomPlanetComponent}
						<button
							className="toggle-planet btn btn-warning btn-lg"
							onClick={this.toggleRandomPlanet}>
							Toggle Random Planet
						</button>
						<PeoplePage />
					</SwapiServiceProvider>
				</ErrorBoundry>
			</div>
		);
	}
}
