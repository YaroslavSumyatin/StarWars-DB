import { Component } from "react";
import SwapiService from "../../services/swapi-service";
import DummyService from "../../services/dummy-service";
import ErrorBoundry from "../error-boundry";
import Header from "../header";
import RandomPlanet from "../random-planet/random-planet";
import { SwapiServiceProvider } from "../swapi-service-context";
import "./app.css";
import PeoplePage from "../pages/people-page";
import PlanetPage from "../pages/planets-page";
import StarshipPage from "../pages/starships-page";

export default class App extends Component {
	state = {
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

	render() {
		const { swapiService } = this.state;
		return (
			<div className="swdb-app">
				<ErrorBoundry>
					<SwapiServiceProvider value={swapiService}>
						<Header onServiceChange={this.onServiceChange} />
						<RandomPlanet />
						<PeoplePage />
						<PlanetPage />
						<StarshipPage />
					</SwapiServiceProvider>
				</ErrorBoundry>
			</div>
		);
	}
}
