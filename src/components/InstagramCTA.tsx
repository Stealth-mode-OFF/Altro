import { Instagram, Camera, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FlowingSection } from './premium/FlowingSection';
import { SmoothReveal } from './premium/SmoothReveal';

export function InstagramCTA() {
  const { language } = useLanguage();

  return (
    <FlowingSection className="py-20 md:py-32">
      <div className="container-custom px-6">
        <SmoothReveal>
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 px-6 py-3 rounded-full mb-6 border border-primary/20">
                <Instagram className="w-5 h-5 text-primary" />
                <span className="text-sm uppercase tracking-[0.2em] text-primary/90">
                  {language === 'cs' ? 'Sledujte Nás' : language === 'en' ? 'Follow Us' : 'Seguici'}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                {language === 'cs' && 'Staňte se součástí naší italské rodiny'}
                {language === 'en' && 'Become Part of Our Italian Family'}
                {language === 'it' && 'Diventa Parte della Nostra Famiglia Italiana'}
              </h2>

              <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                {language === 'cs' && (
                  <>
                    Sledujte naše denní speciality, zákulisí přípravy a autentickou italskou atmosféru. 
                    <span className="block mt-2 text-primary">Každý týden nová inspirace!</span>
                  </>
                )}
                {language === 'en' && (
                  <>
                    Follow our daily specials, behind-the-scenes preparations and authentic Italian atmosphere.
                    <span className="block mt-2 text-primary">New inspiration every week!</span>
                  </>
                )}
                {language === 'it' && (
                  <>
                    Segui i nostri piatti speciali quotidiani, i dietro le quinte e l'autentica atmosfera italiana.
                    <span className="block mt-2 text-primary">Nuova ispirazione ogni settimana!</span>
                  </>
                )}
              </p>

              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/altro.da.tony"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105 group"
              >
                <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                <span className="font-medium tracking-wide">
                  {language === 'cs' ? 'Sledovat @altro.da.tony' : language === 'en' ? 'Follow @altro.da.tony' : 'Segui @altro.da.tony'}
                </span>
              </a>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-lg text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'cs' ? 'Označte nás ve svých fotkách' : language === 'en' ? 'Tag us in your photos' : 'Taggaci nelle tue foto'}
                </h3>
                <p className="text-sm text-foreground/70">
                  {language === 'cs' ? 'Sdílejte vaše zážitky s #AltroDaTony' : language === 'en' ? 'Share your experience with #AltroDaTony' : 'Condividi la tua esperienza con #AltroDaTony'}
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-lg text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'cs' ? 'Denní inspirace' : language === 'en' ? 'Daily inspiration' : 'Ispirazione quotidiana'}
                </h3>
                <p className="text-sm text-foreground/70">
                  {language === 'cs' ? 'Nové recepty, tipy a italské tradice' : language === 'en' ? 'New recipes, tips and Italian traditions' : 'Nuove ricette, consigli e tradizioni italiane'}
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-lg text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'cs' ? 'Exkluzivní nabídky' : language === 'en' ? 'Exclusive offers' : 'Offerte esclusive'}
                </h3>
                <p className="text-sm text-foreground/70">
                  {language === 'cs' ? 'Speciální akce jen pro naše followery' : language === 'en' ? 'Special deals only for our followers' : 'Offerte speciali solo per i nostri follower'}
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-12 text-center">
              {/* Removed social proof text */}
            </div>
          </div>
        </SmoothReveal>
      </div>
    </FlowingSection>
  );
}