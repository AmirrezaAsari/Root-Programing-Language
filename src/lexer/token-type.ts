
export enum TokenType {
  // Special
  EOF = "EOF",

  // Identifiers and literals
  IDENTIFIER = "IDENTIFIER",
  INTEGER_LITERAL = "INTEGER_LITERAL",
  FLOAT_LITERAL = "FLOAT_LITERAL",
  STRING_LITERAL = "STRING_LITERAL",
  CHAR_LITERAL = "CHAR_LITERAL",

  // Keywords
  FN = "FN",
  LET = "LET",
  MUT = "MUT",
  RETURN = "RETURN",
  IF = "IF",
  ELSE = "ELSE",
  WHILE = "WHILE",
  STRUCT = "STRUCT",
  IMPORT = "IMPORT",
  PUB = "PUB",
  AS = "AS",
  TRUE = "TRUE",
  FALSE = "FALSE",

  // Primitive types
  I8 = "I8",
  I16 = "I16",
  I32 = "I32",
  I64 = "I64",
  U8 = "U8",
  U16 = "U16",
  U32 = "U32",
  U64 = "U64",
  F32 = "F32",
  F64 = "F64",
  BOOL = "BOOL",
  CHAR = "CHAR",
  STRING = "STRING",
  VOID = "VOID",

  // Arithmetic operators
  PLUS = "PLUS",
  MINUS = "MINUS",
  STAR = "STAR",
  SLASH = "SLASH",
  PERCENT = "PERCENT",

  // Assignment operators
  EQUAL = "EQUAL",
  PLUS_EQUAL = "PLUS_EQUAL",
  MINUS_EQUAL = "MINUS_EQUAL",
  STAR_EQUAL = "STAR_EQUAL",
  SLASH_EQUAL = "SLASH_EQUAL",

  // Comparison operators
  EQUAL_EQUAL = "EQUAL_EQUAL",
  BANG_EQUAL = "BANG_EQUAL",
  LESS = "LESS",
  GREATER = "GREATER",
  LESS_EQUAL = "LESS_EQUAL",
  GREATER_EQUAL = "GREATER_EQUAL",

  // Logical operators
  AND_AND = "AND_AND",
  OR_OR = "OR_OR",
  BANG = "BANG",

  // Bitwise operators
  AMPERSAND = "AMPERSAND",
  PIPE = "PIPE",
  CARET = "CARET",
  TILDE = "TILDE",
  SHIFT_LEFT = "SHIFT_LEFT",
  SHIFT_RIGHT = "SHIFT_RIGHT",

  // Other operators
  ARROW = "ARROW",

  // Punctuation
  LEFT_PAREN = "LEFT_PAREN",
  RIGHT_PAREN = "RIGHT_PAREN",
  LEFT_BRACE = "LEFT_BRACE",
  RIGHT_BRACE = "RIGHT_BRACE",
  LEFT_BRACKET = "LEFT_BRACKET",
  RIGHT_BRACKET = "RIGHT_BRACKET",
  COLON = "COLON",
  SEMICOLON = "SEMICOLON",
  COMMA = "COMMA",
  DOT = "DOT",
}
