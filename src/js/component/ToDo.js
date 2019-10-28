import React from "react";
import PropTypes from "prop-types";

export class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: "" };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleDelete(i) {
		console.log("it works, index=", i);
		let items = this.state.items;
		items.splice(i, 1);
		console.log(items);
		this.setState({ items: items, text: "" });
	}

	handleChange(e) {
		this.setState({ text: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.text.length) {
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now()
		};
		this.setState(state => ({
			items: state.items.concat(newItem),
			text: ""
		}));
	}

	render() {
		return (
			<div id="wrapper">
				<div id="container">
					<h3>todos</h3>
					<TodoList
						items={this.state.items}
						delete={this.handleDelete.bind(this)}
					/>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="new-todo">Task:</label>
						<input
							id="new-todo"
							onChange={this.handleChange}
							value={this.state.text}
							setTodos={this.setTodos}
						/>
						<button>Do it!</button>
					</form>
					<div id="items-pending">
						{this.state.items.length} Items Pending
					</div>
				</div>
			</div>
		);
	}
}

export class TodoList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.items.map((item, index) => (
					<li key={item.id}>
						{item.text}{" "}
						<a href="#" onClick={() => this.props.delete(index)}>
							[x]
						</a>
					</li>
				))}
			</ul>
		);
	}
}

TodoList.propTypes = {
	items: PropTypes.array,
	delete: PropTypes.func,
	setTodos: PropTypes.func
};

///////////
