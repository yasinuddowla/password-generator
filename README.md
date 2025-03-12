# Secure Password Generator

A browser extension that generates strong, customizable passwords with a simple, user-friendly interface.

## Features

-   Generate secure passwords with configurable options
-   Customize password length (8-128 characters)
-   Include/exclude character types (lowercase, uppercase, numbers, special characters)
-   Option to exclude similar characters (like I, l, 1, O, 0) for better readability
-   Password strength meter
-   One-click copy to clipboard
-   Settings are saved between uses
-   Cryptographically secure random number generation
-   Completely offline operation - your passwords never leave your device

## Installation

### From Chrome Web Store

1. Visit [Secure Password Generator on Chrome Web Store](#) (link to be added)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" at the top-right
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension icon should appear in your browser toolbar

## Usage

1. Click the extension icon in your browser toolbar
2. Adjust settings as needed:
    - Set desired password length
    - Select character types to include
    - Enable/disable "exclude similar characters" option
3. A password will be automatically generated based on your settings
4. Click the copy button to copy the password to clipboard
5. Use the generated password where needed

## Security

-   Passwords are generated using the browser's `window.crypto.getRandomValues()` API for cryptographically secure random number generation
-   The extension works entirely offline - no data is sent to any server
-   Generated passwords are not stored anywhere except temporarily in memory
-   Only your preferences are saved (using Chrome's storage API)

## Development

### Prerequisites

-   Basic knowledge of HTML, CSS, and JavaScript
-   Chrome browser for testing

### Modifying the Code

-   Edit `popup.html` to change the UI structure
-   Edit `popup.css` to modify styling
-   Edit `popup.js` to change functionality

### Building and Testing

1. Make your changes to the code
2. Test locally using the "Load unpacked" method described in the installation section
3. Reload the extension after making changes (click the refresh icon on the extensions page)

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
