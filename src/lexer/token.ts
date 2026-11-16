import { TokenType } from "./token-type";

export interface Token {
  type: TokenType;
  lexeme: string;
  line: number;
  column: number;
  offset: number;
}

export class LexerError extends Error {
  constructor(
    message: string,
    public readonly line: number,
    public readonly column: number,
    public readonly offset: number,
  ) {
    super(`[${line}:${column}] ${message}`);
    this.name = "LexerError";
  }
}
