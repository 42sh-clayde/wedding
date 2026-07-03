import AmbientBackground from '@/components/AmbientBackground'
import HeroSection from '@/components/HeroSection'
import TimelineSection from '@/components/TimelineSection'
import FooterSection from '@/components/FooterSection'
import StickyBottomBar from '@/components/StickyBottomBar'
import ScrollDots from '@/components/ScrollDots'

export default function Page() {
  return (
    <>
      <AmbientBackground />
      <main id="contenu-principal" className="snap-scroll">
        <HeroSection />
        <TimelineSection />
        <FooterSection />
      </main>
      <ScrollDots />
      <StickyBottomBar />
    </>
  )
}
