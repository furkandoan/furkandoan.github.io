# Uygulama ve doğrulama notları — 24 Ekim 2026

## Teaching ve içerik sadeleştirmesi

Teaching yalnızca Course Instructor olarak verilen Math Camp ve High School Economics Camp derslerini gösterir. Her dersin ayrı Slides / Exams / Other materials listesi vardır; dosyalar henüz sağlanmadığı için kırık veya örnek indirme bağlantısı yoktur. İçerik kaynağı `src/data/teaching-materials.json`; ekleme yönergesi `TEACHING-MATERYALLERI.md`. Asistanlık geçmişi veri kaynağında ve CV'de korunur.

Ana sayfanın bölüm başlıkları yanındaki açıklamalar kaldırıldı; ilgili sayfa bağlantıları korundu. Çizelge adı “Projects over the years” oldu. Kullanıcının değiştirdiği spatial-constraints.pdf üretim çıktısına aynen kopyalanır; Abstract güncel PDF'in replica-level / quota-two kapsamına eşitlendi. Dosyanın kendisi düzenlenmedi. Test sayısı 12 oldu.

Bu güncellemenin 12 testi geçti. Teaching masaüstü ve 390 piksel mobil görünümü incelendi; Teaching ve ana sayfa 320 pikselde yatay taşma göstermedi. Ders içi bağlantı, konsol ve başlık metinleri tarayıcıda doğrulandı. Kaynak ve üretimdeki makale PDF'i bayt düzeyinde aynı; yeni makalenin ilk sayfasındaki Abstract kontrol edildi (tam makale hakemlik denetimi yapılmadı).

## 24 Ekim proje zaman çizgisi

Projelerin sağına mevcut bordo/nötr görsel dille “Research over time” çizelgesi eklendi. Kullanıcının görsel referansı üzerine paralel süre çubukları kaldırıldı: tek merkez omurgasından sırayla sağa ve sola açılan proje durakları kullanılıyor. 2024/1001 durağı takvim sembolü, 2025/1002-A durağı ağırlık ayarı sembolü taşır. Başlangıç yılları ve 2024–2026 / 2025–2026 süreleri academic.json içinden alınır; alttaki 2026 ortak proje ufkudur. Bu bir kronoloji, ölçülü süre grafiği veya tamamlanma göstergesi değildir. Mevcut proje metinleri ve CV değiştirilmedi.

İlk görünümde omurga çizilir, dallar ve yıl bilgileri gecikmeli olarak sırayla belirir; proje üzerine gelme, klavye odağı ve durak düğmelerine dokunma ilgili projeyi vurgular. Escape seçimi temizler. Sürekli döngü yok; reduced-motion kuralı animasyonu kapatır. Mobilde çizelge proje listesinin üstüne yerleşir; yazdırmada çıkarılır.

Üretim derlemesi ve 10 otomatik test başarılı. 1440/768/390/320 piksel genişlikleri, masaüstü/tablet/mobil görünüm, düğme seçimi, Enter ve Escape tarayıcıda kontrol edildi. Konsolda hata/uyarı görülmedi. Reduced-motion davranışı CSS kuralı üzerinden doğrulandı; işletim sistemi tercihi değiştirilmedi. Yerel önizleme kullanıldı; dağıtım yapılmadı.

## 23 Ekim CV güncellemesi

Güncellenen Furkan_CV__Latest_.pdf ile karşılaştırıldı. Spatial matching makalesi “The Scandinavian Journal of Economics — Forthcoming” olarak ana sayfaya, Research sayfasına, scholarly metadata'ya ve indirilebilir akademik CV'ye işlendi. Research sayfasında forthcoming makale çalışma kâğıtlarından ayrıldı. CV'de bulunmayan yayın yılı, cilt, sayı veya DOI eklenmedi. Tasarım ve konferans haritası değiştirilmedi; kaynak CV korunuyor.

