import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ReduxInputField from './ReduxInputField'

describe('ReduxInputField', () => {
  const props = {
    input: {},
    placeholder: '',
    type: '',
    meta: {},
    label: '',
  }

  test('should render correctly', () => {
    const output = shallow(<ReduxInputField {...props} />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  test('should contain call form__group', () => {
    const wrapper = mount(<ReduxInputField {...props} />)
    const div = wrapper.find('div')
    expect(div.length).toBe(1)
    expect(div.hasClass('form__group')).toBe(true)
  })
})
