import { withData, withChildFunction, withSwapiService } from "../hoc-helpers";
import ItemList from "../item-list";

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ name, model }) => (
	<span>
		{name} ({model})
	</span>
);

const mapPersonMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPeople,
	};
};

const PersonList = withSwapiService(
	withData(withChildFunction(ItemList, renderName)),
	mapPersonMethodsToProps
);

const mapPlanetMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets,
	};
};

const PlanetList = withSwapiService(
	withData(withChildFunction(ItemList, renderName)),
	mapPlanetMethodsToProps
);

const mapStarshipMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllStarships,
	};
};

const StarshipList = withSwapiService(
	withData(withChildFunction(ItemList, renderModelAndName)),
	mapStarshipMethodsToProps
);

export { PersonList, PlanetList, StarshipList };
