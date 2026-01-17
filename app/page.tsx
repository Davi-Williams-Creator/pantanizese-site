import React from 'react';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import ScrollFix from './components/ScrollFix';
import InteractiveLayout from './components/Gallery'; 
import { Users, Palette, Leaf, Heart, MapPin, ArrowDown, Instagram } from 'lucide-react';

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Home() {

  
  let galleryPhotos: string[] = [];
  try {
    const galleryPath = path.join(process.cwd(), 'public/galeria');
    if (fs.existsSync(galleryPath)) {
      galleryPhotos = fs.readdirSync(galleryPath)
        .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
        .map(file => `/galeria/${file}`);
    }
  } catch (e) { console.error(e); }

  return (
    <div className="min-h-screen font-sans selection:bg-pantanize-green/30 bg-pantanize-cream overflow-x-hidden scroll-smooth flex flex-col">
      
      {/* --- HERO SECTION --- */}
      <header className="bg-pantanize-green pt-12 pb-24 md:pt-20 md:pb-40 px-6 rounded-b-[40px] md:rounded-b-[80px] shadow-2xl relative overflow-hidden text-pantanize-dark z-10 text-center md:text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-pantanize-dark text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-6 shadow-lg uppercase tracking-widest">
              <MapPin size={16} /> Inácio Barbosa, Aracaju-SE
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-pantanize-dark">
              Participe do <br/>
              <span className="text-white drop-shadow-md italic">Pantanize-se!</span>
            </h1>
            <p className="text-lg md:text-2xl font-medium max-w-xl mx-auto md:mx-0 opacity-90 leading-relaxed mb-10">
              Revitalizando o Pantanal através da arte, cultura e liderança jovem para uma comunidade mais segura.
            </p>
            {/* Botão de âncora com tamanho py-3 preservado */}
            <a href="#participe" className="inline-flex items-center gap-3 bg-pantanize-dark text-white px-10 py-3 rounded-2xl font-extrabold text-xl shadow-2xl hover:bg-pantanize-accent transition-all hover:scale-105 active:scale-95 group">
              Bora Pantanizar? <ArrowDown size={24} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
          <div className="relative w-60 h-60 sm:w-70 sm:h-70 md:w-100 md:h-100 shrink-0">
            <Image src="/mascote2.png" alt="Mascote Jacaré" fill priority className="object-contain" />
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 pb-20 relative z-20 -mt-12 md:-mt-24 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          <article className="bg-white p-8 rounded-3xl shadow-xl border-b-8 border-pantanize-green transform hover:-translate-y-2 transition-all duration-300">
            <Users className="text-pantanize-green mb-6" size={32} />
            <h3 className="text-2xl font-bold mb-3 text-pantanize-dark text-pantanize-dark">Quem Somos</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Idealizado por <strong>Claudielle, Rafaela e Sara Annanda</strong> do Instituto JCPM Aracaju.
            </p>
          </article>
          <article className="bg-white p-8 rounded-3xl shadow-xl border-b-8 border-pantanize-dark transform hover:-translate-y-2 transition-all duration-300">
            <Heart className="text-pantanize-dark mb-6" size={32} />
            <h3 className="text-2xl font-bold mb-3 text-pantanize-dark">Nossa Missão</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Trazer visibilidade, lazer e segurança para o Pantanal, revitalizando espaços para nossas crianças.
            </p>
          </article>
          <article className="bg-white p-8 rounded-3xl shadow-xl border-b-8 border-pantanize-green transform hover:-translate-y-2 transition-all duration-300 sm:col-span-2 md:col-span-1">
            <Palette className="text-pantanize-green mb-6" size={32} />
            <h3 className="text-2xl font-bold mb-3 text-pantanize-dark">Oficinas</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Promovemos oficinas de arte, cultura, meio ambiente e educação. Um Pantanal diferente do que se vê na TV.
            </p>
          </article>
        </div>

        {/* PASSA OS DADOS PARA O COMPONENTE CLIENT-SIDE */}
        <InteractiveLayout 
          photos={galleryPhotos} 
          whatsIcon={<WhatsAppIcon />} 
          instaIcon={<Instagram size={24} />} 
        />

      </main>

      {/* --- FOOTER COM TAMANHO py-5 PRESERVADO --- */}
      <footer className="py-12 md:py-5 text-center border-t border-pantanize-dark/10 bg-pantanize-cream relative z-30">
        <div className="max-w-4xl mx-auto px-6 text-pantanize-dark/70">
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 mb-1">
            Pantanize-se <Leaf size={16} className="text-pantanize-green" /> Aracaju - SE
          </p>
          <p className="text-[11px] md:text-xs italic mb-1">Projeto Sem Fins Lucrativos e Apartidário</p>
          <p className="text-[11px] md:text-xs font-bold">
            © {new Date().getFullYear()} Desenvolvido por <a href="https://www.instagram.com/davi_williams/" target="_blank" className="hover:text-pantanize-green transition-colors">Davi Williams</a>
          </p>
        </div>
      </footer>
    </div>
  );
}