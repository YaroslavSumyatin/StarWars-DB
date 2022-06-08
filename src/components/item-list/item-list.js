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

export default ItemList;
