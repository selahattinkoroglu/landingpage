# Arazöz Otomotiv — Konya

Next.js 16, React 19, TypeScript, Tailwind CSS ve GSAP ile hazırlanmış Türkçe ana sayfa.

## Çalıştırma

```sh
npm run dev
```

Yerel önizleme: http://localhost:3000

```sh
npm run build
npm start
```

## Tasarım ve hareket

- Navy `#162B3E`, Stone `#B8AD9B`, Beige `#E8DFCF` ve Sand `#D4C4A8`; Anton başlıklar ve menü, Manrope gövde metni.
- Özgün Ford Cargo fotoğrafı, SplitText başlık açılışı ve ön ve arka çıkışlı canvas su püskürtme efekti, damlacıklar ve zeminde hareketli sis ve yoğunluk düğmesi. Efekt ekran dışında ve sekme gizlendiğinde durur.
- GSAP ScrollTrigger ile paralaks, hizmet kartlarının sıralı açılışı ve filo görseli açılışı. Hizmetlerde araç ve yazı aynı fotoğraf kartında birleşir.
- Verilen Gallery4 bileşeninin Embla tabanlı uyarlaması; mobil sürükleme, ok düğmeleri, konum noktaları ve klavye desteği. shadcn bileşenleri `src/components/ui`, yapılandırması `components.json` altında.
- Üç gerçek araç arasında yatay kaydırma, görsel yakınlaşma ve metin geçişi; dört süre için önceden doldurulmuş WhatsApp bağlantıları.
- Mobil menü, Escape ile kapanış, semantik SSS ve sabit mobil iletişim çubuğu.
- `prefers-reduced-motion` veya footer’daki “Hareketi azalt” seçeneğinde animasyonlar ve sabitleme kapalıdır.
- Resmî WhatsApp SVG simgesi, dört sütunlu footer, doğrulanmış Google Maps embed ve “Yol Tarifi Al” bağlantısı.
- `useGSAP` ve `matchMedia` animasyonların temizliğini ve ekran değişimlerini yönetir.

## İçerik ve görsel kaynağı

Firma bilgileri ve filo fotoğrafları 15 Ekim 2026 tarihinde https://konyaarazozkiralama.com/ üzerinden doğrulandı. Telefon / WhatsApp: +90 543 430 20 10. Yeni hizmet veya araç kapasitesi eklenmedi.

Kullanıcının verdiği [Google Maps kaydı](https://maps.app.goo.gl/w8YBZao4QKgnTb7x9) incelendi. Görünür adres ve LocalBusiness verisi kullanıcı onayıyla “Fevziçakmak Mah. 10571. Sk. No:2, 42050 Karatay / Konya” olarak güncellendi. Embed bağlantısı Maps’in paylaşım penceresinden alındı; yol tarifi aynı işletmenin koordinatlarını kullanır. WhatsApp simgesi resmî whatsapp.com SVG geometrisinden alınmıştır.

Kullanıcının verdiği `/home/selo/hero.png`, `public/images/hero/hero.png` dosyasına birebir kopyalandı. Araç yazıları ve fotoğraf değiştirilmedi. Diğer araç fotoğrafları kaynak sitenin `/img/` dizininden `public/images/fleet/` dizinine alındı.

SEO başlığı, açıklama, canonical, Open Graph, LocalBusiness yapılandırılmış verisi, robots ve sitemap mevcut resmî alan adını kullanır. Başka bir alan adına yayınlanacaksa bu adresler güncellenmelidir.

## Temel dosyalar

- `src/components/home-experience.tsx`: Etkileşimler ve ana sayfa bölümleri.
- `src/app/globals.css` ve `src/app/refinement.css`: Tasarım sistemi ve duyarlı stiller.
- `src/components/fleet-showcase.tsx`: Kaydırılabilir filo vitrini.
- `src/components/water-spray.tsx`: Görünürlük ve azaltılmış hareket duyarlı su efekti.
- `src/components/whatsapp-icon.tsx`: Resmî WhatsApp simgesi.
- `src/app/page.tsx`: Sunucu sayfası ve yapılandırılmış firma bilgileri.
- `src/app/layout.tsx`: Türkçe belge, yazı tipleri ve SEO.

Üretim derlemesi ve masaüstü / 390 px mobil tarayıcı kontrolleri yapıldı. Telefon araması veya WhatsApp mesajı gönderilmedi; bağlantı hedefleri kontrol edildi. Yayına alma yapılmadı.

Tasarım kararları ve kullanılan skill kaynakları: `docs/design/BRIEF.md`. Marquee “DOĞRU ZAMAN. DOĞRU EKİP. DOĞRU ARAÇ.” ifadelerini üç ayrı sütunda dikey döndürür; mobilde üç satır kullanır. Sözcükler kenardan kesilmez.
