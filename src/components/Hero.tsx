import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="relative h-[75vh] sm:h-[85vh] lg:h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/src/assets/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Building Digital Products <br className="hidden md:block" />
            That Power{" "}
            <span className="text-green-500">Growth</span>
        </h1>


        <p className="mt-6 max-w-2xl text-white/80 md:text-lg">
          We help startups and businesses design, build, and scale reliable
          software solutions with world-class engineering talent.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link
                to="/hire-talent"
                className="rounded-full bg-white text-black px-6 py-3 text-sm font-medium text-center hover:bg-white/90 transition"
            >
                Start Your Project
            </Link>

            <Link
                to="/hire-talent"
                className="rounded-full border border-white/40 text-white px-6 py-3 text-sm font-medium text-center hover:bg-white/10 transition"
            >
                Hire Talent
            </Link>
            </div>

        </div>
    </section>
  )
}

export default Hero
