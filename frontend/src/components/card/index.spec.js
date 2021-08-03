import { cleanup, render, screen } from '@testing-library/react'
import Card from './index'
import renderer from 'react-test-renderer'

afterEach(cleanup)

describe('Card component', () => {
  const gateway = { name: 'test gateway', ipv4: '1.1.1.1' }
  const onDelete = jest.fn((item) => null)
  const showDetails = jest.fn((item) => null)
  test('should match snapshot', () => {
    const component = renderer.create(
      <Card gateway={gateway} onDelete={onDelete} showDetails={showDetails} />,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('All elements are in the dom', () => {
    render(
      <Card gateway={gateway} onDelete={onDelete} showDetails={showDetails} />,
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument()
      button.click()
    })
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(showDetails).toHaveBeenCalledTimes(1)
    const name = screen.getByText(gateway.name)
    expect(name).toBeInTheDocument()
    const ipv4 = screen.getByText(gateway.ipv4)
    expect(ipv4).toBeInTheDocument()
    const devicesAmount = screen.getByText('Peripheral devices: 0')
    expect(devicesAmount).toBeInTheDocument()
  })
})
