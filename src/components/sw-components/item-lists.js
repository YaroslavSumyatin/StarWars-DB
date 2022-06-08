import { withData, withChildFunction, withSwapiService, compose } from "../hoc-helpers";
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

const PersonList = compose(
	withSwapiService(mapPersonMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList);

const mapPlanetMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets,
	};
};

const PlanetList = compose(
	withSwapiService(mapPlanetMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList);

const mapStarshipMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllStarships,
	};
};

const StarshipList = compose(
	withSwapiService(mapStarshipMethodsToProps),
	withData,
	withChildFunction(renderModelAndName)
)(ItemList);

export { PersonList, PlanetList, StarshipList };
