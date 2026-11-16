import { TokenType } from "./token-type";
import { Token, LexerError } from "./token";

const KEYWORDS: Record<string, TokenType> = {
  fn: TokenType.FN,
  let: TokenType.LET,
  mut: TokenType.MUT,
  return: TokenType.RETURN,
  if: TokenType.IF,
  else: TokenType.ELSE,
  while: TokenType.WHILE,
  struct: TokenType.STRUCT,
  import: TokenType.IMPORT,
  pub: TokenType.PUB,
  as: TokenType.AS,
  true: TokenType.TRUE,
  false: TokenType.FALSE,

  i8: TokenType.I8,
  i16: TokenType.I16,
  i32: TokenType.I32,
  i64: TokenType.I64,

  u8: TokenType.U8,
  u16: TokenType.U16,
  u32: TokenType.U32,
  u64: TokenType.U64,

  f32: TokenType.F32,
  f64: TokenType.F64,

  bool: TokenType.BOOL,
  char: TokenType.CHAR,
  string: TokenType.STRING,
  void: TokenType.VOID,
};

export class Lexer {
  private source: string;
  private tokens: Token[] = [];

  private start = 0;
  private current = 0;

  private line = 1;
  private column = 1;

  private tokenLine = 1;
  private tokenColumn = 1;

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.tokenLine = this.line;
      this.tokenColumn = this.column;

      this.scanToken();
    }

    this.tokens.push({
      type: TokenType.EOF,
      lexeme: "",
      line: this.line,
      column: this.column,
      offset: this.current,
    });

    return this.tokens;
  }

  private scanToken(): void {
    const char = this.advance();

    switch (char) {
      // Whitespace
      case " ":
      case "\r":
      case "\t":
        return;

      case "\n":
        return;

      // Single-character tokens
      case "(":
        this.addToken(TokenType.LEFT_PAREN);
        return;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN);
        return;
      case "{":
        this.addToken(TokenType.LEFT_BRACE);
        return;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE);
        return;
      case "[":
        this.addToken(TokenType.LEFT_BRACKET);
        return;
      case "]":
        this.addToken(TokenType.RIGHT_BRACKET);
        return;
      case ":":
        this.addToken(TokenType.COLON);
        return;
      case ";":
        this.addToken(TokenType.SEMICOLON);
        return;
      case ",":
        this.addToken(TokenType.COMMA);
        return;
      case ".":
        this.addToken(TokenType.DOT);
        return;
      case "~":
        this.addToken(TokenType.TILDE);
        return;
      case "^":
        this.addToken(TokenType.CARET);
        return;

      // One or two character tokens
      case "+":
        this.addToken(this.match("=") ? TokenType.PLUS_EQUAL : TokenType.PLUS);
        return;

      case "-":
        if (this.match(">")) {
          this.addToken(TokenType.ARROW);
        } else if (this.match("=")) {
          this.addToken(TokenType.MINUS_EQUAL);
        } else {
          this.addToken(TokenType.MINUS);
        }
        return;

      case "*":
        this.addToken(this.match("=") ? TokenType.STAR_EQUAL : TokenType.STAR);
        return;

      case "/":
        if (this.match("/")) {
          this.lineComment();
        } else if (this.match("*")) {
          this.blockComment();
        } else {
          this.addToken(
            this.match("=") ? TokenType.SLASH_EQUAL : TokenType.SLASH,
          );
        }
        return;

      case "%":
        this.addToken(TokenType.PERCENT);
        return;

      case "=":
        this.addToken(
          this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL,
        );
        return;

      case "!":
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
        return;

      case "<":
        if (this.match("<")) {
          this.addToken(TokenType.SHIFT_LEFT);
        } else {
          this.addToken(
            this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS,
          );
        }
        return;

      case ">":
        if (this.match(">")) {
          this.addToken(TokenType.SHIFT_RIGHT);
        } else {
          this.addToken(
            this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER,
          );
        }
        return;

      case "&":
        this.addToken(
          this.match("&") ? TokenType.AND_AND : TokenType.AMPERSAND,
        );
        return;

      case "|":
        this.addToken(this.match("|") ? TokenType.OR_OR : TokenType.PIPE);
        return;

      case '"':
        this.stringLiteral();
        return;

      case "'":
        this.charLiteral();
        return;

      default:
        if (this.isDigit(char)) {
          this.number();
        } else if (this.isAlpha(char)) {
          this.identifier();
        } else {
          this.error(`Unexpected character '${char}'`);
        }
    }
  }

  private identifier(): void {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const text = this.source.slice(this.start, this.current);

    const type = KEYWORDS[text] ?? TokenType.IDENTIFIER;

    this.addToken(type);
  }

  private addToken(type: TokenType): void {
    this.tokens.push({
      type,
      lexeme: this.source.slice(this.start, this.current),
      line: this.tokenLine,
      column: this.tokenColumn,
      offset: this.start,
    });
  }

  private match(expected: string): boolean {
    if (this.isAtEnd()) return false;
    if (this.peek() !== expected) return false;

    this.advance();
    return true;
  }

  private advance(): string {
    const char = this.source[this.current++];

    if (char === "\n") {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }

    return char;
  }

  private number(): void {
    while (this.isDigit(this.peek())) {
      this.advance();
    }

    let type = TokenType.INTEGER_LITERAL;

    if (this.peek() === "." && this.isDigit(this.peekNext())) {
      this.advance();

      while (this.isDigit(this.peek())) {
        this.advance();
      }

      type = TokenType.FLOAT_LITERAL;
    }

    this.addToken(type);
  }

  private stringLiteral(): void {
    while (!this.isAtEnd() && this.peek() !== '"') {
      if (this.peek() === "\n") {
        this.error("Unterminated string literal");
      }

      if (this.peek() === "\\") {
        this.advance();

        if (this.isAtEnd()) {
          this.error("Unterminated string escape");
        }
      }

      this.advance();
    }

    if (this.isAtEnd()) {
      this.error("Unterminated string literal");
    }

    this.advance(); // Closing quote

    this.addToken(TokenType.STRING_LITERAL);
  }

  private charLiteral(): void {
    if (this.isAtEnd() || this.peek() === "\n") {
      this.error("Unterminated character literal");
    }

    if (this.peek() === "\\") {
      this.advance();

      if (this.isAtEnd()) {
        this.error("Unterminated character escape");
      }

      this.advance();
    } else {
      this.advance();
    }

    if (this.peek() !== "'") {
      this.error("Character literal must contain one character");
    }

    this.advance(); // Closing quote

    this.addToken(TokenType.CHAR_LITERAL);
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  private peek(): string {
    if (this.isAtEnd()) return "\0";
    return this.source[this.current];
  }

  private peekNext(): string {
    if (this.current + 1 >= this.source.length) {
      return "\0";
    }

    return this.source[this.current + 1];
  }

  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }
  private isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  private isAlpha(char: string): boolean {
    return (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      char === "_"
    );
  }

  private lineComment(): void {
    while (!this.isAtEnd() && this.peek() !== "\n") {
      this.advance();
    }
  }

  private blockComment(): void {
    while (!this.isAtEnd()) {
      if (this.peek() === "*" && this.peekNext() === "/") {
        this.advance();
        this.advance();
        return;
      }

      this.advance();
    }

    this.error("Unterminated block comment");
  }

  private error(message: string): never {
    throw new LexerError(message, this.tokenLine, this.tokenColumn, this.start);
  }
}
