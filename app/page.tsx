import HeroSection from "./components/HeroSection"
import PersonalInfo from "./components/About"
import SkillsSection from "./components/SkillsSection"

export default function Home() {
  return (
    <div >
      <main>
        {/*Hero section*/ }
        <HeroSection/>
        {/*About section*/ }
        <PersonalInfo/>
       {/*skills section*/ }
        <SkillsSection/>
      </main>
    
    </div>
  );
}
