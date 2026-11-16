# ROOT — Language Specification v0.1

**Status:** Initial Language Specification  
**Language:** ROOT  
**Implementation Language:** TypeScript  
**Initial Target:** Custom Bytecode / Virtual Machine  
**Long-term Target:** Native Compilation and Freestanding Execution

---

## 1. Language Overview

ROOT is an experimental, general-purpose, statically typed programming language designed with simplicity, explicit semantics, and eventual low-level programming capabilities in mind.

Its initial design combines readable syntax with explicit control over types, mutability, and program structure.

### Core design principles

- Simple and readable syntax
- Static and strong typing
- Explicit mutability
- Predictable variable scoping
- Explicit type conversion
- Minimal runtime dependency where possible
- Future support for low-level and freestanding programming

### Language characteristics

| Feature | Decision |
|---|---|
| Programming Paradigm | Imperative / Procedural |
| Typing | Static and Strong |
| Type Inference | Supported |
| Mutability | Explicit |
| Scoping | Lexical |
| Type Conversion | Explicit |
| String Memory Model | Managed |
| Error Handling | Error Codes |
| Modules | Supported |
| Arrays | Fixed-size |
| Enums | Deferred |
| Visibility | Private by default |
| Comments | Single-line and multi-line |
| Initial Backend | Custom Bytecode |
| Runtime | Custom VM |

## 2. Execution Environments

ROOT is designed to support two execution environments.

### Hosted

Programs execute with access to runtime facilities and operating-system services.

Examples include:
- Standard input/output
- Managed strings
- Runtime memory management
- Standard library functions

### Freestanding

Programs execute without depending on a host operating system or a general-purpose runtime.

This environment is intended to support:
- Kernel development
- Bare-metal programming
- Direct memory access
- Low-level hardware interaction

Managed strings and other runtime-dependent features may be restricted or unavailable in Freestanding mode.

## 3. Variables and Mutability

Variables are declared using `let`.

Explicit type annotations and type inference are both supported.

```rust
let x: i32 = 10;
let y = 20;
```

Variables are immutable by default.

Mutable variables must use `let mut`.

```rust
let mut counter: i32 = 0;

counter = counter + 1;
```

Reassignment of immutable variables is a semantic error.

Every variable declaration must have an initializer in v0.1.

## 4. Primitive Data Types

### Integer types

| Type | Width | Signedness |
|---|---:|---|
| `i8` | 8 bits | Signed |
| `i16` | 16 bits | Signed |
| `i32` | 32 bits | Signed |
| `i64` | 64 bits | Signed |
| `u8` | 8 bits | Unsigned |
| `u16` | 16 bits | Unsigned |
| `u32` | 32 bits | Unsigned |
| `u64` | 64 bits | Unsigned |

### Floating-point types

| Type | Width |
|---|---:|
| `f32` | 32 bits |
| `f64` | 64 bits |

### Other primitive types

- `bool`
- `char`
- `string`
- `void`

`void` represents the absence of a return value and is only valid as a function return type in v0.1.

The precise memory representation of `char` and `string` is an implementation detail to be specified before the native backend.

## 5. Composite Types

### Struct

Structs group related fields.

```rust
struct Point {
    x: i32,
    y: i32
}
```

Struct initialization:

```rust
let point: Point = Point {
    x: 10,
    y: 20
};
```

### Fixed-size Arrays

ROOT v0.1 supports fixed-size arrays only.

Array types use the following notation:

```rust
[i32; 10]
```

Example:

```rust
let numbers: [i32; 3] = [10, 20, 30];
```

Array indexing starts at zero:

```rust
let first = numbers[0];
```

Array size is part of its type. Dynamic arrays are deferred.

### Enums

Enums are not included in v0.1. They may be introduced in a future version.

## 6. Functions

Functions are declared using `fn`.

```rust
fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
```

Functions without a return value use `void`.

```rust
fn greet() -> void {
    print("Hello ROOT");
}
```

Rules:

- Parameter types must be explicit.
- Return types must be explicit.
- Function overloading is not supported in v0.1.
- Recursion is supported.
- Nested function declarations are not supported.
- Functions are private by default.

### Public functions

The `pub` keyword makes a function accessible outside its module.

```rust
pub fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
```

## 7. Control Flow

### Conditional statements

```rust
if age >= 18 {
    print("Adult");
} else {
    print("Minor");
}
```

`else if` is also supported.

### While loops

```rust
let mut i: i32 = 0;

while i < 10 {
    print(i);
    i = i + 1;
}
```

### Return

```rust
return 0;
```

