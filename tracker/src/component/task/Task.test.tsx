import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import Tasks from "./Tasks"

import { server } from "../../mocks/server"
import Task from "./Task"
import { http, HttpResponse } from "msw"
import { BrowserRouter } from "react-router-dom"

describe('Task', () => {
    test('should render corectly', () => {
        let tasks = {

            id: "1",
            text: "washing",
            day: "monday, 12/11/2023",
            reminder: true
        }
        const mockOnDelete = vi.fn()
        const mockOnToggle = vi.fn()
        render(<Task task={tasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />, { wrapper: BrowserRouter })
        const nameElement = screen.getByText('washing')
        expect(nameElement).toBeInTheDocument()


    })
})

describe('Tasks', () => {
    test('should render listItems', async () => {
        const tasks = [{ id: "1", text: "praying", day: "monday,10/10/2023", reminder: true }]
        const mockOnDelete = vi.fn()
        const mockOnToggle = vi.fn()
        render(<Tasks tasks={tasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />, { wrapper: BrowserRouter })
        const listElements = await screen.findAllByRole("task")
        expect(listElements).toHaveLength(tasks.length);


    })

    test('render error', () => {
        server.use(
            http.get('http://localhost:3000/api/tasks', () => {
                return HttpResponse.json({ status: 500 })
            })
        )
    })


})