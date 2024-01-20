import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('should render Todo', () => {
    const todo = {
        text: 'Hello, test',
        done: false,
    };
    render(<Todo todo={todo} onClickComplete={jest.fn()} onClickDelete={jest.fn()} />)
    const todoText = screen.getByText(todo.text);
    expect(todoText).toBeInTheDocument();
    const todoSetDone = screen.getByText('Set as done');
    expect(todoSetDone).toBeInTheDocument();
});
