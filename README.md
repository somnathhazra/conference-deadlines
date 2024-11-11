# Conference Deadlines Calendar

A dynamic, interactive calendar displaying submission deadlines for major conferences. The calendar shows a 12-month view starting from two months before the current date, with clear visual indicators for submission deadlines. [Webpage](https://somnathhazra.github.io/conference-deadlines/)

## Features

- 📅 12-month rolling calendar view
- 🎯 Highlighted conference submission deadlines
- 🔍 Multiple deadlines per date support
- 💫 Current date highlighting
- 🔗 Direct links to conference websites
- 📱 Responsive design
- 🎨 Clean, intuitive interface


### Adding/Updating Conference Deadlines

Conference data is stored in the `deadlines` state array in `conferences.js`. Conferences are stored in the following format:

```javascript
{
  conference: "Conference Name",
  date: "YYYY-MM-DD",
  link: "https://conference-website.com"
}
```

Please use [this form](https://forms.gle/vT3YXBpXLiiyV6vT9) to add a new entry. That you for your contribution!!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## CONTRIBUTING TO THE PROJECT

Thank you for your interest in contributing to the Conference Deadlines Calendar! This document provides guidelines and instructions for contributing.

## Ways to Contribute

1. Adding/Updating Conference Information
2. Improving the UI/UX
3. Bug fixes
4. Documentation improvements
5. Feature additions

## Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests (when applicable)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Pull Request Process

1. Ensure your PR description clearly describes the changes
2. Link any related issues
3. Update documentation as needed
4. Wait for review from maintainers
5. Address any requested changes
6. Once approved, maintainers will merge your PR

Thank you for contributing to make this calendar a valuable resource for the research community!