`return;` is used in functions returning `void`.

`for`, `match`, `break`, and `continue` are deferred.

## 8. Operators

| Category | Operators |
|---|---|
| Arithmetic | `+`, `-`, `*`, `/`, `%` |
| Comparison | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| Logical | `&&`, `||`, `!` |
| Assignment | `=`, `+=`, `-=`, `*=`, `/=` |
| Bitwise | `&`, `\|`, `^`, `~`, `<<`, `>>` |

### Type conversion

Type conversion is explicit.

```rust
let x: i32 = 10;
let y: i64 = x as i64;
```

Implicit numeric conversions are not supported.

The compiler must validate whether a requested conversion is legal.

## 9. Modules and Visibility

Modules are supported from v0.1.

Imports use the `import` keyword.

```rust
import math;
```

Example:

```rust
import math;

fn main() -> i32 {
    let result = math.sqrt(25.0);
    return 0;
}
```

Declarations are private by default.

The `pub` keyword explicitly exports functions and structs.

```rust
pub struct Point {
    x: i32,
    y: i32
}
```

Module resolution rules and the physical source-file layout will be defined during compiler implementation.

## 10. Scope Rules

ROOT uses lexical scoping.

A variable is accessible only within the block in which it is declared and its nested blocks.

```rust
fn main() -> i32 {
    let x = 10;

    if x > 5 {
        let y = 20;
        print(y);
    }

    print(x);
    // print(y); // Semantic error

    return 0;
}
```

## 11. Error Handling

The initial error-handling model uses error codes.

Exceptions and `try/catch` are not supported in v0.1.

A future version may introduce a `Result<T, E>` type.

Compile-time errors and runtime errors must be distinguished.

Examples of compile-time errors:
- Undefined variables
- Type mismatches
- Invalid assignments
- Invalid function calls
- Visibility violations

Examples of runtime errors:
- Division by zero
- Invalid array indexing
- Other invalid runtime operations

## 12. Comments

Both comment styles are supported.

Single-line comments:

```rust
// This is a ROOT comment
let x = 10;
```

Multi-line comments:

```rust
/*
    This is a
    multi-line comment.
*/
let y = 20;
```

Comments are ignored by the parser after lexical analysis.

---

# 13. ROOT Grammar — EBNF

The following grammar defines the initial syntax of ROOT v0.1.

The grammar is organized to express operator precedence and avoid ambiguous expression parsing.

```ebnf
program =
    { import_declaration },
    { top_level_declaration } ;

import_declaration =
    "import", identifier, ";" ;

top_level_declaration =
    [ "pub" ],
    ( function_declaration | struct_declaration ) ;

function_declaration =
    "fn", identifier,
    "(", [ parameter_list ], ")",
    "->", type,
    block ;

parameter_list =
    parameter, { ",", parameter } ;

parameter =
    identifier, ":", type ;

struct_declaration =
    "struct", identifier, "{",
    { field_declaration },
    "}" ;

field_declaration =
    identifier, ":", type, [ "," ] ;

type =
    primitive_type
    | identifier
    | "[", type, ";", integer_literal, "]" ;

primitive_type =
    "i8" | "i16" | "i32" | "i64"
    | "u8" | "u16" | "u32" | "u64"
    | "f32" | "f64"
    | "bool" | "char" | "string" | "void" ;

block =
    "{", { statement }, "}" ;

statement =
    variable_declaration
    | assignment_statement
    | return_statement
    | if_statement
    | while_statement
    | expression_statement
    | block ;

variable_declaration =
    "let", [ "mut" ],
    identifier, [ ":", type ],
    "=", expression, ";" ;

assignment_statement =
    assignment_target,
    assignment_operator,
    expression, ";" ;

assignment_target =
    identifier,
    { member_access | index_access } ;

assignment_operator =
    "=" | "+=" | "-=" | "*=" | "/=" ;

return_statement =
    "return", [ expression ], ";" ;

if_statement =
    "if", expression, block,
    [ "else", ( block | if_statement ) ] ;

while_statement =
    "while", expression, block ;

expression_statement =
    expression, ";" ;

expression =
    logical_or_expression ;

logical_or_expression =
    logical_and_expression,
    { "||", logical_and_expression } ;

logical_and_expression =
    bitwise_or_expression,
    { "&&", bitwise_or_expression } ;

bitwise_or_expression =
    bitwise_xor_expression,
    { "|", bitwise_xor_expression } ;

bitwise_xor_expression =
    bitwise_and_expression,
    { "^", bitwise_and_expression } ;

bitwise_and_expression =
    equality_expression,
    { "&", equality_expression } ;

equality_expression =
    relational_expression,
    { ("==" | "!="), relational_expression } ;

relational_expression =
    shift_expression,
    { ("<" | ">" | "<=" | ">="), shift_expression } ;

shift_expression =
    additive_expression,
    { ("<<" | ">>"), additive_expression } ;

additive_expression =
    multiplicative_expression,
    { ("+" | "-"), multiplicative_expression } ;

multiplicative_expression =
    cast_expression,
    { ("*" | "/" | "%"), cast_expression } ;

cast_expression =
    unary_expression,
    { "as", type } ;

unary_expression =
    unary_operator, unary_expression
    | postfix_expression ;

unary_operator =
    "!" | "-" | "+" | "~" | "&" ;

postfix_expression =
    primary_expression,
    { function_call | member_access | index_access } ;

function_call =
    "(", [ argument_list ], ")" ;

argument_list =
    expression, { ",", expression } ;

member_access =
    ".", identifier ;

index_access =
    "[", expression, "]" ;

primary_expression =
    integer_literal
    | float_literal
    | string_literal
    | character_literal
    | boolean_literal
    | identifier
    | array_literal
    | struct_literal
    | "(", expression, ")" ;

array_literal =
    "[", [ argument_list ], "]" ;

struct_literal =
    identifier, "{",
    [ struct_field_initializer,
      { ",", struct_field_initializer } ],
    "}" ;

struct_field_initializer =
    identifier, ":", expression ;

integer_literal =
    digit, { digit } ;

float_literal =
    digit, { digit }, ".", digit, { digit } ;

string_literal =
    '"', { string_character }, '"' ;

character_literal =
    "'", character, "'" ;

boolean_literal =
    "true" | "false" ;

identifier =
    letter, { letter | digit | "_" } ;

letter =
    "a"…"z" | "A"…"Z" | "_" ;

digit =
    "0"…"9" ;
```

