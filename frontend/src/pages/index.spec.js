import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Home from './index'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('home page test', () => {
  test('Snapshot testing', () => {
    const component = renderer.create(<Home />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('renders h1 with no gateways', async () => {
    act(() => {
      ReactDOM.render(<Home />, container)
    })
    const h1Element = screen.getByText(/no gateways/i)
    expect(h1Element).toBeInTheDocument()
  })

  test('renders add gateways button and show modal on button click', async () => {
    act(() => {
      ReactDOM.render(<Home />, container)
    })
    const button = screen.getByRole('button')
    button.click()
    const modal = screen.getByRole('presentation')
    expect(button).toBeInTheDocument()
    expect(modal).toBeInTheDocument()
  })
})
