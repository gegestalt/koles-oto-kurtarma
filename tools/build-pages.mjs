// Koleş Oto Kurtarma — statik bölge & hizmet sayfası üreticisi.
// Kullanım:  node tools/build-pages.mjs
// Her sayfayı kök dizine `{slug}.html` olarak yazar ve sitemap.xml'i günceller.
// İçerik aşağıdaki data dizilerinden gelir; yeni bölge/hizmet eklemek için
// diziye bir kayıt ekleyip script'i tekrar çalıştırmak yeterlidir.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://koles-oto-kurtarma.vercel.app';
const TEL = '+905522140398';
const TEL_TXT = '0552 214 03 98';
const WA = 'https://wa.me/905522140398?text=Merhaba%2C%20yol%20yard%C4%B1m%C4%B1%20talebim%20var.';

// ---- Inline SVG ikonları (index.html ile aynı, üçüncü parti JS yok) ----
const ICON = {
  menuOpen: '<svg class="icon-menu-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>',
  menuClose: '<svg class="icon-menu-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>',
  wa: '<svg class="btn-icon-wa" viewBox="0 0 448 512" aria-hidden="true"><circle cx="224" cy="256" r="224" fill="#25D366"/><path fill="#fff" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------- VERİ ----------------------------
const LOCATIONS = [
  {
    slug: 'urla-cekici', town: 'Urla', lat: 38.3236, lng: 26.7656,
    title: 'Urla Çekici · 7/24 Acil Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Urla'da 7/24 oto çekici, akü takviye, lastik değişimi ve kaza kurtarma. Merkez, İskele, Zeytinalanı ve Gülbahçe'ye en hızlı yol yardım. " + TEL_TXT,
    lede: "Urla merkez ve tüm mahallelerinde 7/24 acil çekici. Üssümüz Urla'da olduğu için en kısa sürede yanınızdayız.",
    paras: [
      "Koleş Oto Kurtarma olarak üssümüz Urla'da bulunuyor; bu sayede Urla Merkez, İskele, Zeytinalanı, Çeşmealtı ve Gülbahçe başta olmak üzere ilçenin her noktasına en kısa sürede ulaşıyoruz. Aracınız yolda kaldıysa, kaza yaptıysanız veya aküyü yaktıysanız tek yapmanız gereken bizi aramak.",
      "İzmir–Çeşme otoyolunun Urla girişinden köy yollarına, sahil şeridinden bağ evlerine kadar her türlü zeminde çalışıyoruz. Binek araç, ticari araç ve motosiklet için modern sarkaç (kayar kasa / hidrolik) çekici ile aracınızı çizmeden, hasarsız taşıyoruz.",
    ],
    hoods: ['Urla Merkez', 'İskele', 'Zeytinalanı', 'Gülbahçe', 'Çeşmealtı', 'Bademler', 'Kuşçular', 'Özbek'],
    faq: [
      ['Urla merkeze ne kadar sürede gelirsiniz?', "Üssümüz Urla'da olduğu için genellikle en kısa sürede ulaşıyoruz; net süreyi konumunuzu aldıktan sonra telefonda söylüyoruz."],
      ['Urla köylerine ve bağ evlerine çekici geliyor mu?', 'Evet. Bademler, Kuşçular, Özbek ve tüm köy yollarına gidiyoruz.'],
    ],
  },
  {
    slug: 'guzelbahce-cekici', town: 'Güzelbahçe', lat: 38.3667, lng: 26.8833,
    title: 'Güzelbahçe Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Güzelbahçe'de 7/24 oto çekici ve yol yardım. Yalı, Çamlı, Payamlı ve otoyol çevresinde akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Güzelbahçe ve çevresinde 7/24 acil çekici ve yol yardım hizmeti.",
    paras: [
      "Güzelbahçe, Urla üssümüze en yakın ilçelerden biri; Yalı, Çamlı, Payamlı, Kahramandere ve Mustafa Kemal Paşa mahallelerine hızlı çekici desteği veriyoruz. İzmir–Çeşme otoyolu ile eski sahil yolu üzerinde sık çalıştığımız için trafik ve güzergâhı iyi biliyoruz.",
      "Sahil kesiminde park hâlindeyken çalışmayan araçlardan, otoyolda arıza yapan araçlara kadar her durumda yanınızdayız. Akü takviyesi, lastik değişimi ve hasarlı araç taşıma dâhil tüm yol yardım hizmetlerini tek numarayla veriyoruz.",
    ],
    hoods: ['Yalı', 'Çamlı', 'Payamlı', 'Kahramandere', 'Mustafa Kemal Paşa', 'Yaka'],
    faq: [
      ['Güzelbahçe otoyolunda arıza yaptım, gelir misiniz?', 'Evet, İzmir–Çeşme otoyolunun Güzelbahçe kesimine ekibimiz geliyor. Güvenliğiniz için aracınızın gerisinde bekleyin.'],
      ['Gece de hizmet var mı?', 'Evet, 7/24 çalışıyoruz; gece de aynı numarayı arayabilirsiniz.'],
    ],
  },
  {
    slug: 'seferihisar-cekici', town: 'Seferihisar', lat: 38.1969, lng: 26.8386,
    title: 'Seferihisar Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Seferihisar ve Sığacık'ta 7/24 oto çekici, akü, lastik ve kaza kurtarma. Ürkmez, Doğanbey ve sahil yollarına yol yardım. " + TEL_TXT,
    lede: "Seferihisar, Sığacık ve sahil hattında 7/24 acil çekici.",
    paras: [
      "Seferihisar merkez, Sığacık, Ürkmez, Doğanbey ve Payamlı bölgelerinde oto çekici ve yol yardım hizmeti veriyoruz. Sakin şehir Seferihisar'ın dar ve eğimli sahil yollarında araç kurtarma tecrübemizle aracınızı güvenle taşıyoruz.",
      "Yaz aylarında yoğunlaşan sahil trafiğinde, kumsal ve marina çevresinde yolda kalan araçlara hızlı ulaşıyoruz. Arıza, akü, lastik veya kaza — hangi durumda olursanız olun tek çağrıyla ekibimiz yola çıkıyor.",
    ],
    hoods: ['Seferihisar Merkez', 'Sığacık', 'Ürkmez', 'Doğanbey', 'Payamlı', 'Turabiye'],
    faq: [
      ["Sığacık marina çevresine çekici gelir mi?", 'Evet, Sığacık ve marina çevresi hizmet alanımızdadır.'],
      ['Ürkmez sahiline ne kadar sürede gelirsiniz?', 'Konumunuza göre değişir; aradığınızda tahmini süreyi hemen bildiriyoruz.'],
    ],
  },
  {
    slug: 'cesme-cekici', town: 'Çeşme', lat: 38.3236, lng: 26.3033,
    title: 'Çeşme Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Çeşme ve Alaçatı'da 7/24 oto çekici ve yol yardım. Ilıca, Dalyan ve otoyol çevresinde akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Çeşme, Alaçatı ve Ilıca'da 7/24 acil çekici ve oto kurtarma.",
    paras: [
      "Çeşme merkez, Alaçatı, Ilıca, Dalyan ve Çiftlik bölgelerinde oto çekici hizmeti veriyoruz. İzmir–Çeşme otoyolu üzerinden bölgeye hızlı ulaşım sağlıyor, yaz sezonunun yoğun trafiğinde bile araçlarınıza zamanında yetişiyoruz.",
      "Alaçatı'nın taş sokaklarından otoyol gişelerine kadar her noktada binek ve ticari araç taşıyoruz. Tatilde yolda kaldıysanız, akünüz bittiyse veya lastiğiniz patladıysa tek numarayla yardım alırsınız.",
    ],
    hoods: ['Çeşme Merkez', 'Alaçatı', 'Ilıca', 'Dalyan', 'Çiftlik', 'Ovacık'],
    faq: [
      ['Alaçatı içine çekici girebiliyor mu?', 'Evet; dar sokaklarda uygun ekipmanla çalışıyoruz, aracınızı güvenle çıkarıyoruz.'],
      ['Çeşme otoyolunda yol yardım veriyor musunuz?', 'Evet, otoyolun Çeşme yönünde arıza ve kaza kurtarma yapıyoruz.'],
    ],
  },
  {
    slug: 'karaburun-cekici', town: 'Karaburun', lat: 38.6383, lng: 26.5117,
    title: 'Karaburun Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Karaburun ve Mordoğan'da 7/24 oto çekici. Virajlı yarımada yollarında akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Karaburun ve Mordoğan'ın virajlı yollarında 7/24 acil çekici.",
    paras: [
      "Karaburun merkez, Mordoğan, Küçükbahçe ve Ambarseki bölgelerine oto çekici ve araç kurtarma hizmeti veriyoruz. Yarımadanın dar ve virajlı yollarında araç kurtarma özel dikkat ister; bu güzergâhlardaki tecrübemizle aracınızı güvenle taşıyoruz.",
      "Yoldan çıkan, viraj alamayan veya arıza yapan araçlar için uygun ekipmanla çalışıyoruz. Uzak köylere ve sahil noktalarına kadar geliyor, tek çağrıyla yola çıkıyoruz.",
    ],
    hoods: ['Karaburun Merkez', 'Mordoğan', 'Küçükbahçe', 'Ambarseki', 'Sarpıncık', 'Yaylaköy'],
    faq: [
      ['Yarımadanın uç köylerine geliyor musunuz?', 'Evet, Küçükbahçe ve Sarpıncık dâhil Karaburun geneline gidiyoruz.'],
      ['Yoldan çıkan aracımı kurtarır mısınız?', 'Evet, yoldan çıkan ve şarampole giren araçlar için kurtarma yapıyoruz.'],
    ],
  },
  {
    slug: 'narlidere-cekici', town: 'Narlıdere', lat: 38.3903, lng: 27.0011,
    title: 'Narlıdere Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Narlıdere'de 7/24 oto çekici ve yol yardım. Limanreis, Huzur ve sahil çevresinde akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Narlıdere ve çevresinde 7/24 acil çekici, İzmir merkeze yakın hızlı yol yardım.",
    paras: [
      "Narlıdere merkez, Limanreis, Huzur, Yenikale ve Çamtepe mahallelerinde oto çekici hizmeti veriyoruz. İzmir şehir merkezine yakın konumu sayesinde hem şehir içi hem de sahil yolu arızalarına hızlı müdahale ediyoruz.",
      "Sahil bandında park hâlindeki araçlardan, ana arter üzerinde arıza yapan araçlara kadar her durumda yanınızdayız. Akü, lastik, kaza ve şehirler arası taşıma dâhil tüm hizmetleri tek numarayla sunuyoruz.",
    ],
    hoods: ['Narlıdere Merkez', 'Limanreis', 'Huzur', 'Yenikale', 'Çamtepe', '2. İnönü'],
    faq: [
      ['Narlıdere sahiline çekici gelir mi?', 'Evet, sahil bandı ve tüm mahalleler hizmet alanımızdadır.'],
      ['İzmir merkeze araç taşıyor musunuz?', 'Evet, Narlıdere\'den İzmir merkez ve diğer ilçelere taşıma yapıyoruz.'],
    ],
  },
  {
    slug: 'menderes-cekici', town: 'Menderes', lat: 38.2517, lng: 27.1339,
    title: 'Menderes Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Menderes'te 7/24 oto çekici ve yol yardım. Cumaovası, Görece, Oğlananası ve havalimanı çevresinde akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Menderes ve çevresinde 7/24 acil çekici; havalimanı ve otoyol hattına hızlı ulaşım.",
    paras: [
      "Menderes merkez, Cumaovası, Görece, Oğlananası ve Gümüldür yolu çevresinde oto çekici hizmeti veriyoruz. Adnan Menderes Havalimanı ve İzmir–Aydın otoyoluna yakınlığımız sayesinde bu yoğun güzergâhlardaki arızalara hızlı müdahale ediyoruz.",
      "İster havalimanı çevresinde ister köy yollarında kalın, binek ve ticari aracınızı hasarsız taşıyoruz. Akü, lastik, kaza ve şehirler arası taşıma dâhil tüm hizmetleri tek numarayla sunuyoruz.",
    ],
    hoods: ['Menderes Merkez', 'Cumaovası', 'Görece', 'Oğlananası', 'Değirmendere', 'Gölcükler'],
    faq: [
      ['Havalimanı çevresine çekici geliyor mu?', 'Evet, Adnan Menderes Havalimanı ve çevre yollarına hizmet veriyoruz.'],
      ['Otoyolda arıza yaptım, gelir misiniz?', 'Evet, İzmir–Aydın otoyolunun Menderes kesimine geliyoruz.'],
    ],
  },
  {
    slug: 'gaziemir-cekici', town: 'Gaziemir', lat: 38.3187, lng: 27.1210,
    title: 'Gaziemir Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Gaziemir'de 7/24 oto çekici ve yol yardım. Sarnıç, Atıfbey ve Optimum çevresinde akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Gaziemir ve çevresinde 7/24 acil çekici, şehir içi hızlı yol yardım.",
    paras: [
      "Gaziemir merkez, Sarnıç, Atıfbey, Irmak ve Emrez mahallelerinde oto çekici hizmeti veriyoruz. Optimum ve çevresindeki yoğun trafikte, sanayi ve otoyol bağlantılarında yolda kalan araçlara hızla ulaşıyoruz.",
      "Şehir içi kısa mesafeden şehirler arası taşımaya kadar her ihtiyaçta yanınızdayız. Akü takviyesi, lastik değişimi ve hasarlı araç kurtarma tek çağrı uzağınızda.",
    ],
    hoods: ['Gaziemir Merkez', 'Sarnıç', 'Atıfbey', 'Irmak', 'Emrez', 'Aktepe'],
    faq: [
      ['Gaziemir sanayi bölgesine geliyor musunuz?', 'Evet, sanayi ve iş yeri çevresi hizmet alanımızdadır.'],
      ['Gece de çekici var mı?', 'Evet, 7/24 hizmet veriyoruz.'],
    ],
  },
  {
    slug: 'balcova-cekici', town: 'Balçova', lat: 38.3900, lng: 27.0500,
    title: 'Balçova Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Balçova'da 7/24 oto çekici ve yol yardım. Teleferik, Çetin Emeç ve termal çevresinde akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Balçova ve çevresinde 7/24 acil çekici, İzmir merkeze yakın hızlı müdahale.",
    paras: [
      "Balçova merkez, Teleferik, Çetin Emeç, Onur ve Korutürk mahallelerinde oto çekici hizmeti veriyoruz. Termal ve teleferik çevresinin eğimli yollarında araç kurtarma tecrübemizle aracınızı güvenle taşıyoruz.",
      "İzmir şehir merkezine yakınlığımız sayesinde hem şehir içi hem sahil yolu arızalarına kısa sürede ulaşıyoruz. Akü, lastik, kaza ve uzun mesafe taşıma dâhil tüm hizmetler tek numarada.",
    ],
    hoods: ['Balçova Merkez', 'Teleferik', 'Çetin Emeç', 'Onur', 'Korutürk', 'Eğitim'],
    faq: [
      ['Teleferik çevresinin eğimli yollarına gelir misiniz?', 'Evet, eğimli ve dar yollarda uygun ekipmanla çalışıyoruz.'],
      ['Balçova\'dan İzmir merkeze taşıma yapıyor musunuz?', 'Evet, merkez ve tüm ilçelere taşıma yapıyoruz.'],
    ],
  },
  {
    slug: 'alacati-cekici', town: 'Alaçatı', lat: 38.2833, lng: 26.3750,
    title: 'Alaçatı Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Alaçatı'da 7/24 oto çekici ve yol yardım. Taş sokaklar, plajlar ve otoyol çevresinde akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Alaçatı ve plaj yollarında 7/24 acil çekici; yaz sezonunda bile hızlı ulaşım.",
    paras: [
      "Alaçatı merkez, taş sokaklar, Port Alaçatı, Çark ve Delikli Koy plaj yolları çevresinde oto çekici hizmeti veriyoruz. Yaz aylarının yoğun trafiğinde ve dar sokaklarında araç çıkarma konusunda tecrübeliyiz.",
      "Tatilde yolda kaldıysanız, akünüz bittiyse ya da lastiğiniz patladıysa panik yapmayın; tek numarayla yardım gönderiyoruz. Aracınızı istediğiniz servise veya konaklama adresinize güvenle ulaştırıyoruz.",
    ],
    hoods: ['Alaçatı Merkez', 'Port Alaçatı', 'Çark Plajı', 'Yeni Mecidiye', 'Hacımemiş', 'Tokmak'],
    faq: [
      ['Alaçatı taş sokaklarına çekici girer mi?', 'Evet, dar sokaklarda uygun ekipmanla aracınızı güvenle çıkarıyoruz.'],
      ['Plaj yolunda kaldım, gelir misiniz?', 'Evet, tüm plaj yolları ve çevresi hizmet alanımızdadır.'],
    ],
  },
  {
    slug: 'sigacik-cekici', town: 'Sığacık', lat: 38.1972, lng: 26.7889,
    title: 'Sığacık Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Sığacık ve Teos çevresinde 7/24 oto çekici. Marina, kale içi ve sahil yollarında akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Sığacık, marina ve Teos çevresinde 7/24 acil çekici.",
    paras: [
      "Sığacık merkez, marina, kale içi ve Teos antik kenti çevresinde oto çekici hizmeti veriyoruz. Dar ve tarihi sokaklarla sahil yollarında araç kurtarma tecrübemizle aracınızı hasarsız taşıyoruz.",
      "Marina ve kamp alanları çevresinde yolda kalan araçlara hızlıca ulaşıyoruz. Arıza, akü, lastik veya kaza — hangi durumda olursanız olun tek çağrıyla ekibimiz yola çıkıyor.",
    ],
    hoods: ['Sığacık Merkez', 'Marina', 'Teos', 'Akkum', 'Cumhuriyet', 'Mersin Alanı'],
    faq: [
      ['Sığacık marinaya çekici gelir mi?', 'Evet, marina ve kale içi çevresi hizmet alanımızdadır.'],
      ['Kamp alanına yardım gönderiyor musunuz?', 'Evet, Akkum ve çevre kamp alanlarına ulaşıyoruz.'],
    ],
  },
  {
    slug: 'gumuldur-cekici', town: 'Gümüldür', lat: 38.0731, lng: 27.0344,
    title: 'Gümüldür Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Gümüldür ve Özdere yolu çevresinde 7/24 oto çekici. Sahil bandında akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Gümüldür ve sahil hattında 7/24 acil çekici ve yol yardım.",
    paras: [
      "Gümüldür merkez, Cumhuriyet, Atatürk ve Özdere yolu çevresinde oto çekici hizmeti veriyoruz. Yoğun sahil trafiğinde ve tatil sezonunda yolda kalan araçlara hızlı müdahale ediyoruz.",
      "Sahil boyunca park hâlindeki araçlardan, ana yolda arıza yapan araçlara kadar her durumda yanınızdayız. Akü, lastik, kaza ve şehirler arası taşıma tek numarada.",
    ],
    hoods: ['Gümüldür Merkez', 'Cumhuriyet', 'Atatürk', 'Kensfaresi', 'Şaşal yolu'],
    faq: [
      ['Gümüldür sahiline ne kadar sürede gelirsiniz?', 'Konumunuza göre değişir; aradığınızda tahmini süreyi bildiriyoruz.'],
      ['Tatil sezonunda da hizmet var mı?', 'Evet, yaz dâhil 7/24 kesintisiz çalışıyoruz.'],
    ],
  },
  {
    slug: 'ozdere-cekici', town: 'Özdere', lat: 38.0500, lng: 27.1167,
    title: 'Özdere Çekici · 7/24 Oto Kurtarma | Koleş Oto Kurtarma',
    desc: "Özdere'de 7/24 oto çekici ve yol yardım. Cumhuriyet, Çukuraltı ve sahil otelleri çevresinde akü, lastik ve kaza kurtarma. " + TEL_TXT,
    lede: "Özdere ve sahil otelleri çevresinde 7/24 acil çekici.",
    paras: [
      "Özdere merkez, Cumhuriyet, Çukuraltı ve sahil otelleri çevresinde oto çekici hizmeti veriyoruz. Tatil bölgesinin yoğun sezon trafiğinde araçlarınıza zamanında ulaşıyoruz.",
      "Otel ve site çevresinde yolda kalan, aküsü biten veya lastiği patlayan araçlara hızlı yardım gönderiyoruz. Aracınızı istediğiniz servise veya adrese güvenle taşıyoruz.",
    ],
    hoods: ['Özdere Merkez', 'Cumhuriyet', 'Çukuraltı', 'Gümüşsu', 'Sahil siteleri'],
    faq: [
      ['Otel önüne çekici gelir mi?', 'Evet, otel ve site çevresi hizmet alanımızdadır.'],
      ['Aracımı İzmir\'e taşır mısınız?', 'Evet, Özdere\'den İzmir ve diğer şehirlere taşıma yapıyoruz.'],
    ],
  },
];

const SERVICES = [
  {
    slug: 'aku-takviye', name: 'Akü Takviyesi',
    title: 'Akü Takviye & Akü Bitmesi · Urla Yol Yardım | Koleş Oto Kurtarma',
    desc: "Aküsü biten aracınıza yerinde akü takviyesi ve marş yardımı. Urla ve çevresinde 7/24 yol yardım. " + TEL_TXT,
    lede: "Aküniz mi bitti? Bulunduğunuz yere gelip yerinde takviye yapıyoruz.",
    paras: [
      "Soğuk havada veya uzun süre çalışmayan araçlarda akü bitmesi en sık yaşanan sorunlardan biridir. Koleş Oto Kurtarma olarak bulunduğunuz noktaya gelip yerinde akü takviyesi (marş yardımı) yapıyor, aracınızı çalıştırıyoruz.",
      "Aküniz tamamen ömrünü tamamladıysa, en yakın noktaya güvenli taşıma veya yönlendirme konusunda da yardımcı oluyoruz. Urla, Güzelbahçe, Seferihisar ve çevre ilçelerde 7/24 ulaşılabiliriz.",
    ],
    points: ['Yerinde akü takviyesi ve marş yardımı', 'Şarjı biten araçları çalıştırma', 'Ölçüm ve yönlendirme', '7/24 hızlı müdahale'],
    faq: [
      ['Akü takviyesi için ne kadar beklerim?', 'Konumunuza göre değişir; aradığınızda tahmini süreyi hemen bildiriyoruz.'],
      ['Takviye olmazsa ne yapılır?', 'Akü ömrünü tamamladıysa aracınızı çekiciyle en yakın uygun noktaya taşıyoruz.'],
    ],
  },
  {
    slug: 'lastik-degistirme', name: 'Lastik Değiştirme',
    title: 'Lastik Değiştirme & Patlak Lastik Yol Yardım | Koleş Oto Kurtarma',
    desc: "Patlak veya inen lastiğinizi yol kenarında değiştiriyoruz; stepne yoksa aracı en yakın lastikçiye taşıyoruz. Urla 7/24. " + TEL_TXT,
    lede: "Lastiğiniz mi patladı? Yol kenarında stepneyi takıyor veya aracı taşıyoruz.",
    paras: [
      "Yolda lastik patlaması can sıkıcıdır; özellikle güvenli olmayan bir noktada kaldıysanız hızlı yardım gerekir. Ekibimiz bulunduğunuz yere gelerek stepnenizi güvenle takar, aracınızı yola hazır hâle getirir.",
      "Stepneniz yoksa veya jant/lastik hasarı büyükse, aracınızı en yakın lastikçiye ya da istediğiniz servise çekiciyle taşıyoruz. Urla ve çevre ilçelerde 7/24 hizmet veriyoruz.",
    ],
    points: ['Yol kenarında stepne takma', 'Patlak / inen lastik yardımı', 'Stepne yoksa lastikçiye taşıma', 'Gece dâhil 7/24 müdahale'],
    faq: [
      ['Stepnem yok, yine de gelir misiniz?', 'Evet. Stepne yoksa aracınızı en yakın lastikçiye çekiciyle taşıyoruz.'],
      ['Otoyolda lastik patladı, güvenli mi?', 'Aracınızın gerisinde, bariyer dışında bekleyin; en kısa sürede yanınıza geliyoruz.'],
    ],
  },
  {
    slug: 'kaza-kurtarma', name: 'Kaza Kurtarma',
    title: 'Kaza Kurtarma & Hasarlı Araç Taşıma | Koleş Oto Kurtarma',
    desc: "Kaza sonrası hasarlı araç kurtarma ve güvenli taşıma. Urla ve çevresinde 7/24 acil oto kurtarma. " + TEL_TXT,
    lede: "Kaza mı yaptınız? Hasarlı aracınızı güvenle kurtarıp taşıyoruz.",
    paras: [
      "Kaza anı stresli ve tehlikelidir. Önce güvenliğinizi alın; ardından bizi arayın. Hasarlı, hareket edemeyen veya yoldan çıkan aracınızı uygun ekipmanla, ek hasar vermeden kurtarıp güvenle taşıyoruz.",
      "Aracınızı anlaştığınız servise, otoparka ya da istediğiniz adrese ulaştırıyoruz. Urla, Güzelbahçe, Seferihisar, Çeşme ve çevre yollarında 7/24 kaza kurtarma desteği veriyoruz.",
    ],
    points: ['Hasarlı ve hareketsiz araç kurtarma', 'Yoldan çıkan araç kurtarma', 'İstediğiniz servise / adrese taşıma', 'Olay yerine hızlı ulaşım'],
    faq: [
      ['Kaza sonrası aracımı nereye taşırsınız?', 'İstediğiniz servise, otoparka veya adrese taşıyoruz.'],
      ['Aracım yoldan çıktı, kurtarır mısınız?', 'Evet, şarampol ve zorlu zeminlerdeki araçlar için kurtarma yapıyoruz.'],
    ],
  },
  {
    slug: 'sehirler-arasi-cekici', name: 'Şehirler Arası Çekici',
    title: 'Şehirler Arası Çekici & Uzun Mesafe Araç Taşıma | Koleş Oto Kurtarma',
    desc: "Şehirler arası araç taşıma ve uzun mesafe çekici. Urla / İzmir'den Türkiye geneline güvenli oto taşıma. " + TEL_TXT,
    lede: "Aracınızı şehir dışına mı taşıtacaksınız? Uzun mesafe güvenli taşıma yapıyoruz.",
    paras: [
      "Sadece acil durumlarda değil, planlı taşımalarda da yanınızdayız. Arızalı ya da çalışır durumdaki aracınızı Urla / İzmir'den başka bir şehre, ya da başka şehirden İzmir'e güvenle taşıyoruz.",
      "İkinci el alım-satım, taşınma veya uzun süre kullanılmayacak araçların nakli için sarkaç çekici ile aracınızı çizmeden taşıyoruz. Mesafeye göre fiyat bilgisini telefonda net olarak veriyoruz.",
    ],
    points: ['Şehirler arası araç taşıma', 'Arızalı veya çalışır araç nakli', 'Sarkaç çekici ile hasarsız taşıma', 'Net fiyat, önceden bilgilendirme'],
    faq: [
      ['Şehirler arası taşıma fiyatı nasıl belirlenir?', 'Mesafe ve araç tipine göre belirlenir; aradığınızda net fiyatı söylüyoruz.'],
      ['Çalışmayan aracı da taşır mısınız?', 'Evet, çalışmayan ve arızalı araçları da güvenle taşıyoruz.'],
    ],
  },
];

// Bilgilendirici rehber yazıları (üst-huni SEO: kişi henüz "çekici"
// aramadan önce bu soruları arar). Article + FAQPage şeması ile üretilir.
const BLOG = [
  {
    slug: 'yolda-kalinca-ne-yapmali', navLabel: 'Yolda kalınca ne yapmalı?',
    name: 'Yolda Kalınca Ne Yapmalı?',
    title: 'Yolda Kalınca Ne Yapmalı? 7 Adımlık Güvenlik Rehberi | Koleş Oto Kurtarma',
    desc: 'Aracınız yolda kaldığında güvenliğiniz için atmanız gereken adımlar: dörtlüler, reflektör, güvenli bekleme ve çekici çağırma.',
    date: '2026-09-09',
    lede: 'Aracınız yolda kaldıysa önce güvenlik. İşte sırasıyla yapmanız gerekenler.',
    paras: [
      'Yolda kalmak stresli olsa da doğru adımlarla hem kendinizi hem trafiği güvende tutabilirsiniz. Öncelik her zaman can güvenliğidir; araç ikinci plandadır.',
      'Aşağıdaki adımları uyguladıktan sonra bulunduğunuz konumu net biçimde belirtip bir oto kurtarma ekibini arayın. Konumunuzu paylaşmak, ekibin size en kısa sürede ulaşmasını sağlar.',
    ],
    points: [
      'Aracı mümkünse emniyet şeridine veya yol dışına alın.',
      'Dörtlü (flaşör) sinyalleri hemen yakın.',
      'Reflektörlü yeleği giyip aracı arkadan uygun mesafede reflektörle işaretleyin.',
      'Yolcuları bariyerin dışına, güvenli tarafa alın.',
      'Otoyolda aracın içinde veya önünde beklemeyin; bariyer arkasında bekleyin.',
      'Konumunuzu (yön, km, çıkış, belirgin bir işaret) not edin.',
      'Oto kurtarma ekibini arayın ve konumu net iletin.',
    ],
    faq: [
      ['Otoyolda aracın içinde bekleyebilir miyim?', 'Hayır. Otoyolda aracın içinde veya yakınında beklemek tehlikelidir; bariyerin dışına geçip güvenli mesafede bekleyin.'],
      ['Çekiciyi ararken ne söylemeliyim?', 'Konumunuzu (yön, en yakın çıkış/km, belirgin işaret), aracın durumunu ve arıza türünü söyleyin.'],
    ],
  },
  {
    slug: 'aku-bitince-ne-yapmali', navLabel: 'Akü bitince ne yapmalı?',
    name: 'Akü Bitince Ne Yapmalı?',
    title: 'Akü Bitince Ne Yapmalı? Takviye ve Çözüm Rehberi | Koleş Oto Kurtarma',
    desc: 'Aküsü biten araç nasıl çalıştırılır? Takviye kablosuyla çalıştırma adımları, dikkat edilmesi gerekenler ve ne zaman çekici gerekir.',
    date: '2026-09-09',
    lede: 'Marş basmıyor, ışıklar sönük mü? Muhtemelen akünüz bitti. İşte yapılacaklar.',
    paras: [
      'Akü bitmesi, özellikle soğuk havada ve uzun süre çalışmayan araçlarda sık görülür. Belirtiler: marşın zayıf dönmesi ya da hiç dönmemesi, gösterge ışıklarının sönük olması ve merkezi kilidin çalışmaması.',
      'Takviye (jump start) çoğu zaman sorunu çözer. Kabloları yanlış bağlamak araca zarar verebileceği için emin değilseniz bir ekip çağırmak en güvenlisidir; biz yerinde takviye yapıyoruz.',
    ],
    points: [
      'Her iki aracı da kontak kapalı konuma alın.',
      'Kırmızı kabloyu bitmiş akünün (+) ve takviye aracının (+) ucuna bağlayın.',
      'Siyah kabloyu takviye aracının (–) ucuna, diğer ucu bitmiş araçta metal bir şaseye bağlayın.',
      'Takviye aracını çalıştırın, birkaç dakika bekleyin.',
      'Aracınızı çalıştırın; çalışınca kabloları ters sırayla sökün.',
      'Çalışmıyorsa akü ömrünü tamamlamış olabilir; zorlamayın, ekip çağırın.',
    ],
    faq: [
      ['Takviye yapınca araç yine çalışmazsa?', 'Akü ömrünü tamamlamış olabilir. Bu durumda yerinde değerlendirir, gerekiyorsa aracı en yakın uygun noktaya taşırız.'],
      ['Yerinde akü takviyesi yapıyor musunuz?', 'Evet, bulunduğunuz yere gelip yerinde marş yardımı / takviye yapıyoruz.'],
    ],
  },
  {
    slug: 'kaza-sonrasi-yapilmasi-gerekenler', navLabel: 'Kaza sonrası yapılacaklar',
    name: 'Kaza Sonrası Yapılması Gerekenler',
    title: 'Kaza Sonrası Yapılması Gerekenler | Koleş Oto Kurtarma',
    desc: 'Trafik kazası sonrası güvenlik, tutanak, fotoğraf ve hasarlı aracın kurtarılması için adım adım rehber.',
    date: '2026-09-09',
    lede: 'Kaza sonrası sakin kalın ve sırayla ilerleyin. İşte yapılması gerekenler.',
    paras: [
      'Kaza anında ilk öncelik güvenlik ve sağlıktır. Yaralı varsa 112, güvenlik için 155 aranmalıdır. Maddi hasarlı kazalarda taraflar anlaşırsa tutanak birlikte tutulabilir.',
      'Hasarlı ve hareket edemeyen araçlar trafiği ve güvenliği tehlikeye atar. Belgeler ve fotoğraflar tamamlandıktan sonra aracın güvenle kurtarılması gerekir; bu aşamada oto kurtarma devreye girer.',
    ],
    points: [
      'Dörtlüleri yakın, güvenliğinizi alın; yaralı varsa 112\'yi arayın.',
      'Aracı ve hasarı farklı açılardan fotoğraflayın.',
      'Karşı tarafın plaka, sigorta ve iletişim bilgilerini alın.',
      'Kaza tespit tutanağını eksiksiz doldurun.',
      'Hasarlı araç hareket edemiyorsa oto kurtarma çağırın.',
      'Aracı anlaştığınız servise veya otoparka taşıtın.',
    ],
    faq: [
      ['Hasarlı aracı kim taşır?', 'Hareket edemeyen aracı oto kurtarma ekibi güvenle kurtarıp istediğiniz adrese taşır.'],
      ['Kaza yerine ne kadar sürede gelirsiniz?', 'Konuma göre değişir; aradığınızda tahmini süreyi hemen bildiririz.'],
    ],
  },
  {
    slug: 'cekici-cagirirken-dikkat', navLabel: 'Çekici çağırırken dikkat',
    name: 'Çekici Çağırırken Dikkat Edilmesi Gerekenler',
    title: 'Çekici Çağırırken Dikkat Edilmesi Gerekenler | Koleş Oto Kurtarma',
    desc: 'Doğru çekiciyi seçmek için: konum bildirme, fiyat, araç tipine uygun ekipman ve güvenli taşıma hakkında bilinmesi gerekenler.',
    date: '2026-09-09',
    lede: 'Doğru çekiciyi seçmek zaman ve para kazandırır. Şunlara dikkat edin.',
    paras: [
      'Her aracın taşınma şekli aynı değildir. Özellikle otomatik vitesli, dört çekerli veya düşük gövdeli araçlar için sarkaç (kayar kasa) çekici gerekir; yanlış yöntem araca zarar verebilir.',
      'Aramadan önce konumunuzu, araç tipini ve arıza türünü net iletmek hem doğru ekipmanın gelmesini hem de net fiyat almanızı sağlar.',
    ],
    points: [
      'Konumunuzu ve varış noktasını net söyleyin.',
      'Araç tipini belirtin (otomatik, 4x4, düşük gövde vb.).',
      'Fiyatı önceden ve net olarak sorun.',
      'Otomatik/4x4 araçlar için sarkaç (kayar kasa) çekici isteyin.',
      'Aracın hasarsız taşınacağından emin olun.',
      '7/24 ulaşılabilir bir numarayı tercih edin.',
    ],
    faq: [
      ['Otomatik vitesli aracım nasıl taşınır?', 'Otomatik ve 4x4 araçlar tekerlekleri yerden kesecek şekilde sarkaç (kayar kasa) çekiciyle taşınmalıdır; biz bu yöntemle taşıyoruz.'],
      ['Fiyatı önceden öğrenebilir miyim?', 'Evet, konum ve araç bilgisini aldığımızda net fiyatı telefonda söylüyoruz.'],
    ],
  },
];

// -------------------------- ŞABLONLAR --------------------------
const locLinks = LOCATIONS.map((l) => ({ href: '/' + l.slug, label: l.town + ' Çekici' }));
const svcLinks = SERVICES.map((s) => ({ href: '/' + s.slug, label: s.name }));
const blogLinks = BLOG.map((b) => ({ href: '/' + b.slug, label: b.navLabel || b.name }));

function head(p, extraLd) {
  const url = BASE + '/' + p.slug;
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: BASE + '/' },
      { '@type': 'ListItem', position: 2, name: p.crumb, item: url },
    ],
  };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const ld = [breadcrumbLd, extraLd, faqLd];
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="tr" href="${url}">
<meta name="geo.region" content="TR-35">
<meta name="geo.placename" content="${esc(p.placename)}">
<meta name="geo.position" content="${p.lat};${p.lng}">
<meta name="ICBM" content="${p.lat}, ${p.lng}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="Kemal Koleş - Koleş Oto Kurtarma">
<meta name="format-detection" content="telephone=yes">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Koleş Oto Kurtarma">
<meta property="og:image" content="${BASE}/assets/img/og-cover.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="${BASE}/assets/img/og-cover.png">
<meta name="theme-color" content="#201E1D">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23201E1D'/%3E%3Crect x='6' y='6' width='52' height='52' fill='none' stroke='%23FF6A00' stroke-width='3'/%3E%3Ctext x='32' y='42' font-family='Arial,sans-serif' font-size='30' font-weight='800' fill='%23F3F2F2' text-anchor='middle'%3EK%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Caveat:wght@600&family=Racing+Sans+One&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
${ld.filter(Boolean).map((x) => `<script type="application/ld+json">\n${JSON.stringify(x, null, 2)}\n</script>`).join('\n')}
</head>`;
}

function chrome(inner) {
  return `<body>
