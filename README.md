# Koleş Oto Kurtarma — Web Sitesi

Urla ve çevresinde (Güzelbahçe, Zeytinler, Gülbahçe, Mordoğan, Narlıdere) hizmet veren
Koleş Oto Kurtarma için mobil uyumlu, tek sayfalık tanıtım sitesi.

- **Sahibi:** Kemal Koleş
- **Telefon / WhatsApp:** 0552 214 03 98
- **Hizmetler:** Oto çekici, yol yardım, akü takviye

## Teknik

Düz HTML/CSS/JS. İkonlar sayfaya gömülü SVG (üçüncü parti JS yok),
görseller WebP (`assets/img/gallery/*-640.webp`, `*-1000.webp`) olarak sunulur.
Dosya yapısı:

```
index.html                  ← ana sayfa
{bölge}-cekici.html         ← bölge landing sayfaları (üretilen)
{hizmet}.html               ← hizmet landing sayfaları (üretilen)
assets/css/styles.css
assets/js/script.js
robots.txt
sitemap.xml                 ← üretilen (build script yazar)
vercel.json                 ← cleanUrls + statik önbellek başlıkları
tools/build-pages.mjs       ← bölge & hizmet sayfası üreticisi
```

## Bölge, hizmet & rehber sayfaları üretimi

Bölge (ör. `Seferihisar Çekici`), hizmet (ör. `Akü Takviyesi`) ve rehber
(ör. `Yolda kalınca ne yapmalı?`) sayfaları `tools/build-pages.mjs` içindeki
verilerden üretilir. Yeni bir sayfa eklemek veya metin güncellemek için o
dosyadaki `LOCATIONS` / `SERVICES` / `BLOG` dizilerini düzenleyip şunu
çalıştırın:

```
node tools/build-pages.mjs
```

Bu komut ilgili `.html` sayfalarını (ayrıca `404.html`) kök dizine yazar ve
`sitemap.xml`'i günceller. Her sayfa benzersiz `title`/`description`/`canonical`,
breadcrumb + `Service`/`Article` + `FAQPage` JSON-LD şeması içerir. `cleanUrls`
sayesinde adresler `.html` uzantısız çalışır (ör. `/urla-cekici`).

Tüm sayfalarda mobilde sabit "Hemen Ara / WhatsApp" çubuğu bulunur ve her
arama/WhatsApp tıklaması Vercel Analytics'e özel olay (`call_click` /
`whatsapp_click`) olarak gönderilir.

Görselleri yeniden üretmek için (kaynak JPG değişirse) `sharp` ile 640/1000
genişliğinde WebP üretilir; ayrıntı için commit geçmişine bakın.

## Yerel önizleme

`index.html` dosyasını herhangi bir tarayıcıda açmak yeterlidir, veya:

```
npx serve .
```

## Yayınlama (GitHub Pages)

Repo ayarlarından **Settings → Pages → Branch: main / (root)** seçilerek yayınlanabilir.
Canlıya alındıktan sonra `index.html` içindeki `canonical`, `og:*` ve `robots.txt` /
`sitemap.xml` içindeki adresler gerçek alan adıyla güncellenmelidir.

## SEO & Erişilebilirlik notları

- Yerel işletme için `AutomotiveBusiness` JSON-LD şeması eklendi (telefon, hizmet
  bölgeleri, 7/24 çalışma saatleri).
- Açıklayıcı `title`/`meta description`, Open Graph ve Twitter kartları mevcut.
- Anlamlı başlık hiyerarşisi (`h1` → `h2` → `h3`), `aria-label`/`aria-labelledby`
  ile işaretlenmiş bölümler, "İçeriğe geç" atlama bağlantısı.
- Dekoratif emoji ikonlar `aria-hidden="true"` ile ekran okuyuculardan gizlendi.
- `prefers-reduced-motion` desteği ile navbar'daki çekici animasyonu hareket
  hassasiyeti olan kullanıcılar için sadeleştirilir.
