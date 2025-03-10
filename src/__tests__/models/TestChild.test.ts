import TestChild from './TestChild'
import {TestPost} from './TestPost'

describe('TestChild', () => {
  it('should have convert set to false', () => {
    const testChild = new TestChild()
    expect(testChild.convert).toBe(false)
  })

  it('should have snake case properties', () => {
    const testChild = new TestChild()
    expect(testChild.test_property_one).toBe('')
    expect(testChild.test_property_two).toBe(0)
    expect(testChild.test_property_three).toBe(false)
  })

  it('should set properties from mock data', () => {
    const mockData = {
      id: 1,
      test_property_one: 'test',
      test_property_two: 1,
      test_property_three: true,
      relation_property: {id: 1, title: 'test', camel_case_property: 'test'},
      array_mappable_property: [
        {id: 1, title: 'test', camel_case_property: 'test'},
      ],
    }
    const testChild = new TestChild(mockData)
    expect(testChild.id).toBe(1)
    expect(testChild.test_property_one).toBe('test')
    expect(testChild.test_property_two).toBe(1)
    expect(testChild.test_property_three).toBe(true)
    expect(testChild.relation_property.get()?.id).toBe(1)
    expect(testChild.relation_property.get()?.camelCaseProperty).toBe('test')
    expect(testChild.relation_property.get() instanceof TestPost).toBe(true)
    expect(testChild.array_mappable_property[0].title).toBe('test')
    expect(testChild.array_mappable_property[0] instanceof TestPost).toBe(true)
  })

  it('should get postable data', () => {
    const mockData = {
      id: 1,
      test_property_one: 'test',
      test_property_two: 1,
      test_property_three: true,
      relation_property: {id: 1, title: 'test', camel_case_property: 'test'},
      array_mappable_property: [
        {id: 1, title: 'test', camel_case_property: 'test'},
      ],
    }
    const testChild = new TestChild(mockData)
    const postable = testChild.getPostable()

    expect(postable).toEqual({
      id: 1,
      test_property_one: 'test',
      test_property_two: 1,
      test_property_three: true,
      relation_property: {
        id: 1,
        title: 'test',
        camel_case_property: 'test',
        comments: [],
        content: '',
      },
      array_mappable_property: [
        {
          id: 1,
          title: 'test',
          camel_case_property: 'test',
          comments: [],
          content: '',
        },
      ],
    })
  })
})
