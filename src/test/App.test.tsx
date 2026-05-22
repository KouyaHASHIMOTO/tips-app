import {render,screen} from '@testing-library/react'
import App from '../App'


describe('App', () => {
  test('Appが表示されている', () => {
    render(<App />)
    expect(screen.getByText("App")).toBeInTheDocument()
  })
})