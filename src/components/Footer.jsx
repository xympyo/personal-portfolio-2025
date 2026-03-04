export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted">
        <span>&copy; {new Date().getFullYear()} Moshe Dayan</span>
        <div className="flex gap-6">
          <a
            href="mailto:moshe4122004@gmail.com"
            className="hover:text-text transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/moshedayan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/xympyo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
