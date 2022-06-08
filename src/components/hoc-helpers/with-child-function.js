const withChildFunction = (childFunction) => (WrappedComponent) => {
	return (props) => {
		return <WrappedComponent {...props}>{childFunction}</WrappedComponent>;
	};
};

export default withChildFunction;
