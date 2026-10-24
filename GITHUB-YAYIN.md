# furkandogan.org — GitHub Pages yayın notları

## Yayın modeli

- GitHub hesabı: `furkandoan`.
- Önerilen depo: `furkandoan.github.io` (henüz oluşturulduğu doğrulanmadı).
- Hedef alan adı: `furkandogan.org`; kayıt firması: Spaceship.
- Ücretsiz GitHub Pages için depo Public olacak; kaynak kod ve depoya konan belgeler herkesçe görülebilir.
- Site statik Astro çıktısıdır. Sunucu veya ücretli hosting gerekmez. Alan adı yenilemesi ayrı ücretlidir.
- `.github/workflows/deploy.yml`, `main` dalına gönderilen değişiklikleri derler, test eder ve yalnızca başarılı çıktı varsa yayınlar.
- Node 24 ve pnpm 11.19.0 kullanılır. Paket sürümleri `pnpm-lock.yaml` ile tutulur.

## İlk yükleme: mevcut geçmişi doğrudan göndermeyin

Mevcut çalışma deposunun geçmişinde taslaklar ve eski belge sürümleri bulunabilir. `.gitignore` geçmişteki dosyaları gizlemez. İlk yayın için temiz, ayrı bir kopya ve yeni Git geçmişi kullanılmalı; orijinal klasör ve geçmiş silinmemeli.

Yayın kopyasına sadece çalışan sitenin gerekli kaynakları, `public/` içindeki yayımlanması onaylanan dosyalar, testler, paket/derleme ayarları ve yayın iş akışı alınmalı. `qa/`, `archive/`, `.env*`, `.git/`, yerel notlar, özel CV kaynakları ve kişisel üst klasör alınmamalı. Kaynak ve PDF içerikleri ilk gönderimden önce gözden geçirilmeli.

`public/` içine konan her belge webde erişilebilir. Henüz paylaşılmayacak sınav cevaplarını veya kişisel belgeleri buraya koymayın.

## GitHub ayarları

1. GitHub hesabına giriş yapın; boş bir Public depo oluşturun: `furkandoan.github.io`. İlk README, lisans ve .gitignore seçeneklerini boş bırakın.
2. İncelenmiş temiz yayın kopyasını `main` dalına gönderin.
3. Depoda **Settings → Pages → Build and deployment → Source → GitHub Actions** seçin. İlk iş akışı başarısız olmuşsa **Actions → Publish academic website → Run workflow** ile yeniden çalıştırın.
4. **Actions** bölümünde build ve deploy işlerinin başarılı olduğunu doğrulayın. `https://furkandoan.github.io/` adresinde ön kontrol yapılabilir; canonical ve sitemap nihai özel alan adını gösterir.
5. Güvenlik için GitHub hesap ayarlarındaki **Pages** bölümünden `furkandogan.org` sahipliğini doğrulayın. GitHub'ın verdiği TXT kaydını Spaceship DNS'e aynen girin; bu hesaba özgü değer önceden tahmin edilemez.
6. Depo **Settings → Pages → Custom domain** alanına `furkandogan.org` yazıp kaydedin. DNS yönlendirmesini bundan sonra yapın.

## Spaceship DNS hedefleri

Mevcut DNS kayıtları önce incelenmeli. E-posta için kullanılan MX/TXT kayıtlarını silmeyin; ad sunucularını rastgele değiştirmeyin. DNS başka bir sağlayıcıda yönetiliyorsa kayıtları orada düzenleyin.

| Tür | Host | Değer |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | furkandoan.github.io |

Aynı host için çakışan park sayfası/yönlendirme kayıtları inceleme sonrası kaldırılmalı. Wildcard (`*`) kaydı eklemeyin. CNAME hedefinde `https://` veya depo yolu bulunmaz.

DNS ve sertifika hazırlanması 24 saate kadar sürebilir. GitHub Pages ayarlarında uygun olduğunda **Enforce HTTPS** açılmalı. Hem `https://furkandogan.org` hem `https://www.furkandogan.org`, mobil görünüm, CV ve makale indirmeleri canlıda kontrol edilmeli.

GitHub Actions ile yayınlandığı için `public/CNAME` dosyası gerekli değil; özel alan adı depo ayarından tanımlanır.

## Güncelleme

Yayın bağlantısı kurulduktan sonra değişiklikleri yerelde hazırlayın ve `pnpm run check:site` ile kontrol edin. İncelenen değişiklikler yayın deposunun `main` dalına gönderildiğinde otomatik yayın başlar. Yerel testlerin geçmesi, tek başına canlıya yayınlandığı anlamına gelmez; Actions sonucunu ve canlı adresi kontrol edin.

## Resmî kaynaklar

- https://docs.astro.build/en/guides/deploy/github/
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