<a class="skip-link" href="#main-content">İçeriğe geç</a>
<div class="site-frame">
  <header class="topbar">
    <div class="topbar-grid">
      <a href="/" class="topbar-brand">
        <span class="tow-lane" aria-hidden="true"><img class="tow-drive" src="assets/img/tow-truck-icon.png" alt="" width="364" height="335" loading="eager"></span>
        <span class="brand-main">Koleş Oto Kurtarma 7/24 Çekici Hizmeti</span>
      </a>
      <button type="button" id="menuToggle" class="menu-btn" aria-label="Menüyü aç" aria-expanded="false">
        ${ICON.menuOpen}
        ${ICON.menuClose}
      </button>
    </div>
  </header>
  <nav id="mobileNav" class="mobile-nav" aria-hidden="true">
    <a href="/">Ana Sayfa</a>
    <a href="/#hizmetler">Hizmetler</a>
    <a href="/#bolgeler">Bölgeler</a>
    <a href="tel:${TEL}" class="btn btn-primary topbar-nav-call">${ICON.phone}${TEL_TXT}</a>
  </nav>
  <div id="navOverlay" class="nav-overlay"></div>
  <main id="main-content">
${inner}
  </main>
  ${footer()}
</div>
<div class="call-bar" role="region" aria-label="Hızlı iletişim">
  <a href="tel:${TEL}" class="call-bar-btn call-bar-call" data-cta="call" data-loc="sticky">${ICON.phone}Hemen Ara</a>
  <a href="${WA}" class="call-bar-btn call-bar-wa" data-cta="whatsapp" data-loc="sticky"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.46-.15-.65.15-.2.3-.74.93-.9 1.12-.17.2-.33.22-.62.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.56-.9-2.14-.23-.56-.47-.48-.65-.5h-.55c-.2 0-.5.08-.77.37-.26.3-1 1-1 2.43s1.03 2.82 1.17 3.02c.15.2 2.02 3.08 4.9 4.32.68.3 1.22.47 1.63.6.68.22 1.3.19 1.8.11.55-.08 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.2-.55-.34zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z"/></svg>WhatsApp</a>
