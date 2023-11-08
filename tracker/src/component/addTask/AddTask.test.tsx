import { render, screen } from "@testing-library/react"
import AddTask from "./AddTask"
import { vi } from "vitest"
import user from "@testing-library/user-event"


describe('AddTask', () => {
    test('should render correctly', () => {
        const submitHandler = vi.fn()
        render(<AddTask onAdd={submitHandler} />)
        const textElement = screen.getByText("Task")
        expect(textElement).toBeInTheDocument()

        const textElement2 = screen.getByText("Day & Time")
        expect(textElement2).toBeInTheDocument()

        const textElement3 = screen.getByText("Set Reminder")
        expect(textElement3).toBeInTheDocument()

    })
    test('should render the form correctly', () => {
        const submitHandler = vi.fn()
        render(<AddTask onAdd={submitHandler} />)
        const formElement = screen.getByRole('form')
        expect(formElement).toBeInTheDocument()
    })
    test('should render task  on click button ', async () => {
        user.setup()
        const addHandler = vi.fn()

        render(<AddTask onAdd={addHandler} />)
        const addTask = screen.getByRole('button', { name: "save Task" })
        await user.click(addTask)
        expect(addTask).toBeInTheDocument()

    })})



