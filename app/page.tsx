import HeroSection from "./components/HeroSection";
import PersonalInfo from "./components/About";
import SkillsSection from "./components/SkillsSection";
import Projects from "./components/Projects";
import Contact from "./components/Contacts";

export default function Home() {
  return (
    <div>
      <main>
      {/*Hero section*/ }
        <HeroSection/>
      {/*About section*/ }
        <PersonalInfo/>
      {/*skills section*/ }
        <SkillsSection/>
      {/*Projects section*/ }
        <Projects/>
      {/*Contacts section*/ }
        <Contact/>
      </main>
    
    </div>
  );
}