Bu güncellemede üretim derlemesi ve dokuz otomatik test geçti. Ana sayfa ve Research 1440 ve 390 pikselde kontrol edildi; yatay taşma yok. Yeni üç sayfalık akademik CV'nin tüm sayfaları görsel olarak incelendi. Kullanıcı, Worst-rank makalesinin tek ortak yazarının Özgür Yılmaz olduğunu teyit etti; site ve akademik CV düzeltildi. Diğer ayrıntılı etkileşim kontrolleri aşağıdaki 20 Ekim denetimine aittir.

Güncelleme öncesi kopya: `../.website-backups/cv-update-20261023-qfFEy3/site-before-update.zip`.

## Kapsam ve tasarım

Mevcut Astro projesi geliştirildi; yeni framework veya çalışma zamanı bağımlılığı eklenmedi. Ana sayfa final.astro ve final.css üzerinden sürüyor. Ortak menü, footer ve metadata tek layout'a alındı.

STIX Two Text + Instrument Sans, açık nötr zemin, bordo vurgu, fotoğrafsız kimlik, araştırma-tema çizimi, üniversite logoları ve konferans haritası korundu. Metin kontrastı, meta veri boyutları, boşluklar ve tablet/mobil kırılımları iyileştirildi. Kart ağı eklenmedi.

Akış: kimlik → seçilmiş araştırmalar → eğitim → konferanslar → akademik projeler → iletişim. Research ve Teaching ayrı sayfalardır. Eski örnek Writing içerikleri yayına alınmadı.

## Projeler ve kaynaklar

Birincil kaynak: Kişisel/Furkan_CV__Latest_.pdf (kaynak dosya değiştirilmedi).

- TÜBİTAK 1002-A Short-Term R&D Funding Program, 2025–2026 — Project Coordinator. Ağırlıklı puanlarla araştırma görevlisi alımı: adalet, sağlamlık, manipüle edilebilirlik, puan toplama ve GPA normalizasyonu.
- TÜBİTAK 1001 Research Project, 2024–2026 — Scholar. Eczane nöbetlerinin tahsisi: uygulanabilir atamalar, matching/mechanism design ve çizelgeleme verileriyle simülasyon. Scholar rolü yürütücü/PI olarak genişletilmedi.

Şirket, ürün veya ticari yazılım içeriği yeni sayfalara eklenmedi. Public CV, kaynak CV'den doğrulanmış akademik bilgilerle yeniden düzenlendi; özel telefon ve şirket deneyimi çıkarıldı. Önceki PDF yedek ZIP'te korunuyor. Yeni CV üç sayfadır; gerçek metin çıkarımı ve sayfa görüntüleri kontrol edildi.

## İçerik düzeltmeleri ve son teyitler

1. **Worst-rank yazar listesi:** Kullanıcı 23 Ekim'de güncel ortak yazarın yalnızca Özgür Yılmaz olduğunu açıkça teyit etti. Site, scholarly metadata ve public CV “with Özgür Yılmaz” kullanır. Bağlantılı eski makale PDF'inde Cemil Dibek de bulunuyor; makale dosyası değiştirilmedi. Güncel makale PDF'i sağlandığında eskisiyle değiştirilmeli.
2. **Spatial paper:** 23 Ekim tarihli CV'ye göre “The Scandinavian Journal of Economics — Forthcoming”. Ana sayfa özeti tamamlanabilirlik ve maximum-flow testini anlatır. 24 Ekim'de sağlanan yeni PDF'te Abstract replica-level no justified-envy ve quota-two altında replica-level pairwise stability ayrımını içeriyor; Research Abstract'ı bu metne güncellendi. Önceki kapsam uyuşmazlığı giderildi.
3. **Affirmative-action:** Mevcut JSON abstract'ında geçen flow-equalizability sonucu, eldeki eski PDF'te bulunmuyor. JSON metni silinmedi ancak yayımlanan sayfa yalnızca güvenilir kısa konu özetini gösterir. Güncel onaylı abstract/PDF geldiğinde ayrıntı eklenebilir.
4. **Math Camp:** 2026 bilgisi CV ile uyuşmuyordu; iki Koç instructor dersi için CV'deki 2023–2025 aralığı kullanıldı.
5. **MATCH-UP:** Poster katılımı korundu; mevcut olmayan poster PDF'ine kırık bağlantı kaldırıldı. Dosya geldiğinde indirme bağlantısı eklenebilir.
6. **Harita lisansı:** Mevcut SVG aynen korundu; içinde kaynak/lisans beyanı bulunamadı. Orijinal dosyanın kaynak ve kullanım koşulları yayın öncesinde teyit edilmeli. Font lisansları public/fonts içinde mevcut.
7. Kaynağı bilinmeyen sosyal hesap veya akademik profil URL'leri eklenmedi; mesleki e-posta CV ile doğrulandı.

