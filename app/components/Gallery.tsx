'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, X, ArrowDown, ClipboardCheck } from 'lucide-react';

interface GalleryProps {
  photos: string[];
  whatsIcon: React.ReactNode;
  instaIcon: React.ReactNode;
}

export default function InteractiveLayout({ photos, whatsIcon, instaIcon }: GalleryProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const photosPerPage = 6;
  const totalPages = Math.ceil(photos.length / photosPerPage);

  const currentPhotos = photos.slice(currentPage * photosPerPage, (currentPage + 1) * photosPerPage);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedImg(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImg ? 'hidden' : 'unset';
  }, [selectedImg]);

  return (
    <>
      {/* BOTÃO HERO COM ANIMAÇÃO (Injetado via Portal ou Ref) */}
      <div className="hidden"> {/* Este componente apenas gerencia a lógica, o botão real está no page.tsx */} </div>

      {/* --- SEÇÃO DE GALERIA --- */}
      <section className="mt-12 md:mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-pantanize-dark uppercase italic tracking-tighter">Nossos Registros</h2>
            <p className="text-pantanize-accent font-medium mt-2 flex items-center gap-2">
              <Camera size={20} /> Clique na imagem para ampliar
            </p>
          </div>
          <div className="flex items-center gap-4 self-center md:self-end">
            <button onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)} className="p-3 rounded-full bg-white shadow-md hover:bg-pantanize-green hover:text-white transition-colors border border-gray-100"><ChevronLeft size={24} /></button>
            <span className="font-bold text-pantanize-dark text-sm tracking-widest">{currentPage + 1} / {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)} className="p-3 rounded-full bg-white shadow-md hover:bg-pantanize-green hover:text-white transition-colors border border-gray-100"><ChevronRight size={24} /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 min-h-[400px]">
          {currentPhotos.map((src, index) => (
            <motion.div 
              key={src} 
              layoutId={src}
              onClick={() => setSelectedImg(src)}
              className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 shadow-sm cursor-pointer"
            >
              <Image src={src} alt={`Registro ${index + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SEÇÃO CTA COM ANIMAÇÃO DE REVELAÇÃO --- */}
      <motion.section 
        id="participe" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="scroll-mt-24 mt-24 md:mt-32 bg-pantanize-dark rounded-[40px] md:rounded-[60px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic tracking-tighter text-white">Bora Pantanizar?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Seja voluntário ou ofereça uma oficina. A mudança começa com a nossa organização e união.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://wa.me/5579988314019" target="_blank" className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg">{whatsIcon} WhatsApp</a>
            <a href="https://instagram.com/pantanizese" target="_blank" className="w-full sm:w-auto bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg">{instaIcon} Instagram</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfzSjtrtHBxO_84b6Lgy4x3wxCpEENLEv-FOGqPYZ9dl4l5CA/viewform" target="_blank" className="w-full sm:w-auto bg-pantanize-green text-pantanize-dark px-8 py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg"><ClipboardCheck size={28} /> Seja voluntário!</a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-pantanize-green"></div>
      </motion.section>

      {/* --- MODAL DA IMAGEM --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-pantanize-dark/95 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-pantanize-green transition-colors z-[110]" onClick={() => setSelectedImg(null)}><X size={40} /></button>
            <motion.div layoutId={selectedImg} className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Image src={selectedImg} alt="Ampliada" fill className="object-contain rounded-lg" quality={100} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}