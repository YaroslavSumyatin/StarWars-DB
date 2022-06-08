import PropTypes from "prop-types";
import "./item-list.css";

const ItemList = ({ data, onItemSelected, children: renderLabel }) => {
	const items = data.map((item) => {
		const { id } = item;
		const label = renderLabel(item);
		return (
			<li key={id} className="list-group-item" onClick={() => onItemSelected(id)}>
				{label}
			</li>
		);
	});
	return <ul className="item-list list-group">{items}</ul>;
};

ItemList.defaultProps = {
	onItemSelected: () => {},
};

ItemList.propTypes = {
	onItemSelected: PropTypes.func,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	children: PropTypes.func.isRequired,
};

export default ItemList;