## Konferans haritası

Dört kayıt aynı: Paris/Fransa, Coventry/Birleşik Krallık, Istanbul/Türkiye, Ankara/Türkiye. Mevcut harita ülke gruplarını vurguluyor; önceden şehir pinleri yoktu, yeni koordinat uydurulmadı.

SVG dosyası yedekle SHA-256 düzeyinde aynı:
`88ae6cbcbe054c00455d16899724b348a102f49ff059bf7027c94e63b040e3e7`

2213 path, aynı 0 0 2754 1180 crop, gizli Antarctica, şeffaf okyanus ve bordo ülke vurguları korundu. Harita bölüme yaklaşınca yüklenir. Konum düğmeleri dokunma/Enter/Space ile seçilebilir; Tab odağı ve hover birlikte çalışır; Escape seçimi temizler. Mobilde aynı harita listenin üzerinde sticky kalır. Harita yüklenmezse konferans içeriği okunabilir kalır.

## SEO ve yayın yolları

- Kök / artık final ana sayfayı gösterir.
- /final/ korunur ancak noindex ve kök canonical taşır.
- /a/, /b/, /c/ taslak kaynakları archive/prototypes içine alındı; üretim çıktısında yok.
- Research ve Teaching için özgün başlık/açıklama; canonical, Open Graph/Twitter metin metadata'sı.
- Doğrulanmış Person ve iki bağlantılı makale için ScholarlyArticle JSON-LD.
- sitemap.xml ve robots.txt üretildi.
- Sayfa içi bağlantılar, proje-makale bağlantıları ve mevcut olmayan Contact hedefi düzeltildi.
- Görselli sosyal paylaşım kartı veya DOI eklenmedi; metadata bunların varlığını iddia etmez.

## 20 Ekim temel sürüm testleri

- Astro üretim derlemesi başarılı.
- Sekiz Node testi: üç eski matematik testi + beş site regresyon testi.
- Üretilen HTML'deki yerel sayfa, asset ve fragment hedefleri kontrol edildi.
- CV ve iki araştırma PDF'i dosya imzaları doğrulandı.
- Yerel HTTP kontrolü: CV, /research ve /teaching/ için 200.
- 1440, 1280, 768, 390 ve 320 CSS-piksel ana sayfa genişliklerinde yatay taşma yok.
- Research tablet ve mobil; Teaching mobil; Projects masaüstü ve mobil görsel incelemesi yapıldı.
- Dört konferansın ülke vurguları; Tab, Enter, Escape; açılır proje ayrıntısı ve Abstract klavye davranışı sınandı.
- Tarayıcı konsolunda kontrol edilen sayfalarda hata/uyarı görülmedi.
- PDF'de Türkçe karakterler, üç sayfanın yerleşimi, ortak yazarlar ve hariç tutulan bilgiler kontrol edildi.
- Görsel kayıtlar qa/ içinde. Bunlar yayın klasörü public/ dışında tutulur.
- Reduced-motion kuralları, görünür focus, skip link ve semantic HTML var. Bu çalışma tam WCAG sertifikasyonu, fiziksel iOS/Android cihaz testi veya ekran okuyucu denetimi değildir.

## Yayın durumu

Yalnızca yerel dosyalar ve üretim çıktısı hazırlandı. furkandogan.org DNS/HTTPS, GitHub veya Sites dağıtımı yapılmadı. Alan adına yayın ve gerçek sunucudaki yönlendirme/cache davranışı bu yerel test kapsamının dışındadır.
