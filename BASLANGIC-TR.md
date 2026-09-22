# Furkan Doğan — ana sayfa prototipi

Bu proje hazır: kodları yeniden yazman veya sıfırdan proje oluşturman gerekmiyor. Bu kılavuz Mac içindir. Önce 1. adımla tasarımı görebilir, düzenleme yapmak istediğinde 2. adımdan devam edebilirsin. Herhangi bir adımda benden yanıt beklemene gerek yok.

## 1. Kurulum yapmadan mevcut tasarımı gör

1. **Finder** uygulamasını aç. Üst menüden **Git → Klasöre Git…** seç; kısayolu **Command + Shift + G**.
2. Aşağıdaki klasör yolunu aynen yapıştır ve Enter'a bas:

   ```text
   /Users/furkan/.codex/.chatgpt-projects/g-p-6aaf2dc918c881919cf1768c40017be8/site
   ```

3. Klasördeki **ONIZLE.command** dosyasına çift tıkla. Terminal açılır. Bu dosya yalnızca bu klasördeki hazır siteyi bilgisayarında gösterir; internete yayın yapmaz. Makinede mevcut Node.js'i, yoksa burada çalıştığı doğrulanan uygulama çalışma ortamını kullanır.
4. Terminal'de `Ana sayfa hazır: http://127.0.0.1:4322/` görmelisin. Terminal'i açık bırak.
5. Safari veya Chrome aç; adres çubuğuna **http://127.0.0.1:4322/** yaz ve Enter'a bas.

Başarılı görünüm: Furkan Doğan başlığı, gri-beyaz zemin, koyu kırmızı vurgu, matching diyagramı; aşağıda Selected research, Recent writing ve Research in practice.

**Olası sorunlar:**

- “Port 4322 kullanımda”: önizleme zaten çalışıyor olabilir; doğrudan yukarıdaki adresi aç. Başka bir uygulama bu portu kullanıyorsa 2. adımdan sonra Terminal'de `PORT=4323 npm start` kullan ve `http://127.0.0.1:4323/` aç.
- “Node.js bulunamadı”: aşağıdaki 2. adımı uygula, sonra yeniden çift tıkla.
- macOS dosyayı açmıyorsa güvenlik ayarlarını kapatma. Aşağıdaki Node kurulumundan sonra Terminal'de proje klasörüne girip `npm start` çalıştır.
- “Sayfaya ulaşılamıyor”: önizlemeyi açan Terminal kapanmış olabilir. Dosyayı tekrar çalıştır.
- Bu adres yalnızca bu bilgisayarda çalışır. Başka birine gönderdiğinde açılmaz.

Kapatmak için Terminal penceresine tıkla ve **Control + C** bas. Hazır sürümün görünmesi için internet gerekmez; fontlar ve PDF'ler yereldir. Kaynak dosyaları değiştirirsen bu hazır sürüm kendiliğinden değişmez; bunun için 6. adım gerekir.

## 2. `zsh: command not found: node` hatasını çöz

Bu hata, Terminal'in Node.js programını bulamadığını gösterir. Web sitesi kodundaki bir hata değildir. Sistemine yönetici yetkisiyle otomatik kurulum yapmadım.

1. Safari/Chrome'da [resmî Node.js indirme sayfasını](https://nodejs.org/en/download) aç.
2. **LTS** sürümünü, **macOS** işletim sistemini ve **Installer (.pkg)** seçeneğini seç. Bu proje için Node **24 LTS** uygun; asgari gereksinim 22.12.0. “Current” sürümünü seçmen gerekmiyor.
3. İnen `.pkg` dosyasına çift tıkla. Yükleyicinin adımlarını oku ve devam et. Lisans/kullanıcı parolası gerektiğinde işlemi kendin tamamla.
4. Açık Terminal pencerelerini kapat. **Command + Space** bas, `Terminal` yaz, Enter'a bas.
5. Şu iki komutu **ayrı ayrı** yapıştır ve her birinden sonra Enter'a bas:

   ```sh
   node -v
   ```

   ```sh
   npm -v
   ```

