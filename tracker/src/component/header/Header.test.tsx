import { render, screen } from "@testing-library/react"
import Header from "./Header"
import { vi } from "vitest"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"


describe('Header', () => {
    test('should render corectly', () => {
        const mockOnAdd = vi.fn()
        const mockOnLogout = vi.fn()
        render(<Header title={"Tracker"} showTask={true} onAdd={mockOnAdd} onLogout={mockOnLogout} />, { wrapper: BrowserRouter })
        const nameElement = screen.getByRole('heading', { name: /Tracker/i })
        expect(nameElement).toBeInTheDocument()

    })

    test('should logout on click logout button ', async () => {
        user.setup()
        const mockOnAdd = vi.fn()
        const mockOnLogout = vi.fn()
        render(<Header title={"Logout"} showTask={true} onAdd={mockOnAdd} onLogout={mockOnLogout} />, { wrapper: BrowserRouter })
        const buttonElement = screen.getByRole('link',{name:/./i} )
        await user.click(buttonElement)
        expect(buttonElement).toBeInTheDocument()

    })
})