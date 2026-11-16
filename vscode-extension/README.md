# ROOT Language Support

**Syntax highlighting support for the ROOT programming language in Visual Studio Code.**

ROOT is an experimental, statically typed programming language designed with a long-term focus on systems programming and compiler development.

This extension provides basic language support for `.root` files.

## Features

- Syntax highlighting for ROOT source files
- Keyword highlighting
- Primitive type highlighting
- String and character literal highlighting
- Numeric literal highlighting
- Line and block comment highlighting
- Operator highlighting
- Automatic bracket matching
- Automatic indentation support

## Supported File Extensions

```text
.root
```

## Installation

### From VSIX

1. Download the latest `.vsix` package.
2. Open Visual Studio Code.
3. Open the Extensions panel (`Ctrl + Shift + X`).
4. Select the three-dot menu.
5. Choose **Install from VSIX...**
6. Select the downloaded file.

## Example

```rust
fn main() -> i32 {
    let mut age: i32 = 25;
    let name: string = "ROOT";

    if age >= 18 {
        age = age + 1;
    }

    return 0;
}
```

## Project Status

ROOT Language Support is currently in its early development stage.

Version `0.1.0` focuses on syntax highlighting and basic editor configuration. Compiler integration, diagnostics, autocomplete, and language server support are not included yet.

## Roadmap

- [x] Basic syntax highlighting
- [x] Language configuration
- [ ] Improved syntax highlighting
- [ ] Code snippets
- [ ] Language Server Protocol (LSP)
- [ ] Compiler integration
- [ ] Diagnostics and error reporting
- [ ] Autocomplete and IntelliSense

## Contributing

Contributions, bug reports, and suggestions are welcome.

Please open an issue or submit a pull request.

## License

This extension is licensed under the MIT License. See [LICENSE](LICENSE) for details.