</div>
<script src="assets/js/script.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>`;
}

function footer() {
  const li = (a) => `          <li><a href="${a.href}">${esc(a.label)}</a></li>`;
  return `<footer class="footer">
    <nav class="footer-links" aria-label="Bölge ve hizmet sayfaları">
      <div class="footer-col">
        <h2 class="footer-heading">Bölgeler</h2>
        <ul>
${locLinks.map(li).join('\n')}
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-heading">Hizmetler</h2>
        <ul>
${svcLinks.map(li).join('\n')}
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-heading">Rehber</h2>
        <ul>
${blogLinks.map(li).join('\n')}
        </ul>
      </div>
    </nav>
    <div class="footer-areas">
      <p><strong>Hizmet Bölgesi:</strong> Urla, Gülbahçe, Zeytinalanı, Zeytinler, Balıklıova, Güzelbahçe, Narlıdere, Balçova, Karabağlar, Gaziemir, Menderes, Seferihisar, Sığacık, Özdere, Gümüldür, Ürkmez, Karaburun, Mordoğan, Çeşme, Alaçatı, Bayraklı, Konak, Karşıyaka, Çiğli</p>
    </div>
    <div class="footer-bottom">
      <p>Koleş Oto Kurtarma · Kemal Koleş<br>Urla / İzmir · 7/24 oto çekici, acil çekici ve yol yardım</p>
      <p class="muted">© Koleş Oto Kurtarma. Tüm hakları saklıdır.</p>
    </div>
  </footer>`;
}

