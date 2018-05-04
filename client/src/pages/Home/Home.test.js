import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Home from './Home'

describe('Home', () => {
  test('should render correctly', () => {
    const output = shallow(<Home />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })
})
