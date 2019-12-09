class Books extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title  : '',
			author : '',
			image  : '',
			books  : []
		};
	}

	//Component did mount
	componentDidMount = () => {
		fetch('/books').then((response) => response.json()).then((books) => {
			this.setState({ books: books });
		});
	};

	//handle change and submit
	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);
		fetch('/books', {
			body    : JSON.stringify({ title: this.state.title }),
			method  : 'POST',
			headers : {
				Accept         : 'application/json, text/plain, */*',
				'Content-Type' : 'application/json'
			}
		})
			.then((createdBook) => {
				return createdBook.json();
			})
			.then((jsonedBook) => {
				// reset the form
				// add person to list
				this.setState({
					title : '',
					books : [jsonedBook, ...this.state.books]
				});
				console.log(books);
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<br />
				<br />
				<br />
				<h6>Books Catalogue</h6>
				<form onSubmit={this.handleSubmit}>
					<label for="title" />
					<input
						type="text"
						placeholder="title"
						value={this.state.title}
						onChange={this.handleChange}
						id="title"
					/>
					<input type="submit" value="Create Book!" />
				</form>
				{/* <ul>
					{this.state.books.map((book) => {
						return (
							<ul>
								<li>{book.title}</li>
								<li>{book.image}</li>
								<td onClick={() => this.deleteBook(book._id, index)}> X </td>
								<td onClick={() => this.updateBook(book, index)}> Edit Book </td>
							</ul>
						);
					})}
				</ul> */}
			</React.Fragment>
		);
	}
}