function ctaButtons(variant) {
  const cls = variant === 'light' ? 'btn btn-light' : 'btn btn-outline-light';
  return `<div class="hero-actions">
          <a href="tel:${TEL}" class="btn btn-light">${ICON.phone}<span class="btn-number">${TEL_TXT}</span></a>
          <a href="${WA}" class="${cls}">${ICON.wa}WhatsApp</a>
        </div>`;
}

function heroBlock(h1, lede) {
  return `    <section class="hero">
      <div class="hero-copy">
        <h1>${esc(h1)}</h1>
        <p class="hero-lede">${esc(lede)}</p>
        ${ctaButtons('outline')}
      </div>
    </section>`;
}

function proseBlock(paras, subHeading, listItems, faq) {
  const p = paras.map((t) => `        <p>${esc(t)}</p>`).join('\n');
  const list = listItems && listItems.length
    ? `        <h2>${esc(subHeading)}</h2>\n        <ul class="ticks">\n${listItems.map((i) => `          <li>${esc(i)}</li>`).join('\n')}\n        </ul>`
    : '';
  const faqBlock = faq.map(([q, a]) => `        <h3>${esc(q)}</h3>\n        <p>${esc(a)}</p>`).join('\n');
  return `    <section class="prose section-divider">
      <div class="prose-inner">
${p}
${list}
        <h2>Sıkça sorulan sorular</h2>
${faqBlock}
      </div>
    </section>`;
}

