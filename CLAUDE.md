# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

alcts (@team-decorate/alcts) is a TypeScript library providing a Model-based data mapping system similar to Laravel's Eloquent ORM. It handles automatic snake_case/camelCase conversion, manages relationships between models, and provides serialization for API requests.

## Development Environment

### Docker Setup
This project uses Docker for development. Tests and package installation must be run inside the Docker container:

```bash
# Start Docker container (if not running)
make up

# Connect to Docker container
make connect

# Inside container: install dependencies and run tests
yarn install
yarn test
```

### Running Tests
```bash
# Run all tests (must be inside Docker container)
yarn test

# Run specific test file
jest src/__tests__/models/TestUser.test.ts
```

### Build
```bash
# Build TypeScript to dist/
yarn build

# Type checking without emitting files
yarn type-check
```

## Architecture

### Core Components

**Model (src/Model.ts)**: Base class for all data models
- Handles automatic snake_case ↔ camelCase conversion via `convert` flag
- `fillable`: defines which properties can be sent to API
- `presents`: properties sent even when empty
- `ignore`: properties to exclude from serialization
- `getPostable()`: serializes model for API requests
- `update(data)`: updates model with new data
- Lifecycle hooks: `beforePostable()`, `afterPostable(res)`

**Relation (src/Relation.ts)**: Manages model relationships
- Lazy initialization to prevent circular reference issues
- `get()`: retrieves related model instance
- `set(value)`: sets related model, auto-instantiating from plain objects
- Supports deep circular references (e.g., User → ParentGroup → User)

**ArrayMappable (src/entities/ArrayMappable.ts)**: Maps arrays of related models
- Uses pluralization for default binding (e.g., `Post` → `posts`)
- `.bind(key)`: override default property binding

### Data Flow

1. **Incoming API data** (snake_case) → Model constructor → `data` setter → `create()` method
2. `create()` converts snake_case to camelCase, maps to properties, instantiates relations
3. **Outgoing API data**: `getPostable()` converts camelCase to snake_case, serializes relations

### Model Definition Pattern

```typescript
import {Model, ArrayMappable, Relation} from '@team-decorate/alcts'

const FILLABLE = ['id', 'name', 'email']

class User extends Model {
  id: number = 0
  name: string = ''
  email: string = ''
  posts: Array<Post> = []
  parentGroup = new Relation(ParentGroup)

  constructor(data: object = {}) {
    super()
    this.fillable = FILLABLE
    this.presents = ['id']  // Send even if empty

    this.arrayMap(
      new ArrayMappable(Post)  // Auto-binds to 'posts'
    )

    this.data = data
  }
}
```

## Development Guidelines

### Language
**All responses and code comments must be in Japanese** (日本語で返答する)

### Code Style
- **Naming**:
  - Interfaces: `I○○` prefix (e.g., `IModel.ts`)
  - Variables/functions: lowerCamelCase
- **TypeScript**: Avoid enums, use maps instead
- **Functions**: Use `function` keyword for pure functions
- **Error handling**:
  - Handle errors at function start with early returns
  - Avoid deep nesting, prefer guard clauses
  - Include detailed context in error messages (function name, arguments, parameters)

### Test-Driven Development (TDD)
**Critical**: Tests define the specification, not the implementation
1. Write test code defining expected behavior
2. Verify test fails
3. **Modify source code to pass tests** (never modify tests to match broken code)
4. Tests are the source of truth—implementation must conform to tests

### Code Quality
- Remove all unused imports after changes
- Prioritize readability over performance
- Avoid TODOs, placeholders, or incomplete code
- Maintain consistency with existing codebase style

## Pull Request Workflow

When creating PRs:
1. **Always ask user**: "関連するIssueのリンクはありますか？" (unless already provided)
2. Check diff against master: `git diff origin/master...HEAD | cat`
3. Create draft PR unless specified otherwise:
```bash
git push origin HEAD && \
echo -e "{{PR template}}" | \
gh pr create --draft --title "{{title}}" --body-file - && \
gh pr view --web
```

PR template sections:
- 概要 (Summary)
- 変更点 (Changes)
- 影響範囲 (Impact scope)
- テスト結果 (Test results)
- チェックリスト (Checklist)
- その他 (Notes for reviewers, related Issues)

## Common Pitfalls

1. **Circular references**: Use `Relation<T>` class, not direct model references
2. **Property binding**: Array properties must match `arrayMap()` bindings (use `.bind()` to override)
3. **Case conversion**: Set `convert: false` if API uses camelCase
4. **Testing**: Always run inside Docker container, not on host machine
5. **Unused imports**: Must be removed before committing
