# Ders materyali ekleme

Dosyaları `public/teaching/math-camp/` veya `public/teaching/high-school-economics-camp/` altına ekleyin.
`src/data/teaching-materials.json` içinde ilgili dersin `slides`, `exams` veya `other` listesine kayıt ekleyin:

```json
{
  "title": "Lecture 1 — Gerçek dosyanın başlığı",
  "href": "/teaching/math-camp/lecture-01.pdf",
  "format": "PDF",
  "note": "İsteğe bağlı açıklama"
}
```

Bu örnek dosya mevcut değildir; dosya eklenmeden kayıt oluşturmayın. Boş listeler bağlantısız “No files posted yet.” durumunu gösterir. Yalnızca herkese açık paylaşılabilecek materyalleri ekleyin; öğrenci bilgilerini ve paylaşılmaması gereken sınavları yüklemeyin. Sonrasında `npm run check:site` çalıştırın. Asistanlık geçmişi akademik veri kaynağı ve CV'de korunur; Teaching sayfasında gösterilmez.