function regionBlock(currentSlug) {
  const links = [...locLinks, ...svcLinks]
    .filter((l) => l.href !== '/' + currentSlug)
    .map((l) => `        <a href="${l.href}">${esc(l.label)}</a>`)
    .join('\n');
  return `    <section class="section-divider">
      <h2 class="section-label">Diğer bölge ve hizmetler</h2>
      <div class="region-links">
${links}
      </div>
    </section>`;
}

function closingBlock() {
  return `    <section class="closing section-divider">
      <h2 class="closing-title">Yolda mı kaldınız? Hemen arayın.</h2>
      <div class="closing-cta">
        <a href="tel:${TEL}" class="closing-phone">${TEL_TXT}</a>
        <div class="hero-actions">
          <a href="tel:${TEL}" class="btn btn-light">${ICON.phone}Hemen Ara</a>
          <a href="${WA}" class="btn btn-light">${ICON.wa}WhatsApp</a>
        </div>
      </div>
    </section>`;
}

function breadcrumbNav(label) {
  return `    <nav class="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> › ${esc(label)}</nav>`;
}

// --------------------------- ÜRETİM ---------------------------
const written = [];

for (const l of LOCATIONS) {
  const h1 = `${l.town} Çekici — 7/24 Acil Oto Kurtarma`;
  const p = {
    slug: l.slug, title: l.title, desc: l.desc, lat: l.lat, lng: l.lng,
    placename: `${l.town}, İzmir`, crumb: `${l.town} Çekici`, faq: l.faq,
  };
  const serviceLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: 'Oto Çekici ve Yol Yardım', name: `${l.town} Oto Çekici`,
    areaServed: [{ '@type': 'Place', name: l.town }, ...l.hoods.map((h) => ({ '@type': 'Place', name: h }))],
    provider: {
      '@type': 'AutomotiveBusiness', '@id': BASE + '/#business', name: 'Koleş Oto Kurtarma', logo: BASE + '/assets/img/tow-truck-icon.png', telephone: TEL,
      url: BASE + '/', image: BASE + '/assets/img/og-cover.png',
      address: { '@type': 'PostalAddress', addressLocality: 'Urla', addressRegion: 'İzmir', addressCountry: 'TR' },
      geo: { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng },
    },
    areaDescription: l.hoods.join(', '),
  };
  const inner = [
    breadcrumbNav(`${l.town} Çekici`),
    heroBlock(h1, l.lede),
    proseBlock(l.paras, `${l.town} hizmet bölgeleri`, l.hoods, l.faq),
    regionBlock(l.slug),
    closingBlock(),
  ].join('\n');
  const html = head(p, serviceLd) + '\n' + chrome(inner) + '\n';
  writeFileSync(join(ROOT, `${l.slug}.html`), html);
  written.push(l.slug);
}

