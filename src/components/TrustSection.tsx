import trustImage from "../assets/images/trust-image.png"

const TrustSection = () => {
  return (
    <section className="w-full mt-12 md:mt-20 px-6 md:px-10 lg:px-[100px]">
        <div
          className="
            flex flex-col md:flex-row
            items-start md:items-center
            gap-4 md:gap-6
            rounded-2xl
            bg-gray-400/10
            backdrop-blur-md
            border border-white/10
            p-6
        "
      >

        {/* Left image */}
        <img
          src={trustImage}
          alt="Transparency illustration"
          className="h-12 w-12 md:h-16 md:w-16 object-contain"
        />

        {/* Right text */}
        <div className="text-black">
          <h3 className="text-lg font-semibold">
            A Transparent Path to Digital Success
          </h3>

          <p className="mt-1 text-sm text-black/70">
            No black boxes. No hidden costs. Just a proven 4-step framework to build your vision from concept to scalable reality
          </p>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
