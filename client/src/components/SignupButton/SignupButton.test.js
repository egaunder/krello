import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import SignupButton from './SignupButton'

describe('[SignupButton]', () => {
  test('should render correctly', () => {
    const output = shallow(<SignupButton />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })
})
