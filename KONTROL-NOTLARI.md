# Teslim kontrolü — 21 Eylül 2026

Kapsam: yalnızca ana sayfa, Astro 7.3.3, statik çıktı. Sistem genelinde Node kurulumu yapılmadı; hazırlık ve derleme mevcut yerel çalışma ortamıyla tamamlandı.

- Üretim derlemesi başarılı: bir HTML sayfası.
- 1440, 1280, 768, 390 ve 320 CSS piksel genişliklerinde belge genişliği görünüm genişliğine eşit; yatay taşma görülmedi.
- Masaüstü, tablet ve mobil yerleşimleri tarayıcıda incelendi. Telefon görünümünde ağ yerine aynı atamanın matrisi var.
- Matching düğmesi Enter ve tıklama ile sınandı; aria-pressed ve açıklama değişiyor. Görünür klavye odağı var.
- Üç matematik testi geçti: tam atama, iyi seçimin iki tamamlaması, yerel olarak uygun kötü seçimin sıfır tamamlaması.
- HTML'deki 18 href/src referansı tarandı; yerel hedefler ve anchor hedefleri mevcut. Fontların CSS yolları da mevcut dosyalara karşı kontrol edildi. Dış LinkedIn profilinin içerik/erişim durumu doğrulanmadı.
- Tarayıcı hata günlüğünde hata görülmedi.
- Alt dizin (`/personal/`) ile ayrı bir deneme derlemesi başarılı; PDF, font, stil ve favicon yolları bu öneki taşıyor.
- Güncel CV kopyasının SHA-256 değeri kaynak dosyayla aynı. Eski EAA iç not kopyası yayın klasöründe yok; kaynak referanslar değiştirilmedi.
- Manuel ekran okuyucu denemesi ve %200 metin büyütme denemesi yapılmadı; tam erişilebilirlik sertifikasyonu iddia edilmiyor. Reduced-motion CSS kuralı mevcut.

## İçerik kaynakları

Proje kökündeki read-only `sources/` klasöründen:

- `Furkan_CV__Latest_-5.pdf`: yeni iletişim bilgisi, araştırma statüleri. Doktora/candidate durumu açık olmadığı için nötr kimlik metni kullanıldı.
- `TopM_EPS-21.pdf`: birinci araştırma ve PDF.
- `Pharmacy_Scheduling_Cardinal-14.pdf`: ikinci araştırma ve uygulama örneği. Ham panel 3.905 shift, 213 eczane; karşıolgusal örneklem 198 eczane. Sayılar kullanıcı/ciro/ürün başarısı metriği olarak sunulmuyor.
- `Equitable_affirmative_action-4.pdf`: üçüncü araştırmanın konu özeti. Bu prototipte indirme bağlantısı eklenmedi.

Writing başlıkları tasarım için önerilmiş örnek içeriktir; kullanıcının yazdığı veya yayımladığı metinler olarak sunulmuyor. Hero cümlesi nihai konumlandırma değildir.

## Yayın durumu

Yalnızca yerel önizleme. GitHub/Sites dağıtımı veya herkese açık paylaşım yapılmadı. Mevcut `.openai` kaydı teslim ZIP'ine alınmadı; herhangi bir hesap kimliği veya erişim anahtarı pakette bulunmuyor. Kaynak belgelerdeki PDF'lerin kamuya açılması ayrıca kararlaştırılmalı.