### Lexical conventions

The Lexer is responsible for recognizing:

- Keywords
- Identifiers
- Integer and floating-point literals
- String and character literals
- Operators and punctuation
- Single-line comments
- Multi-line comments
- Whitespace

Comments and whitespace are discarded unless needed for source-location information.

### Grammar and semantic validation

EBNF defines valid syntactic structures, but some rules require semantic analysis.

Examples:

- A variable must be declared before use.
- An immutable variable cannot be reassigned.
- An assignment target must be writable.
- A function call must match its declared parameter types.
- A function must return a value compatible with its return type.
- Array indexing must use an integer-compatible index.
- Array initializers must match the declared array size.
- Struct initializers must provide valid fields.
- `void` cannot be used as a variable type.
- Only public declarations can be accessed from outside their module.

---

# 14. Initial Compiler Architecture

ROOT's compiler will use a modular architecture.

```text
ROOT Source Code
       |
       v
     Lexer
       |
       v
    Tokens
       |
       v
     Parser
       |
       v
      AST
       |
       v
 Semantic Analyzer
       |
       v
    ROOT IR
       |
       v
  Bytecode Generator
       |
       v
   ROOT Bytecode
       |
       v
     ROOT VM
```

### Planned components

| Component | Responsibility |
|---|---|
| Lexer | Convert source code into tokens |
| Parser | Build an AST from tokens |
| AST | Represent program structure |
| Semantic Analyzer | Validate names, types, scopes and declarations |
| ROOT IR | Intermediate representation |
| Bytecode Generator | Generate executable bytecode |
| VM | Execute ROOT bytecode |

Future backends may include:

- C Backend
- LLVM IR Backend
- Native x86-64 Backend
- Assembly Backend

The frontend and intermediate representation should remain independent of the target backend.

---

# 15. Features Deferred Beyond v0.1

The following features are intentionally excluded from the first language version:

- Enums
- Dynamic arrays
- `for` loops
- `match`
- `break` and `continue`
- Exception handling
- Function overloading
- Nested functions
- Pointer types
- Direct memory manipulation
- Generic types
- Traits or interfaces
- Concurrency primitives

These features may be introduced after the initial compiler and VM become functional.

---

# 16. v0.1 Completion Criteria

ROOT v0.1 will be considered sufficiently specified for initial implementation when:

1. The syntax of supported constructs is defined.
2. The Lexer can recognize every token.
3. The Parser can construct AST nodes for supported declarations and expressions.
4. Operator precedence and associativity are implemented.
5. Semantic rules are documented.
6. The initial type system is defined.
7. The bytecode execution model is documented.

**End of ROOT Language Specification v0.1**