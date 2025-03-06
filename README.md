## alcts

### Installation

With yarn:

```bash
yarn add @team-decorate/alcts
```

### Usage

#### Model create

```typescript
import {Model, ArrayMappable, Relation} from '@team-decorate/alcts'
import Post from './models/Post'
import Comment from './models/Comment'
import ParentGroup from './models/ParentGroup'

/*
 * Only those added to fillable will be sent
 */
const FILLABLE = ['id', 'name', 'email', 'password', 'type']

class User extends Model {
  id: number = 0
  name: string = ''
  email: string = ''
  password: string = ''
  type: number = 0
  posts: Array<Post> = []
  userComments: Array<Comment> = []
  parentGroup = new Relation(ParentGroup)

  constructor(data: object = {}) {
    super()
    this.fillable = FILLABLE
    //presents is send even if the field is empty
    this.presents = ['type']

    this.arrayMap(
      new ArrayMappable(Post),
      new ArrayMappable(Comment).bind('userComments')
    )

    this.data = data
  }
}

class ParentGroup extends Model {
  user = new Relation(User)
}
```

#### How to use

```json
#user api json response
{
  "id": 1,
  "name": "test-user",
  "email": "test@mail.com",
  "type": 1,
  "posts": [
    {"id": 1, "text": "test post 1"},
    {"id": 2, "text": "test post 2"}
  ],
  "user_comments": [
    {"id": 1, "text": "test comment 1"},
    {"id": 2, "text": "test comment 2"}
  ],
  "parent_group": {
    "id": 1,
    "name": "Test Group"
  }
}
```

```typescript
export default {
  methods: {
    async get() {
      const {data} = await axios.get('/api/user')
      this.user = new User(data)

      // リレーションの取得
      const parentGroup = this.user.parentGroup.get()
      console.log(parentGroup instanceof ParentGroup) // true
      console.log(parentGroup.id) // 1
      console.log(parentGroup.name) // "Test Group"

      // リレーションの設定
      const newParentGroup = new ParentGroup({id: 2, name: 'New Group'})
      this.user.parentGroup.set(newParentGroup)

      // 配列の処理
      this.user.posts.forEach(post => {
        console.log(post instanceof Post) // true
        console.log(post.text)
      })

      this.user.userComments.forEach(comment => {
        console.log(comment instanceof Comment) // true
      })
    },

    async post() {
      /*
       * What is added to fillable and contains value is sent
       */
      const {data} = await this.user.post('/api/user')
      this.user.update(data)
    },
  },
}
```

### Relation Class

`Relation`クラスは、モデル間の関連を管理するためのユーティリティクラスです。

#### メソッド

| メソッド | 引数     | 戻り値 | 説明                                                                 |
| -------- | -------- | ------ | -------------------------------------------------------------------- |
| get      | -        | T      | 関連するモデルのインスタンスを取得。初回アクセス時に初期化されます。 |
| set      | T \| any | void   | 関連するモデルのインスタンスを設定します。                           |

#### 特徴

- 遅延初期化による循環参照の防止
- 型安全性の確保
- シンプルで直感的な API

### Overridable Property

| methods        | value | description               |
| -------------- | ----- | ------------------------- |
| beforePostable | null  | Called before sending api |
| afterPostable  | res   | Called after sending api  |

### Model Methods

| methods     | args   | output |
| ----------- | ------ | ------ |
| getPostable | null   | Object |
| update      | Object | null   |
