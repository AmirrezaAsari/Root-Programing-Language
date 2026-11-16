import { test } from "node:test";
import assert from "node:assert/strict";

import { Lexer } from "../src/lexer/lexer";
import { TokenType } from "../src/lexer/token-type";
import { LexerError } from "../src/lexer/token";

test("should tokenize a simple ROOT program", () => {
  const source = `
fn main() -> i32 {
    let mut x: i32 = 10;
    x = x + 5;
    return 0;
}
`;

  const tokens = new Lexer(source).tokenize();

  const types = tokens.map(token => token.type);

  assert.deepEqual(types, [
    TokenType.FN,
    TokenType.IDENTIFIER,
    TokenType.LEFT_PAREN,
    TokenType.RIGHT_PAREN,
    TokenType.ARROW,
    TokenType.I32,
    TokenType.LEFT_BRACE,

    TokenType.LET,
    TokenType.MUT,
    TokenType.IDENTIFIER,
    TokenType.COLON,
    TokenType.I32,
    TokenType.EQUAL,
    TokenType.INTEGER_LITERAL,
    TokenType.SEMICOLON,

    TokenType.IDENTIFIER,
    TokenType.EQUAL,
    TokenType.IDENTIFIER,
    TokenType.PLUS,
    TokenType.INTEGER_LITERAL,
    TokenType.SEMICOLON,

    TokenType.RETURN,
    TokenType.INTEGER_LITERAL,
    TokenType.SEMICOLON,

    TokenType.RIGHT_BRACE,
    TokenType.EOF,
  ]);
});

test("should ignore comments", () => {
  const source = `
    // Single-line comment
    let x = 10;

    /* Multi-line
       comment */
    let y = 20;
  `;

  const tokens = new Lexer(source).tokenize();

  assert.equal(
    tokens.filter(t => t.type === TokenType.LET).length,
    2,
  );

  assert.equal(
    tokens.some(t => t.lexeme.includes("comment")),
    false,
  );
});

test("should tokenize operators correctly", () => {
  const source = "a == b && c >= d";

  const types = new Lexer(source)
    .tokenize()
    .map(token => token.type);

  assert.deepEqual(types, [
    TokenType.IDENTIFIER,
    TokenType.EQUAL_EQUAL,
    TokenType.IDENTIFIER,
    TokenType.AND_AND,
    TokenType.IDENTIFIER,
    TokenType.GREATER_EQUAL,
    TokenType.IDENTIFIER,
    TokenType.EOF,
  ]);
});

test("should tokenize strings and characters", () => {
  const source = `"Hello ROOT" 'A'`;

  const types = new Lexer(source)
    .tokenize()
    .map(token => token.type);

  assert.deepEqual(types, [
    TokenType.STRING_LITERAL,
    TokenType.CHAR_LITERAL,
    TokenType.EOF,
  ]);
});

test("should throw on unterminated strings", () => {
  assert.throws(
    () => new Lexer('"Hello ROOT').tokenize(),
    LexerError,
  );
});

test("should throw on invalid characters", () => {
  assert.throws(
    () => new Lexer("@").tokenize(),
    LexerError,
  );
});
