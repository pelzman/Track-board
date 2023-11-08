import { render, screen } from "@testing-library/react"
import Input from "./Input"


describe('Input', () => {
    test('should render placeholder correctly', () => {
        render(<Input placeholder={"placeholder here"} />);
        const text = screen.getByPlaceholderText(/placeholder here/i );
        expect(text).toBeInTheDocument();
    });
});

