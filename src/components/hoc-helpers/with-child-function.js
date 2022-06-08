const withChildFunction = (WrappedComponent, func) => {
	return (props) => {
		return <WrappedComponent {...props}>{func}</WrappedComponent>;
	};
};

export default withChildFunction;
