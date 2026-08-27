const checked = '2026-08-27'
const sourceName = 'Telefonika Ghana'

const make = (id, name, brand, category, price, image, extra = {}) => ({
  id,
  name,
  brand,
  category,
  price,
  image,
  visual: category === 'Audio' ? 'headphones' : category === 'Phones' || category === 'Tablets' ? 'phone' : category === 'Gaming' ? 'controller' : 'powerbank',
  accent: '#f5c400',
  color: 'As shown',
  description: extra.description || `${category} product checked against current Ghana retail listings.`,
  specs: [],
  sourceName,
  priceChecked: checked,
  ...extra
})

export const extraProducts2 = [
  make('apple-airpods-4', 'Apple AirPods 4 Wireless Earbuds', 'Apple', 'Audio', 2190, 'https://telefonika.com/cdn/shop/files/Apple-Airpods-4.jpg?v=1772725358&width=720', { badge: 'New' }),
  make('apple-airpods-4-anc', 'Apple AirPods 4 with Active Noise Cancellation', 'Apple', 'Audio', 2990, 'https://telefonika.com/cdn/shop/files/Apple-Airpods-4_b40f240c-222d-46fb-b48e-c4179ee787d0.jpg?v=1770223012&width=720', { badge: 'ANC' }),
  make('apple-earpods-usbc', 'Apple EarPods USB-C', 'Apple', 'Audio', 390, 'https://telefonika.com/cdn/shop/files/MTJY3-Apple-EarPods-USB-C.jpg?v=1769523732&width=720'),
  make('apple-pencil-pro-2024', 'Apple Pencil Pro 2024', 'Apple', 'Accessories', 1990, 'https://telefonika.com/cdn/shop/files/MX2D3-APPLE-PENCIL-PRO.png?v=1769522349&width=720'),
  make('apple-ipad-11-a16-cellular', 'Apple iPad 11-inch A16 Wi-Fi + Cellular', 'Apple', 'Tablets', 8590, 'https://telefonika.com/cdn/shop/files/iPad-11-A16.jpg?v=1769525226&width=720', { priceFrom: true }),
  make('apple-ipad-mini-a17-5g', 'Apple iPad Mini A17 5G', 'Apple', 'Tablets', 9700, 'https://telefonika.com/cdn/shop/files/IPADMINIA17128GY.jpg?v=1769522238&width=500', { priceFrom: true }),
  make('apple-iphone-13-128gb', 'Apple iPhone 13 128GB', 'Apple', 'Phones', 4790, 'https://telefonika.com/cdn/shop/files/iphone-13-grey.jpg?v=1783987162&width=600', { oldPrice: 5990, badge: 'Sale' }),
  make('apple-homepod-2', 'Apple HomePod 2', 'Apple', 'Smart Home', 6900, 'https://telefonika.com/cdn/shop/files/Apple-MQJ73-Homepod-2-Midnight.jpg?v=1758045932&width=720'),
  make('apple-airpods-max', 'Apple AirPods Max', 'Apple', 'Audio', 10900, 'https://telefonika.com/cdn/shop/files/AirPods-Max.jpg?v=1772037798&width=720', { badge: 'Premium' }),
  make('apple-watch-magnetic-cable-usbc', 'Apple Watch Magnetic Charging Cable USB-C 1m', 'Apple', 'Accessories', 590, 'https://telefonika.com/cdn/shop/files/MT0H3-APPLE-WATCH-Magnetic-Charing-Cable-1m-USB-C.jpg?v=1758048570&width=720'),

  make('sony-ult-field-1', 'Sony ULT Field 1 Wireless Portable Speaker', 'Sony', 'Audio', 1790, 'https://telefonika.com/cdn/shop/files/SONY-SRSULT10-BLACK.jpg?v=1772699729&width=720'),
  make('sony-wh-ch720n', 'Sony WH-CH720N Wireless Noise Cancelling Headphones', 'Sony', 'Audio', 1950, 'https://telefonika.com/cdn/shop/files/Sony-WH-CH720NLCE-Wireless-Headphones-01.jpg?v=1772703322&width=720'),
  make('sony-wf-c510', 'Sony WF-C510 Truly Wireless Earbuds', 'Sony', 'Audio', 990, 'https://telefonika.com/cdn/shop/files/SONY-WF-C510-BLACK.jpg?v=1772702969&width=720'),
  make('sony-wh-ult900', 'Sony WH-ULT900 Noise Cancelling Headphones', 'Sony', 'Audio', 2790, 'https://telefonika.com/cdn/shop/files/SONY-WH-ULT900-BC-WL-NOISE-CANCELLING-ULT-Power-Sound-Headp.jpg?v=1772700324&width=720'),
  make('sony-wf-c700n', 'Sony WF-C700N Wireless Noise Cancelling Earbuds', 'Sony', 'Audio', 1890, 'https://telefonika.com/cdn/shop/files/Sony-WF-C700N-Truly-Wireless-Noise-Canceling-in-Ear-Bluetooth-Earbud-Headphones.jpg?v=1772700942&width=720'),

  make('jbl-bar-1300-m2', 'JBL Bar 1300 M2 Dolby Atmos Soundbar', 'JBL', 'Audio', 22990, 'https://telefonika.com/cdn/shop/files/JBLBar1300M2Black.png?v=1772723839&width=500', { badge: 'Premium' }),
  make('jbl-bar-500-m2', 'JBL Bar 500 M2 Soundbar with Wireless Subwoofer', 'JBL', 'Audio', 8890, 'https://telefonika.com/cdn/shop/files/JBL-BAR-500-M2-BLACK.jpg?v=1772723888&width=720'),
  make('jbl-grip', 'JBL Grip Portable Bluetooth Speaker', 'JBL', 'Audio', 1490, 'https://telefonika.com/cdn/shop/files/JBLGripBlack.jpg?v=1763023824&width=500'),
  make('jbl-wave-beam-2', 'JBL Wave Beam 2 True Wireless Earbuds', 'JBL', 'Audio', 1090, 'https://telefonika.com/cdn/shop/files/JBL-Wave-Beam-2.jpg?v=1758035681&width=720'),
  make('jbl-tune-680nc', 'JBL Tune 680NC Wireless Noise Cancelling Headphones', 'JBL', 'Audio', 1290, 'https://telefonika.com/cdn/shop/files/JBLT680OVEREARBEG.jpg?v=1778101585&width=500'),
  make('jbl-sense-lite', 'JBL Sense Lite True Wireless Open Earbuds', 'JBL', 'Audio', 1490, 'https://telefonika.com/cdn/shop/files/JBLSenseLiteBlue.jpg?v=1769525889&width=500'),
  make('jbl-partybox-520', 'JBL PartyBox 520 Portable Party Speaker', 'JBL', 'Audio', 9890, 'https://telefonika.com/cdn/shop/files/JBL-PartyBox-520.jpg?v=1772722337&width=720')
]