İlkinde `v24...`, ikincisinde bir sürüm numarası görmelisin. Hâlâ `command not found` varsa Terminal'i tamamen kapatıp yeniden aç. Node yükleyicisinin başarıyla tamamlandığını kontrol et; rastgele `sudo`, Homebrew veya PATH komutları çalıştırma.

## 3. Projeyi düzenleyicide aç

1. [Visual Studio Code](https://code.visualstudio.com/) sitesinden **Download for Mac** seç.
2. İnen arşivi aç; **Visual Studio Code** uygulamasını **Applications / Uygulamalar** klasörüne sürükle.
3. Visual Studio Code'u aç. **File → Open Folder…** seç.
4. Açılan pencerede **Command + Shift + G** bas ve 1. adımdaki tam klasör yolunu yapıştır. Enter, ardından **Open** seç.
5. Bu projeye güvenip güvenmediğini sorarsa yalnızca burada hazırlanan bu klasörü açtığını doğruladıktan sonra güven seçeneğini kullan.
6. Üst menüden **Terminal → New Terminal** seç. Alt bölümde komut yazılabilen bir alan açılır.
7. Doğru klasörde olduğundan emin olmak için şu komutu aynen yapıştır:

   ```sh
   cd "/Users/furkan/.codex/.chatgpt-projects/g-p-6aaf2dc918c881919cf1768c40017be8/site"
   ```

Başarılı olduğunda sol tarafta `src`, `public`, `package.json` ve bu kılavuz görünür. `cd` komutunun hiçbir yazı çıkarmaması normaldir. Proje dosyaları zaten var; `create astro` çalıştırma.

## 4. Geliştirme için gerekli paketleri hazırla

VS Code'un altındaki Terminal'de:

```sh
npx --yes pnpm@11.19.0 install --frozen-lockfile
```

İlk çalıştırmada internet gerekir. Bu komut projenin kilit dosyasındaki sürümleri kurar; bilgisayarın genel paketlerini değiştirmez. Paketler zaten hazırsa işlem kısa sürer.

Başarılı olduğunda kırmızı bir hata olmadan komut satırına dönersin. `node_modules` klasörü görünür. Sonraki normal açılışlarda bu komutu yeniden çalıştırman gerekmez.

**Hata varsa:**

- `npx: command not found`: 2. adımı tamamla; VS Code'u da kapatıp yeniden aç.
- `No package.json found`: yanlış klasördesin; 3. adımın `cd` komutunu yeniden çalıştır.
- Ağ/indirme hatası: internet bağlantısını kontrol et, aynı komutu yeniden dene.
- Sürüm uyumsuzluğu: `node -v` sonucunu kontrol et. Rastgele paket güncellemesi yapma; proje Astro 7.3.3 ve pnpm 11.19.0 ile sabitlenmiştir.

## 5. Düzenlenebilir, canlı önizlemeyi başlat

Aynı Terminal'de:

```sh
npx --yes pnpm@11.19.0 dev
```

Terminal bir yerel adres gösterir; genellikle **http://localhost:4321/**. Safari veya Chrome'da **Terminal'in gösterdiği tam adresi** aç. Port doluysa sayı değişebilir.

Bu önizleme açıkken kaynak dosyayı kaydettiğinde tarayıcı otomatik yenilenir. Terminal'i açık tut. Normal Terminal kullanımında durdurmak için **Control + C** yeterlidir. Daha önce arka planda başlatıldığına dair mesaj alırsan:

```sh
npx --yes pnpm@11.19.0 exec astro dev stop
```

Sonra `dev` komutunu yeniden çalıştır. `4321` düzenlenebilir sürüm, `4322` ise 1. adımda açılan son derlenmiş sürümdür; bunları karıştırma.

## 6. İlk düzenlemeni yap ve hazır sürümü güncelle

Araştırma içeriğinin dosyası:

```text
/Users/furkan/.codex/.chatgpt-projects/g-p-6aaf2dc918c881919cf1768c40017be8/site/src/data/research.json
```

1. VS Code sol panelinde **src → data → research.json** yolunu aç.
2. Örneğin ilk kaydın `summary` alanındaki **iki çift tırnak arasındaki metni** değiştir. Dosyanın tamamını değiştirme; tırnakları ve virgülleri silme.
3. **Command + S** ile kaydet.
4. Canlı önizlemedeki ilk araştırmanın özetinin değiştiğini görmelisin.

Başlık `title`, ortak yazarlar `authors`, durum `meta`, PDF konumu `href` alanındadır. `href: null`, o çalışma için indirme bağlantısı gösterilmemesi demektir. PDF'yi sonradan eklemek istersen önce `public/research/` içine koy; ardından `href` alanına örneğin `research/yeni-calisma.pdf` yaz. Başına `/` ekleme.

Değişiklikleri hazır önizlemeye geçirmek için Terminal'de (çalışan dev sunucusu varsa yeni Terminal açarak):

```sh
npx --yes pnpm@11.19.0 build
```

Başarılı olduğunda **1 page(s) built** ve **Complete!** görürsün. Ardından `4322` adresini tarayıcıda yenile. `dist` klasörünü elle düzenleme; her derlemede yeniden üretilir.

Matematiksel örneğin kontrolü:

```sh
npx --yes pnpm@11.19.0 test
```

Üç testin de geçmesi gerekir. Bunlar tam atamanın geçerliliğini, iyi seçimden sonra iki tamamlamanın varlığını ve yerel olarak mümkün kötü seçimden sonra hiçbir tamamlamanın kalmadığını doğrular.

## 7. Hangi içerik nerede?

Bu tablodaki bütün yollar yukarıdaki `site` klasörünün içindedir.

| Değiştirmek istediğin | Dosya |
| --- | --- |
| Araştırma başlıkları, durumları, özetler, PDF bağlantıları | `src/data/research.json` |
| Writing örnekleri | `src/content/writing/01-ranks.md`, `02-completion.md`, `03-equity.md` |
| Ana sayfa metinleri, e-posta, bölüm sırası | `src/pages/index.astro` |
| Renk, tipografi, boşluklar ve mobil kurallar | `src/styles/global.css` |
| Diyagramın görünümü ve etkileşimi | `src/components/AllocationDiagram.astro` |
| Diyagramın matematiksel örneği | `src/data/allocation.mjs` |
| CV | `public/furkan-dogan-cv.pdf` |
| Araştırma PDF'leri | `public/research/` |

Yeni bir Writing özeti eklemek için VS Code'da `src/content/writing` klasörüne sağ tıkla, **New File** seç ve `04-yeni-not.md` yaz. Aşağıdaki içeriği **yeni dosyanın tamamına** koy; gerçek başlık ve açıklamanla değiştir:

```md
---
order: 0
type: Research note
title: Gerçek yazının başlığı
description: Gerçek yazının bir cümlelik açıklaması.
placeholder: false
---

Yazının metni daha sonra burada tutulabilir.
```

Kaydedince en küçük `order` değerine sahip üç özet ana sayfada görünür. **Bu sürüm makale okuma sayfası oluşturmaz; Markdown gövdesini yayımlamaz.** Sadece ana sayfa prototipi istendiği için şu an yalnızca başlık ve açıklama gösterilir. Örnekler gerçek yazılarla değiştirildiğinde `index.astro` içindeki Writing açıklaması ve prototype uyarısı da yeniden düzenlenmelidir.

## 8. Neler tamamlandı, neler bilinçli olarak bekliyor?

Tamamlanan: tek Astro ana sayfa, yerel fontlar, responsive düzen, iki farklı görünümde aynı matematiksel örnek, klavye/focus ayrıntıları, azaltılmış hareket tercihi, gerçek PDF bağlantıları, yapılandırılmış research verisi ve Markdown tabanlı Writing özetleri.

Tasarım: STIX Two Text + Instrument Sans; soğuk nötr zemin `#F1F2EF`, mürekkep `#171918`, oksit kırmızısı `#9C2E27`. STIX'in bilimsel yayın karakteri ve italikleri, isim ve metinler arasındaki akışı kuruyor. Renk diyagramdaki seçim ile metinsel vurguda kullanılıyor. Fontlar dışarıdan her sayfa açılışında yüklenmiyor; lisansları `public/fonts/` içinde.

Matching örneği varsayımsal bir açıklama örneğidir, makaleden çıkarılmış veri değildir. A/B/C kümelerinin her birinde iki ajan vardır. Her slot iki kişiliktir ve bir kümeden en fazla bir kişi alabilir. Üç atama sabitken b₂'nin seçimi değiştirilir; bu nedenle karşılaştırma gerçekten yerel uygunluk ile tamamlanabilirlik arasındaki farkı gösterir.

Bekleyen: fotoğraf, nihai hero konumlandırması, gerçek Writing metinleri, ayrı Research/Writing/Teaching/About sayfaları, makale okuma düzeni, matematik dizgisi, RSS ve herkese açık yayın. Hiçbirine yer tutucu kırık bağlantı eklenmedi. Equitable Affirmative Action için bu prototipte PDF bağlantısı yok; yanlış eski not kopyası site klasöründen çıkarıldı, kaynak belgeler korunuyor.

Güncel CV e-posta adresi kullanıldı; mezuniyet/candidate durumu tahmin edilmedi. Research durumları ve uygulama örneğinin sayıları verilen belgelere dayanıyor; bunlar yayın öncesi son kez kontrol edilmeli. CV'nin PDF içinde kişisel iletişim bilgileri bulunabileceğini de yayın öncesi gözden geçir.

## GitHub Pages daha sonra nasıl bağlanacak?

Bu teslim **yerel prototiptir**; internete veya GitHub'a dosya yüklenmedi. GitHub hesabı, repo adı ve yayımlanmasına izin verilen PDF'ler belirlenmeden herkese açık yayın yapmadım.

Proje statik HTML üretiyor ve GitHub Pages alt klasörünü destekliyor. İleride yayın adresi kesinleşince `SITE_URL` (alan adı) ve `BASE_PATH` (repo yolu) derleme ortamında tanımlanacak. Örneğin kendi değerlerinle `SITE_URL=https://KULLANICI.github.io` ve `BASE_PATH=/REPO/`; kişisel kök site için `BASE_PATH=/`. Bu büyük harfli ifadeler yer tutucudur, şimdi aynen çalıştırma. Canonical adresi yalnızca gerçek site adresi verilirse üretiliyor.

Prototipte arama motorlarına `noindex, nofollow` işareti var. **Bu gizlilik veya erişim koruması değildir.** Yayına çıkmadan örnek Writing içerikleri, CV/PDF paylaşımı ve hero metni onaylanmalı; ardından bu işaret kaldırılmalı. Hazır onaylı içerik olmadan GitHub Pages yayınını açma.

Kaynak kodunu bu bilgisayarda kaybetmemek için teslim edilen ZIP'i kendi Belgeler klasörüne yedekleyebilirsin. Taşıdığında terminaldeki `cd` yolunu yeni klasöre göre değiştir. `sources/` klasörüne müdahale etme; oradaki dosyalar referans kaynaklardır.

Teknik referanslar: [Astro kurulumu](https://docs.astro.build/en/install-and-setup/), [Node.js indirme](https://nodejs.org/en/download), [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/). Kontrol tarihi: 21 Eylül 2026.
