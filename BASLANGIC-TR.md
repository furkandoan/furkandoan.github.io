# Furkan Doğan — güncel akademik site

Bu klasör çalışır durumdaki Astro sitesidir. Güncel ana sayfa `src/pages/final.astro`, tasarım dosyası `src/styles/final.css` üzerinden geliştirilir. `index.astro` aynı ana sayfayı kök adreste gösterir.

## 1. Son sürümü aç

1. Finder'da **Kişisel → furkan-website** klasörünü aç.
2. **ONIZLE.command** dosyasına çift tıkla.
3. Açılan Terminal'i açık bırak. “Ana sayfa hazır” mesajından sonra tarayıcıda **http://127.0.0.1:4322/** adresini aç.

Bu yalnızca kendi bilgisayarındaki önizlemedir; internete yayın yapmaz. Kapatmak için Terminal'de **Control + C**.

Port zaten kullanımdaysa önce aynı adresi dene. macOS dosyayı açmıyorsa güvenlik ayarlarını kapatma; aşağıdaki Terminal yolunu kullan.

## 2. Terminal'den çalıştırma

Terminal uygulamasında:

```sh
cd "/Users/furkan/Desktop/Kişisel/furkan-website"
npm start
```

Node bulunamazsa bilgisayarındaki Node.js kurulumunu doğrula; proje en az Node 22.12 gerektirir. Önizleme dosyası mevcutsa uygulamanın yerel Node çalışma ortamını da kullanabilir.

## 3. Değişiklik yapma

Canlı geliştirme önizlemesi:

```sh
npm run dev
```

Terminal'in gösterdiği yerel adresi aç. Kaydettiğinde değişiklikler görünür. Son derlenmiş sürümü ve kontrolleri güncellemek için başka bir Terminal'de:

```sh
npm run check:site
```

Başarılı sonuç: dört HTML sayfası (ana sayfa, /final takma yolu, Research, Teaching), sitemap ve robots çıktısı; on iki testin geçmesi. Sonra 4322 adresini yenile.

Paketler bu bilgisayarda hazır. Yeni bilgisayarda, proje klasöründe kilit dosyasını koruyarak `npx --yes pnpm@11.19.0 install --frozen-lockfile` kullanılabilir. `dist` klasörünü elle düzenleme.

## İçerik nerede?

| İçerik | Dosya |
| --- | --- |
| Ana sayfa, bölüm sırası, tanıtım | `src/pages/final.astro` |
| Tasarım, renkler, yazı tipleri, mobil düzen | `src/styles/final.css` |
| Makaleler, ortak yazarlar, durumlar, özetler | `src/data/research.json` |
| İletişim, eğitim, projeler, konferanslar, öğretim | `src/data/academic.json` |
| Ortak menü, alt bilgi, SEO | `src/layouts/SiteLayout.astro` |
| Konferans haritası ve etkileşimi | `src/components/Conferences.astro` |
| Research ve Teaching sayfaları | `src/pages/research.astro`, `src/pages/teaching.astro` |
| İndirilen CV | `public/furkan-dogan-cv.pdf` |
| Araştırma PDF'leri | `public/research/` |

CV PDF'i içerik dosyalarını değiştirince kendiliğinden güncellenmez. `scripts/build-academic-cv.py`, doğrulanmış verilerden akademik kopyayı üretir; ReportLab ve Türkçe karakterleri destekleyen fontlar gerektirir. Güncellenen PDF ayrıca görsel olarak kontrol edilmelidir. Kaynak CV değiştirilmedi.

## Korunan taslaklar ve yedek

Eski index/a/b/c taslakları `archive/prototypes/` içinde korunur; artık yayınlanan sayfalar değildir. Tekrar kullanmak için bağımlılık yollarının eski `src/pages/` konumuna göre yazıldığını dikkate al.

Bu çalışmadan önceki tüm site kaynakları ve public dosyaları:
`../.website-backups/before-refinement-20261020.zip`

## Yayın

SEO adresi `https://furkandogan.org` olarak ayarlandı. Henüz alan adına veya başka bir barındırma servisine yükleme yapılmadı. Statik yayın çıktısı `dist/` klasörüdür. DNS/HTTPS ve barındırma hesabı ayrı bir yayın adımıdır.

Yayın öncesi içerik kararları ve doğrulama sınırları için **KONTROL-NOTLARI.md** dosyasını oku.
