import { render, screen } from "@testing-library/react"
import { Button, Button_Large, Button_medium } from "./Buttton"
import { afterEach, vi } from "vitest"


describe('Button', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test('should render default Text correctly', () => {
        const clickHandler = vi.fn()
        render(<Button color={"red"} onClick={clickHandler} className={"btn"} />)

        const buttonElement = screen.getByRole('button')

        expect(buttonElement).toHaveTextContent('Click Me')
    })
})
describe('Button', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test('should render default Text correctly', () => {
        const clickHandler = vi.fn()
        render(<Button_medium color={"red"} onClick={clickHandler} className={"btn"} backgroundColor={"red"} />)

        const buttonElement = screen.getByRole('button')

        expect(buttonElement).toHaveTextContent('Click Me')
    })
})

describe('Button', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    test('should render default Text correctly', () => {
        const clickHandler = vi.fn()
        render(<Button_Large color={"red"} onClick={clickHandler} className={"btn"} backgroundColor={"red"} />)

        const buttonElement = screen.getByRole('button')

        expect(buttonElement).toHaveTextContent('Click Me')
    })
})