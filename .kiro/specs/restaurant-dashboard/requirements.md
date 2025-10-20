# Requirements Document

## Introduction

Bu proje, restoran yönetimi için frontend-only bir dashboard uygulamasıdır. Uygulama, KPI kartları, gelir grafikleri, sipariş özetleri ve sipariş listesi gibi temel yönetim bileşenlerini içerir. Tüm veriler mock olarak sağlanır ve gelecekte backend entegrasyonu için hazır bir adapter katmanı bulunur.

## Glossary

- **Dashboard**: Ana yönetim paneli ekranı
- **KPI Card**: Anahtar performans göstergelerini gösteren kart bileşeni
- **Chart Card**: Grafik içeren kart bileşeni
- **API Adapter**: Backend bağlantısı için soyutlama katmanı
- **Mock Data**: Gerçek backend olmadan test için kullanılan sahte veri
- **Progress Bar**: Yüzdelik ilerleme göstergesi
- **Status Badge**: Sipariş durumunu gösteren renkli etiket
- **Data Table**: Tablo formatında veri gösterimi
- **Responsive Design**: Farklı ekran boyutlarına uyum sağlayan tasarım

## Requirements

### Requirement 1

**User Story:** Restoran yöneticisi olarak, dashboard'da temel KPI'ları görmek istiyorum, böylece işletme performansını hızlıca değerlendirebilirim.

#### Acceptance Criteria

1. THE Dashboard SHALL display four KPI cards at the top of the page
2. THE Total Menus KPI Card SHALL show the total number of menus with a dark background variant
3. THE Total Orders Today KPI Card SHALL show the current day's order count with a light background
4. THE Total Client Today KPI Card SHALL show the current day's client count with a light background
5. THE Revenue Day Ratio KPI Card SHALL show the revenue ratio with a light background
6. WHEN a KPI Card is rendered, THE Dashboard SHALL display a progress bar below the main value
7. THE Progress Bar SHALL use pastel colors (purple, black, gray tones)

### Requirement 2

**User Story:** Restoran yöneticisi olarak, gelir trendlerini görselleştirmek istiyorum, böylece finansal performansı analiz edebilirim.

#### Acceptance Criteria

1. THE Dashboard SHALL display a Revenue chart card below the KPI cards
2. THE Revenue Chart SHALL render as a line chart with area fill
3. THE Revenue Chart SHALL display two data series: Income and Expenses
4. THE Revenue Chart SHALL show monthly data from January to July on the X-axis
5. WHEN the user clicks "Monthly" button, THE Revenue Chart SHALL display monthly aggregated data
6. WHEN the user clicks "Weekly" button, THE Revenue Chart SHALL display weekly aggregated data
7. WHEN the user clicks "Today" button, THE Revenue Chart SHALL display today's data
8. THE Chart Card SHALL highlight the active period button (Monthly/Weekly/Today)

### Requirement 3

**User Story:** Restoran yöneticisi olarak, sipariş özetlerini grafik olarak görmek istiyorum, böylece sipariş trendlerini takip edebilirim.

#### Acceptance Criteria

1. THE Dashboard SHALL display an Orders Summary chart card below the KPI cards
2. THE Orders Summary Chart SHALL render as a bar chart
3. THE Orders Summary Chart SHALL display data for recent days (Jun 24-27)
4. THE Orders Summary Chart SHALL show 2-3 data series with pastel colors (black, light purple, gray)
5. WHEN the user clicks "Monthly" button, THE Orders Summary Chart SHALL display monthly aggregated data
6. WHEN the user clicks "Weekly" button, THE Orders Summary Chart SHALL display weekly aggregated data
7. WHEN the user clicks "Today" button, THE Orders Summary Chart SHALL display today's data

### Requirement 4

**User Story:** Restoran yöneticisi olarak, sipariş listesini tablo formatında görmek istiyorum, böylece detaylı sipariş bilgilerine erişebilirim.

#### Acceptance Criteria

1. THE Dashboard SHALL display an Order List table at the bottom of the page
2. THE Order List Table SHALL display columns: No, ID, Date, Customer Name, Location, Amount, Status Order, Action
3. THE Order List Table SHALL display at least 6 rows of mock order data
4. THE Status Order Column SHALL display status badges with appropriate colors
5. THE Status Badge SHALL use different colors for "New Order", "On Delivery", and "Completed" statuses
6. WHEN the user hovers over a table row, THE Order List Table SHALL highlight the row with a soft background color
7. THE Table Header SHALL display sort icons for visual consistency

### Requirement 5

