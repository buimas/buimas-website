import htmlIcon from "../assets/images/html.svg"
import cssIcon from "../assets/images/css.svg"
import jsIcon from "../assets/images/javascript.svg"
import reactIcon from "../assets/images/react.svg"
import flutterIcon from "../assets/images/flutter.svg"
import tailwindIcon from "../assets/images/tailwind.svg"
import bootstrapIcon from "../assets/images/bootstrap.svg"
import javaIcon from "../assets/images/java.svg"
import csharpIcon from "../assets/images/csharp.svg"
import pythonIcon from "../assets/images/python.svg"
import figmaIcon from "../assets/images/figma.svg"
import getstacImg from "../assets/images/getstac.png"
import spikkImg from "../assets/images/spikk.png"
import mowoImg from "../assets/images/mowo.png"
import cyclexImg from "../assets/images/cyclex.png"
import spikkWeb from "../assets/images/spikk-web.png"
import ninthgridWeb from "../assets/images/ninthgrid.png"
import oshodifoodWeb from "../assets/images/oshodifood.png"
import glodWeb from "../assets/images/gloed.png"
import mowoWeb from "../assets/images/mowoafrica.png"
import babysittingWeb from "../assets/images/babysittingbuddies.png"
import persziWeb from "../assets/images/perzsi.png"
import cyclexWeb from "../assets/images/cyclexafrica.png"



const skills = [
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "React", icon: reactIcon },
  { name: "Flutter", icon: flutterIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Bootstrap", icon: bootstrapIcon },
  { name: "Java", icon: javaIcon },
  { name: "C#", icon: csharpIcon },
  { name: "Python", icon: pythonIcon },
  { name: "Figma", icon: figmaIcon },
]

const roles = [
  "Front-end Engineer",
  "Back-end Engineer",
  "DevOps Engineer",
  "AI/ML Engineer",
  "QA Engineer",
  "Cyber Security Experts",
  "UI/UX Designer",
  "Data Scientist",
  "Product Managers",
]

const About = () => {
  return (
    <main className="w-full">
      <section className="w-full py-24">
  <div className="pt-36 md:px-10 lg:px-[100px]">
    <div
      className="
        rounded-2xl
        bg-white/70
        backdrop-blur-xl
        shadow-lg
      "
    >
      <div className="p-10 ">
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900">
          About Us
        </h1>

        <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-500">
          Buimas is a global software development agency that provides on-demand
          teams of developers and other tech professionals to build custom,
          high-performing solutions tailored to client visions. Our mission is
          to empower businesses to innovate and scale through technology,
          offering flexible, scalable, and cost-efficient development models.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="w-full py-24">
  <div className="px-6 md:px-10 lg:px-[100px]">
    <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900">
      Skills & Technologies
    </h2>

    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {skills.map((skill) => (
        <div
  key={skill.name}
  className="
    group
    flex flex-col items-center justify-center
    rounded-xl
    bg-neutral-50
    p-6
    transition
    duration-300
    hover:bg-neutral-900
  "
>
  <img
    src={skill.icon}
    alt={skill.name}
    className="h-12 w-12"
  />

  <span
    className="
      mt-4
      text-sm
      font-medium
      text-neutral-800
      transition
      duration-300
      group-hover:text-white
    "
  >
    {skill.name}
  </span>
</div>

      ))}
    </div>
  </div>
</section>

        <section className="w-full pt-4 py-24">
            <div className="px-6 md:px-10 lg:px-[100px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {roles.map((role) => (
                    <div
                    key={role}
                    className="
                        relative
                        flex items-center justify-center
                        rounded-xl
                        bg-neutral-100
                        px-8 py-6
                        text-center
                        text-base font-medium text-neutral-800
                        shadow-sm
                        transition
                        duration-300
                        hover:bg-neutral-900
                        hover:text-white
                    "
                style={{
                clipPath:
                 "polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%)",
                 }}
                >
                    {role}
                    </div>
                ))}
                </div>
            </div>
        </section>

        <section className="w-full bg-neutral-200 py-24">
  <div className="px-6 md:px-10 lg:px-[100px]">
    <h2 className="text-2xl md:text-3xl font-semibold text-black">
      Our Projects
    </h2>

    <p className="mt-2 text-black/70">
      Mobile App Projects (Available on Appstore and Playstore)
    </p>

    <div className="mt-8">
  {/* Getstac */}
  <div className="space-y-4 mb-16">
    <h4 className="text-2xl font-semibold text-black">
      Getstac
    </h4>
    <img
      src={getstacImg}
      alt="Getstac mobile app project"
      className="w-full rounded-2xl"
    />
  </div>

  {/* Spikk */}
  <div className="space-y-4 mb-16">
    <h4 className="text-2xl font-semibold text-black">
      Spikk
    </h4>
    <img
      src={spikkImg}
      alt="Spikk mobile app project"
      className="w-full rounded-2xl"
    />
  </div>

  {/* Mowo */}
  <div className="space-y-4 mb-16">
    <h4 className="text-2xl font-semibold text-black">
      Mowo
    </h4>
    <img
      src={mowoImg}
      alt="Mowo mobile app project"
      className="w-full rounded-2xl"
    />
  </div>

  {/* CyclexAfrica */}
  <div className="space-y-4">
    <h4 className="text-2xl font-semibold text-black">
      CyclexAfrica
    </h4>
    <img
      src={cyclexImg}
      alt="CyclexAfrica mobile app project"
      className="w-full rounded-2xl"
    />
  </div>
</div>
  </div>
</section>

<section className="w-full bg-neutral-300 py-24">
  <div className="px-6 md:px-10 lg:px-[100px]">
    <h2 className="text-2xl md:text-3xl font-semibold text-black">
      Web Projects (Live)
    </h2>

    <div className="mt-10">
      {/* Spikk */}
      <div className="space-y-4 mb-16">
        <h4 className="text-xl font-semibold text-black">
          Spikk.co
        </h4>
        <img
          src={spikkWeb}
          alt="Spikk website"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Ninthgrid */}
      <div className="space-y-4 mb-16">
        <h4 className="text-xl font-semibold text-black">
          Ninthgrid.com
        </h4>
        <img
          src={ninthgridWeb}
          alt="Ninthgrid website"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Oshodifood */}
      <div className="space-y-4 mb-16">
        <h4 className="text-xl font-semibold text-black">
          Oshodifood.com
        </h4>
        <img
          src={oshodifoodWeb}
          alt="Oshodifood website"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Glod */}
      <div className="space-y-4 mb-16">
        <h4 className="text-xl font-semibold text-black">
          Glod.io
        </h4>
        <img
          src={glodWeb}
          alt="Glod website"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Mowo Africa */}
      <div className="space-y-4 mb-16">
        <h4 className="text-xl font-semibold text-black">
          Mowoafrica.com
        </h4>
        <img
          src={mowoWeb}
          alt="Mowo Africa website"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Babysitting Buddies */}
      <div className="space-y-4 mb-16">
        <h4 className="text-xl font-semibold text-black">
          babysittingbuddiesci.com
        </h4>
        <img
          src={babysittingWeb}
          alt="Babysitting Buddies website"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Perszi */}
      <div className="space-y-4 mb-16">
        <h4 className="text-xl font-semibold text-black">
          perszi.com
        </h4>
        <img
          src={persziWeb}
          alt="Perszi website"
          className="w-full rounded-2xl"
        />
      </div>

      {/* CyclexAfrica */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-black">
          Cyclexafrica.com
        </h4>
        <img
          src={cyclexWeb}
          alt="CyclexAfrica website"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  </div>
</section>

    </main>
  )
}

export default About
