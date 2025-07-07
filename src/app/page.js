export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 sm:p-12 lg:p-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-bc-light-text dark:text-bc-dark-text">
          Broadband Connect
        </h1>
        <h2 className="text-2xl md:text-3xl mb-8 text-bc-primary font-playfair">
          Coming Soon
        </h2>
        <p className="text-lg md:text-xl mb-8 text-bc-light-text/80 dark:text-bc-dark-text/80 font-inter">
          Professional telecommunications training that builds careers
        </p>
        
        {/* Color palette preview */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-bc-primary h-16 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            Primary
          </div>
          <div className="bg-bc-secondary h-16 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            Secondary
          </div>
          <div className="bg-bc-accent-deep-blue h-16 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            Deep Blue
          </div>
          <div className="bg-bc-accent-royal-blue h-16 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            Royal Blue
          </div>
        </div>
        
        <p className="mt-8 text-sm text-bc-light-text/60 dark:text-bc-dark-text/60">
          Toggle the theme using the navigation bar
        </p>
      </div>
    </div>
  )
}