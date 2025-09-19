# Contributing to Haru

Thank you for your interest in contributing to Haru! We appreciate your help in making this gentle accountability app better for everyone.

## 🌸 Code of Conduct

Haru is built on principles of **gentle accountability** and **peaceful growth**. Please maintain this spirit in all interactions:

- Be respectful and kind
- Focus on constructive feedback
- Help others grow and learn
- Maintain the calm, zen-like atmosphere

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:

- Node.js 18+ installed
- Git installed
- A GitHub account
- Basic knowledge of React, TypeScript, and Next.js

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/Mehulparekh144/haru.git
   cd haru
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Mehulparekh144/haru.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables.

5. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Start the development server**
   ```bash
   yarn dev
   ```

## 🎯 How to Contribute

### Reporting Issues

When reporting issues, please include:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)

### Suggesting Features

We welcome feature suggestions that align with Haru's philosophy:

- **Gentle accountability** over harsh enforcement
- **Peaceful progress** over gamification
- **Proof-based validation** over self-reporting
- **Minimal design** over feature bloat

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Add tests if applicable
   - Update documentation if needed

3. **Test your changes**
   ```bash
   yarn lint
   yarn build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add gentle reminder system"
   # or
   git commit -m "fix: resolve AI validation edge case"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Link any related issues

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **React**: Use functional components with hooks
- **Next.js**: Follow App Router patterns
- **Tailwind**: Use utility classes, maintain consistency
- **Naming**: Use descriptive, peaceful variable names

### File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (protected)/       # Protected dashboard routes
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility functions
├── server/               # Server-side code
└── styles/               # Global styles
```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

Examples:
- `feat(ai): add gentle validation system`
- `fix(ui): resolve morphing text alignment`
- `docs: update contributing guidelines`

### Pull Request Guidelines

1. **Clear title** describing the change
2. **Detailed description** of what was changed and why
3. **Screenshots** for UI changes
4. **Testing instructions** for reviewers
5. **Link to related issues** if applicable

### Review Process

1. **Automated checks** must pass (linting, type checking, build)
2. **Code review** by maintainers
3. **Testing** in development environment
4. **Approval** from at least one maintainer

## 🎨 Design Principles

When contributing to Haru, please maintain these design principles:

### Visual Design
- **Calm colors**: Use the established color palette
- **Gentle animations**: Subtle, peaceful transitions
- **Minimal interface**: No clutter, focus on essentials
- **Accessibility**: Ensure all users can use the app

### User Experience
- **Peaceful flow**: Smooth, non-jarring interactions
- **Clear feedback**: Gentle, helpful messaging
- **No pressure**: Avoid aggressive or demanding language
- **Growth mindset**: Encourage progress, not perfection

### Typography
- **Serif fonts**: For emotional, descriptive content
- **Monospace fonts**: For technical, process-oriented content
- **Readable sizes**: Ensure accessibility across devices

## 🐛 Bug Reports

When reporting bugs, please use this template:

```markdown
## Bug Description
Brief description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari, Firefox]
- Node.js version: [e.g. 18.17.0]

## Additional Context
Any other context about the problem.
```

## 💡 Feature Requests

When suggesting features, please consider:

- **Alignment with Haru's philosophy**: Does it support gentle accountability?
- **User need**: Does it solve a real problem?
- **Simplicity**: Does it add complexity or reduce it?
- **Peaceful design**: Does it maintain the calm aesthetic?

## 🎉 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page
- **Community highlights** in discussions

## 📞 Getting Help

If you need help:

1. **Check existing issues** and discussions
2. **Read the documentation** thoroughly
3. **Ask in discussions** for general questions
4. **Create an issue** for bugs or feature requests
5. **Join our community** (if available)

## 🙏 Thank You

Thank you for contributing to Haru! Your efforts help create a more peaceful, accountable world, one habit at a time.

---

**Remember**: Haru is about gentle growth and peaceful progress. Let's build something beautiful together. 🌸
