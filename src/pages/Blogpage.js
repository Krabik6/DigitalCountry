// // import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';

// const scouts = ["levi", "hange", "erwin", "petra", "oruo", "miche"]
// const page = 1;
// const contentPerPage = 3
// const lastIndex = page * contentPerPage // 3
// const firstIndex = lastIndex - contentPerPage // 0
// scouts.slice(firstIndex, lastIndex)

// const Blogpage = () => {
//     //
//     return (
//         <div>
//             <h1>Our news</h1>

//         </div>
//     )
// }

// export {Blogpage}
const outs = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 4, 5, 6, 13, 5, 7, 8,
];

class Blogpage extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: outs,
            currentPage: 1,
            todosPerPage: 4, //15
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id),
        });
    }

    render() {
        const {todos, currentPage, todosPerPage} = this.state;

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
            return <li key={index}>{todo}</li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map((number) => {
            return (
                <li key={number} id={number} onClick={this.handleClick}>
                    {number}
                </li>
            );
        });

        return (
            <div>
                <div className='blockpage-news'>
                    <ul>{renderTodos}</ul>
                </div>
                <div className='blockpage-pagination'>
                    <ul id='page-numbers'>{renderPageNumbers}</ul>
                </div>
            </div>
        );
    }
}

export {Blogpage};
