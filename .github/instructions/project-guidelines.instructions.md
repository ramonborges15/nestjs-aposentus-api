---
description: "Use when creating, updating, or reviewing NestJS modules in services/src/modules with package-by-feature structure, folder organization, and business-rule boundaries."
applyTo: "services/src/modules/**/*.ts"
---

# Package by Feature (Modules)

Use package-by-feature inside `modules`.

- Group code by feature under `services/src/modules/<feature>`.
- Keep feature files together instead of separating by technical layer at root level.

## Feature Structure

Inside each feature, folders may include:

- `dtos`
- `entities`
- `controllers`
- `services`
- `view-models`

Create only the folders needed by the feature, keeping naming consistent with existing modules.

## Business Rules Boundary

Business rules must live only inside `services`.

- `controllers` should orchestrate request/response flow and delegate to services.
- `dtos` and `view-models` should define contracts and presentation mapping only.
- `entities` should represent persistence/domain data structures, not orchestrate use cases.

When generating or reviewing code, move business logic out of controllers/DTOs/entities/view-models and into service classes.