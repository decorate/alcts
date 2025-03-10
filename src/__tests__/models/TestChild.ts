import Model from '../../Model'
import {IIndexable} from '@/interfaces'
import {Relation} from '../../Relation'
import {ArrayMappable} from '../../entities/ArrayMappable'
import {TestPost} from './TestPost'

export class TestChild extends Model {
  id: number = 0
  test_property_one: string = ''
  test_property_two: number = 0
  test_property_three: boolean = false
  relation_property: Relation<TestPost> = new Relation(TestPost)
  array_mappable_property: TestPost[] = []

  constructor(data: IIndexable = {}) {
    super()
    this.convert = false
    this.fillable = [
      'id',
      'test_property_one',
      'test_property_two',
      'test_property_three',
      'relation_property',
      'array_mappable_property',
    ]

    this.arrayMap(new ArrayMappable(TestPost).bind('array_mappable_property'))

    if (Object.keys(data).length > 0) {
      this.data = data
    }
  }
}

export default TestChild