**User Story:** Restoran yöneticisi olarak, uygulamayı farklı cihazlarda kullanmak istiyorum, böylece mobil, tablet ve masaüstünde sorunsuz çalışsın.

#### Acceptance Criteria

1. THE Dashboard SHALL be responsive at breakpoints: 360px, 768px, 1024px and above
2. WHEN viewport width is below 768px, THE KPI Cards SHALL display in a 1-column layout
3. WHEN viewport width is between 768px and 1024px, THE KPI Cards SHALL display in a 2x2 grid layout
4. WHEN viewport width is above 1024px, THE KPI Cards SHALL display in a 4-column layout
5. WHEN viewport width is below 768px, THE Chart Cards SHALL display in a 1-column layout
6. WHEN viewport width is above 768px, THE Chart Cards SHALL display in a 2-column layout
7. WHEN the table overflows on small screens, THE Order List Table SHALL enable horizontal scrolling

### Requirement 6

**User Story:** Geliştirici olarak, backend hazır olduğunda kolay entegrasyon yapmak istiyorum, böylece sadece adapter katmanını değiştirerek bağlantı kurabilirim.

#### Acceptance Criteria

1. THE Application SHALL implement an API Adapter layer in src/api/api.adapter.js
2. THE API Adapter SHALL export functions: getKpis(), getRevenue(period), getOrdersSummary(period), getOrders()
3. THE Application SHALL implement mock data in src/api/api.mock.js
4. THE Mock Data SHALL include: kpi metrics, revenue chart data, orders summary data, and orders list data
5. THE API Adapter SHALL read data from mock source initially
6. WHEN backend is ready, THE Developer SHALL only modify api.adapter.js to connect to real endpoints
7. THE Application SHALL NOT make real HTTP requests (no fetch/axios calls)

### Requirement 7

**User Story:** Kullanıcı olarak, modern ve temiz bir arayüz görmek istiyorum, böylece uygulamayı kullanırken rahat hissedeyim.

#### Acceptance Criteria

1. THE Application SHALL use a light theme with white cards and soft shadows
2. THE Application SHALL display a dark vertical navbar on the left side with icon menu
3. THE Application SHALL display a light header bar at the top with profile icons
4. THE Card Components SHALL have rounded corners and low elevation shadows
5. THE Application SHALL use pastel colors for progress bars and charts
6. THE Typography SHALL be clean with font sizes between 16-20px for headings
7. THE Background SHALL use very light gray/white tones (#F7F7FA)
8. THE Active Navbar Icon SHALL be highlighted with a subtle accent

### Requirement 8

**User Story:** Geliştirici olarak, yeniden kullanılabilir komponentler oluşturmak istiyorum, böylece kod modüler ve bakımı kolay olsun.

#### Acceptance Criteria

1. THE Application SHALL implement a KPI Card component in src/components/kpi-card.js
2. THE Application SHALL implement a Progress Bar component in src/components/progress-bar.js
3. THE Application SHALL implement a Chart Card component in src/components/chart-card.js
4. THE Application SHALL implement a Data Table component in src/components/data-table.js
5. THE Application SHALL implement a Status Badge component in src/components/status-badge.js
6. THE Components SHALL be reusable and accept configuration parameters
7. THE Components SHALL be located in src/components/ directory

### Requirement 9

**User Story:** Kullanıcı olarak, klavye ile uygulamayı kullanabilmek istiyorum, böylece erişilebilirlik standartlarına uygun olsun.

#### Acceptance Criteria

1. THE Application SHALL make all buttons and links keyboard accessible
2. THE Application SHALL display visible focus rings on interactive elements
3. WHEN the user presses Tab key, THE Application SHALL move focus to the next interactive element
4. WHEN the user presses Enter or Space on a button, THE Application SHALL trigger the button action
5. THE Application SHALL follow WCAG accessibility guidelines for color contrast

### Requirement 10

**User Story:** Geliştirici olarak, projeyi hızlıca başlatmak istiyorum, böylece geliştirme ortamını kolayca kurabilirim.

#### Acceptance Criteria

1. THE Project SHALL use Vite as the build tool
2. THE Project SHALL use Tailwind CSS for styling
3. THE Project SHALL use Chart.js for data visualization
4. THE Project SHALL use vanilla JavaScript (no React/Vue)
5. WHEN the developer runs "npm install", THE Project SHALL install all dependencies without errors
6. WHEN the developer runs "npm run dev", THE Application SHALL start without console errors
7. THE Project SHALL include a README.md with setup instructions and backend connection guide
