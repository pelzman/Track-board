import { render, screen } from "@testing-library/react"
import About from "./About"
import { BrowserRouter } from "react-router-dom"

describe('About', () => {
    test('should render correctly', () => {
        render(<About />, { wrapper: BrowserRouter })
        const nameElement = screen.getByRole("heading", { level: 4 })
        expect(nameElement).toHaveTextContent("Version 1.0.0")
        const linkElement = screen.getByText("Go back home")
        expect(linkElement).toBeInTheDocument()
    })
})