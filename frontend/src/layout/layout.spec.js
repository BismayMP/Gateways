import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Layout from './index'
jest.mock('axios')

describe('Layout Component test', () => {
  test('Snapshot testing', () => {
    const component = renderer.create(
      <Layout>
        <a href="/">welcome</a>
      </Layout>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('renders welcome link', () => {
    render(
      <Layout>
        <a href="/">welcome</a>
      </Layout>,
    )
    const linkElement = screen.getByText(/welcome/i)
    expect(linkElement).toBeInTheDocument()
  })
})
