import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-bc-primary mb-4 font-playfair">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-bc-light-text dark:text-bc-dark-text">
          Page Not Found
        </h2>
        <p className="text-lg mb-8 text-bc-light-text/80 dark:text-bc-dark-text/80">
          The page you&rsquo;re looking for doesn&rsquo;t exist yet.
        </p>
        <Link
          href="/"
          className="bg-bc-primary hover:bg-bc-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}