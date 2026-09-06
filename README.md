# Koleş Oto Kurtarma — Web Sitesi

Urla ve çevresinde (Güzelbahçe, Zeytinler, Gülbahçe, Mordoğan, Narlıdere) hizmet veren
Koleş Oto Kurtarma için mobil uyumlu, tek sayfalık tanıtım sitesi.

- **Sahibi:** Kemal Koleş
- **Telefon / WhatsApp:** 0552 214 03 98
- **Hizmetler:** Oto çekici, yol yardım, akü takviye

## Teknik

Derleme aracı gerektirmeyen düz HTML/CSS/JS. Dosya yapısı:

```
index.html
assets/css/styles.css
assets/js/script.js
robots.txt
sitemap.xml
```

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