for (const s of SERVICES) {
  const h1 = s.lede.length ? `${s.name} — Urla ve Çevresinde 7/24 Yol Yardım` : s.name;
  const p = {
    slug: s.slug, title: s.title, desc: s.desc, lat: 38.3236, lng: 26.7656,
    placename: 'Urla, İzmir', crumb: s.name, faq: s.faq,
  };
  const serviceLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: s.name, name: s.name,
    areaServed: { '@type': 'Place', name: 'Urla ve çevresi (İzmir)' },
    provider: {
      '@type': 'AutomotiveBusiness', '@id': BASE + '/#business', name: 'Koleş Oto Kurtarma', logo: BASE + '/assets/img/tow-truck-icon.png', telephone: TEL,
      url: BASE + '/', image: BASE + '/assets/img/og-cover.png',
      address: { '@type': 'PostalAddress', addressLocality: 'Urla', addressRegion: 'İzmir', addressCountry: 'TR' },
    },
  };
  const inner = [
    breadcrumbNav(s.name),
    heroBlock(h1, s.lede),
    proseBlock(s.paras, 'Neler yapıyoruz?', s.points, s.faq),
    regionBlock(s.slug),
    closingBlock(),
  ].join('\n');
  const html = head(p, serviceLd) + '\n' + chrome(inner) + '\n';
  writeFileSync(join(ROOT, `${s.slug}.html`), html);
  written.push(s.slug);
}

