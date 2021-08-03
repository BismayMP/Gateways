import { cleanup, render, screen } from '@testing-library/react'
import Device from './index'
import renderer from 'react-test-renderer'

afterEach(cleanup)

const formatDate = (str) => {
  const date = new Date(str)
  return date.toDateString()
}

describe('Details component', () => {
  const device = {
    _id: '610878604df35a739fc63b0c',
    vendor: '1',
    status: 'online',
    date: '2021-08-02T22:57:36.105Z',
  }
  const onDelete = jest.fn((item) => null)
  const statusChange = jest.fn((item) => null)
  test('should match snapshot', () => {
    const component = renderer.create(
      <Device
        device={device}
        onStatusChange={statusChange}
        onDelete={onDelete}
      />,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('All elements are in the dom', () => {
    render(
      <Device
        device={device}
        onStatusChange={statusChange}
        onDelete={onDelete}
      />,
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument()
      button.click()
    })
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(statusChange).toHaveBeenCalledTimes(1)
    const deviceStatus = screen.getByText('online')
    expect(deviceStatus).toBeInTheDocument()
    const deviceVendor = screen.getByText('name: 1')
    expect(deviceVendor).toBeInTheDocument()
    const deviceDate = screen.getByText(
      `Created at: ${formatDate('2021-08-02T22:57:36.105Z')}`,
    )
    expect(deviceDate).toBeInTheDocument()
  })
})
