import { render, screen } from "@testing-library/react"
import Footer from "./Footer"
import { BrowserRouter } from "react-router-dom"

describe('Footer', () => {
    test('should render correctly', () => {
        render(<Footer />, { wrapper: BrowserRouter })
        const textElement = screen.getByText(/copyright © 2023/i)
        expect(textElement).toBeInTheDocument()
        const linkElement = screen.getByRole('link', { name: /about/i })
        expect(linkElement).toBeInTheDocument()

    })
})