for (const b of BLOG) {
  const p = {
    slug: b.slug, title: b.title, desc: b.desc, lat: 38.3236, lng: 26.7656,
    placename: 'Urla, İzmir', crumb: b.name, faq: b.faq,
  };
  const articleLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: b.name, description: b.desc,
    datePublished: b.date, dateModified: b.date,
    image: BASE + '/assets/img/og-cover.png',
    mainEntityOfPage: BASE + '/' + b.slug,
    author: { '@type': 'Organization', name: 'Koleş Oto Kurtarma' },
    publisher: {
      '@type': 'Organization', name: 'Koleş Oto Kurtarma',
      logo: { '@type': 'ImageObject', url: BASE + '/assets/img/tow-truck-icon.png' },
    },
  };
  const inner = [
    breadcrumbNav(b.name),
    heroBlock(b.name, b.lede),
    proseBlock(b.paras, 'Adım adım', b.points, b.faq),
    regionBlock(b.slug),
    closingBlock(),
  ].join('\n');
  const html = head(p, articleLd) + '\n' + chrome(inner) + '\n';
  writeFileSync(join(ROOT, `${b.slug}.html`), html);
  written.push(b.slug);
}

// ---- 404 sayfası (indexlenmez, sitemap'e girmez) ----
{
  const head404 = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sayfa bulunamadı (404) | Koleş Oto Kurtarma</title>
<meta name="robots" content="noindex, follow">
<meta name="theme-color" content="#201E1D">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23201E1D'/%3E%3Crect x='6' y='6' width='52' height='52' fill='none' stroke='%23FF6A00' stroke-width='3'/%3E%3Ctext x='32' y='42' font-family='Arial,sans-serif' font-size='30' font-weight='800' fill='%23F3F2F2' text-anchor='middle'%3EK%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=Caveat:wght@600&family=Racing+Sans+One&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
</head>`;
  const inner404 = [
    breadcrumbNav('Sayfa bulunamadı'),
    heroBlock('Sayfa bulunamadı (404)', 'Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ana sayfaya dönebilir ya da hemen bizi arayabilirsiniz.'),
    regionBlock(''),
    closingBlock(),
  ].join('\n');
  writeFileSync(join(ROOT, '404.html'), head404 + '\n' + chrome(inner404) + '\n');
}

// ---- sitemap.xml (ana sayfa + tüm üretilen sayfalar) ----
const today = new Date().toISOString().slice(0, 10);
const urls = ['', ...written.map((s) => s)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${BASE}/${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);

console.log(`Üretildi: ${written.length} sayfa + sitemap.xml`);
console.log(written.map((s) => '  /' + s).join('\n'));
