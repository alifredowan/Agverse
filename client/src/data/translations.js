export const translations = {
  en: {
    nav: {
      about: 'About',
      technology: 'Technology',
      sustainability: 'Sustainability',
      roi: 'ROI Calculator',
      proof: 'Case Studies',
      faq: 'FAQ',
      contact: 'Contact us',
      techAudit: 'Request a Tech Audit',
      skipToContent: 'Skip to main content',
    },
    hero: {
      eyebrow: 'Dubai · AgriTech',
      title: 'The Intelligence of the Earth.',
      subtitle: 'AI, robotics and drones working together to grow more food with zero waste.',
      primaryCta: 'Request a Tech Audit',
      secondaryCta: 'Explore Technology',
      scrollDown: 'Scroll to explore',
    },
    about: {
      title: 'About AGverse',
      subtitle: 'Pioneering an autonomous, zero-waste food production ecosystem designed in Dubai for the world’s most challenging climates.',
      cards: [
        {
          id: 'precision',
          title: 'Precision Farming',
          description: 'Every plant monitored and treated individually with millimeter-accurate micro-dosing and targeted nutrition.',
        },
        {
          id: 'decisions',
          title: 'Data-Driven Decisions',
          description: 'Soil, weather and crop-health data turned into clear, real-time autonomous interventions.',
        },
        {
          id: 'efficiency',
          title: 'Maximum Efficiency',
          description: 'Faster production cycles with significantly less input, maximizing tonnage per drop of water.',
        },
      ],
      statValue: '10x',
      statLabel: 'faster than traditional farming methods',
    },
    technology: {
      title: 'Our Technology',
      subtitle: 'Dark charcoal architecture powering autonomous field execution around the clock.',
      learnMore: 'Learn more',
      modalTitle: 'Technical Overview',
      modalClose: 'Close',
      items: [
        {
          id: 'ai',
          title: 'AI & Machine Learning',
          description: 'Analyzes soil chemistry, weather dynamics and crop health to predict harvest yield and recommend surgical agronomic actions before stress manifests.',
          image: '/images/ai-analysis.jpg',
          bullets: [
            'Predictive disease & fungal outbreak vectoring 72 hours prior to visible foliar symptoms.',
            'Dynamic micro-irrigation automated every 15 minutes matching evapotranspiration curves.',
            'Precision harvest yield forecasting with 98.4% verified historical accuracy.',
          ],
        },
        {
          id: 'robotics',
          title: 'Autonomous Robotics',
          description: 'Solar-powered robots for planting, mechanical weeding and harvesting, working 24/7 without diesel emissions under extreme desert heat.',
          image: '/images/robotics-field.jpg',
          bullets: [
            'Zero-emission solar drive with autonomous inductive charging stations for 24/7 continuity.',
            'Non-chemical precision laser & mechanical weeding, eliminating synthetic herbicide dependence.',
            'Tender-touch robotic arm end-effectors calibrated for fragile fruit and date harvesting.',
          ],
        },
        {
          id: 'drones',
          title: 'Advanced Drone Fleet',
          description: 'Multi-spectral sensors that map thousands of hectares and detect moisture stress, nutrient deficiency and pests early.',
          image: '/images/drone-fleet.jpg',
          bullets: [
            '6-band multispectral radiometric sensors resolving ground detail down to 1.2 cm per pixel.',
            'Weatherproof autonomous launch hives capable of operating in 48°C ambient conditions.',
            'Cloud orthomosaic synthesis generating NDVI vegetation heatmaps within 30 minutes.',
          ],
        },
      ],
    },
    stats: {
      items: [
        {
          value: 10,
          suffix: 'x',
          label: 'faster crop simulation and breeding',
        },
        {
          display: 'Zero',
          label: 'waste irrigation systems',
        },
        {
          display: '24/7',
          label: 'autonomous robotic monitoring',
        },
        {
          value: 2030,
          label: 'net-zero carbon target',
        },
      ],
    },
    ctaBanner: {
      headline: 'Stop guessing. Start growing with confidence.',
      subtitle: 'Unlock predictable yields and eliminate water waste with AGverse’s integrated ecosystem.',
      button: 'Request a Tech Audit for Your Farm',
    },
    sustainability: {
      title: 'Our Sustainability Promise',
      subtitle: 'Cultivating food security for arid climates without compromising our planet’s resources.',
      pillars: [
        {
          title: 'Minimal carbon footprint',
          description: 'Optimized logistics and solar-powered field automation eliminating fossil fuel reliance across farm operations.',
        },
        {
          title: 'Resource conservation',
          description: 'Up to 90% less water and fertilizer',
          note: '(target, based on pilot goals)',
          detail: 'Closed-loop micro-dosing delivers moisture directly to root zones with zero surface evaporation.',
        },
        {
          title: 'Climate resilience',
          description: 'Crops and operating systems engineered to adapt and thrive under extreme Gulf heat and saline soil conditions.',
        },
      ],
    },
    roi: {
      title: 'Interactive ROI & Savings Calculator',
      subtitle: 'Estimate the resource savings and yield gains AGverse unlocks for your acreage.',
      farmSize: 'Farm Area (Hectares)',
      cropType: 'Crop Category',
      waterCost: 'Current Water Bill (AED / yr)',
      crops: {
        dates: 'Date Palms & Arid Orchards',
        greenhouse: 'Greenhouse & Vertical Hydroponics',
        citrus: 'Citrus & Subtropical Fruits',
        fodder: 'Alfalfa & Field Forage',
      },
      results: {
        waterSaved: 'Annual Water Saved',
        laborSaved: 'Automated Labor Hours',
        yieldGain: 'Projected Yield Uplift',
        payback: 'Estimated Payback Period',
      },
      cta: 'Lock In These Savings — Request Audit',
    },
    ndviDemo: {
      title: 'Multispectral Drone Telemetry',
      subtitle: 'Simulate high-altitude aerial inspection. Switch between standard optical visual feed and NDVI calibrated plant health index.',
      modeRgb: 'Standard RGB Aerial View',
      modeNdvi: 'Multispectral NDVI Health Heatmap',
      hotspots: [
        { label: 'Canopy Density: 94%', status: 'Optimal Vigor' },
        { label: 'Moisture Gradient: Normal', status: 'Balanced Evapotranspiration' },
        { label: 'Subsurface Valve A-3', status: 'Micro-leak corrected automatically' },
      ],
    },
    caseStudies: {
      title: 'Field Proof & Regional Pilots',
      subtitle: 'Demonstrated resilience across commercial agricultural trials in the United Arab Emirates.',
      items: [
        {
          farm: 'Al Ain Desert Date Palm Pilot',
          metric: '-84% Water Waste',
          detail: 'Converted 320 hectares of desert date cultivation to closed-loop autonomous irrigation.',
        },
        {
          farm: 'Ras Al Khaimah Controlled Citadel',
          metric: '+28% Harvest Yield',
          detail: 'Autonomous drone scouting and robotic laser weeding eliminated 100% of chemical herbicide runoff.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Clear answers on deploying AGverse technology across your fields.',
      items: [
        {
          q: 'What is included in the complimentary Tech Audit?',
          a: 'Our agronomy and drone engineering team analyzes your soil salinity, historical water expenditures, satellite imagery, and crop varieties to deliver a custom ROI breakdown and autonomy roadmap within 5 business days.',
        },
        {
          q: 'How does AGverse hardware endure severe summer heat (50°C+)?',
          a: 'All AGverse field robots and drone docking hives are engineered to IP67 standards with active liquid thermal regulation and sand-deflecting dust seals tested specifically in UAE desert conditions.',
        },
        {
          q: 'Can AGverse integrate with our existing tractors and irrigation pumps?',
          a: 'Yes. Our universal IoT controller retrofits onto existing drip manifolds, pivot systems, and diesel tractors, immediately bridging legacy hardware to our AI brain.',
        },
        {
          q: 'What is the minimum farm size for deployment?',
          a: 'While our system scales to thousands of hectares, our starter clusters are optimized for farms starting from 10 hectares (or 2.5 hectares for high-density greenhouses).',
        },
      ],
    },
    contact: {
      title: 'Connect With Our Agronomy Team',
      pitch: 'Ready to transition your acreage to zero-waste autonomous production? Speak directly with our Dubai engineering team.',
      location: 'Dubai, United Arab Emirates',
      locationDetail: 'Innovation Hub, Silicon Oasis & DIFC Office',
      email: 'hello@agverse.ae',
      phone: '+971 4 800 AGVERSE',
      responseTime: 'Thanks, we’ll reply within 2 business days.',
      form: {
        fullName: 'Full Name *',
        fullNamePlaceholder: 'e.g. Tariq Al Mansoori',
        email: 'Email Address *',
        emailPlaceholder: 'tariq@farmgroup.ae',
        phone: 'Phone Number',
        phonePlaceholder: '+971 50 123 4567',
        company: 'Company / Farm Name',
        companyPlaceholder: 'e.g. Oasis Green Farms Ltd.',
        interest: 'Primary Area of Interest',
        interests: {
          audit: 'Tech Audit',
          partnership: 'Partnership',
          investment: 'Investment',
          other: 'Other',
        },
        message: 'Message / Inquiry Details *',
        messagePlaceholder: 'Tell us about your acreage, current water challenges, or crop goals...',
        submit: 'Send Message',
        submitting: 'Submitting Inquiry...',
        successTitle: 'Inquiry Received',
        scheduleMeeting: 'Or Book an Online Tech Audit Call',
      },
    },
    footer: {
      tagline: 'The Intelligence of the Earth.',
      location: 'Dubai, United Arab Emirates',
      copyright: '© 2026 AGverse. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Settings',
    },
  },
  ar: {
    nav: {
      about: 'عن المنظومة',
      technology: 'التقنيات',
      sustainability: 'الاستدامة',
      roi: 'حاسبة العائد',
      proof: 'المشاريع النموذجية',
      faq: 'الأسئلة الشائعة',
      contact: 'تواصل معنا',
      techAudit: 'طلب تدقيق تقني',
      skipToContent: 'التخطي إلى المحتوى الرئيسي',
    },
    hero: {
      eyebrow: 'دبي · التكنولوجيا الزراعية',
      title: 'ذكاء الأرض المستدام.',
      subtitle: 'الذكاء الاصطناعي والروبوتات المستقلة والطائرات المسيرة معاً لإنتاج غذاء أكثر دون أي هدر.',
      primaryCta: 'طلب تدقيق تقني لمزرعتك',
      secondaryCta: 'استكشف التقنيات',
      scrollDown: 'مرر لأسفل للاستكشاف',
    },
    about: {
      title: 'عن إيه جي فيرس (AGverse)',
      subtitle: 'منظومة رائدة طُوّرت في دبي لإدارة الإنتاج الغذائي المستقل والخالي من الهدر في أصعب البيئات المناخية.',
      cards: [
        {
          id: 'precision',
          title: 'الزراعة الدقيقة',
          description: 'مراقبة كل نبتة ومعالجتها بدقة متناهية عبر جرعات ميكروية دقيقة وتغذية مستهدفة.',
        },
        {
          id: 'decisions',
          title: 'قرارات مبنية على البيانات',
          description: 'تحويل بيانات التربة والطقس وصحة المحاصيل إلى إجراءات فورية وتلقائية متقدمة.',
        },
        {
          id: 'efficiency',
          title: 'الكفاءة القصوى',
          description: 'دورات إنتاج أسرع مع استهلاك أقل للموارد لتحقيق أعلى إنتاجية لكل قطرة ماء.',
        },
      ],
      statValue: '10x',
      statLabel: 'أسرع من أساليب الزراعة التقليدية',
    },
    technology: {
      title: 'تقنياتنا المتطورة',
      subtitle: 'بنية تشغيلية متكاملة تعمل على مدار الساعة لخدمة الأراضي الزراعية.',
      learnMore: 'اعرف المزيد',
      modalTitle: 'نظرة عامة تقنية',
      modalClose: 'إغلاق',
      items: [
        {
          id: 'ai',
          title: 'الذكاء الاصطناعي وتعلم الآلة',
          description: 'تحليل دقيق لكيمياء التربة والتقلبات الجوية وصحة المحصول للتنبؤ بالإنتاج وتحديد التدخلات المطلوبة بدقة استباقية.',
          image: '/images/ai-analysis.jpg',
          bullets: [
            'التنبؤ ببؤر الآفات والأمراض قبل 72 ساعة من ظهور الأعراض المرئية.',
            'أتمتة الري الديناميكي كل 15 دقيقة وفق معدلات التبخر ونتح النبات.',
            'توقع دقيق لكتلة الحصاد بنسبة دقة بلغت 98.4٪ في التجارب الميدانية.',
          ],
        },
        {
          id: 'robotics',
          title: 'الروبوتات الحقلية المستقلة',
          description: 'روبوتات تعمل بالطاقة الشمسية 24/7 للبذر ومكافحة الأعشاب ميكانيكياً والحصاد دون أي انبعاثات وقود.',
          image: '/images/robotics-field.jpg',
          bullets: [
            'محركات شمسية خالية من الانبعاثات مع محطات شحن استقرائي ذاتية.',
            'مكافحة دقيقة للأعشاب بالليزر الميكانيكي مما يلغي استخدام مبيدات الأعشاب.',
            'أذرع روبوتية لطيفة ومحايدة مخصصة لحصاد التمور والفواكه الرقيقة دون إتلافها.',
          ],
        },
        {
          id: 'drones',
          title: 'أسطول الطائرات المسيرة المتقدم',
          description: 'مستشعرات متعددة الأطياف تمسح مساحات شاسعة وتكشف الإجهاد المائي ونقص المغذيات مبكراً بدقة عالية.',
          image: '/images/drone-fleet.jpg',
          bullets: [
            'مستشعرات طيفية بست نطاقات ترصد تفاصيل الأرض بدقة 1.2 سم لكل بكسل.',
            'خلايا إطلاق هبوط ذاتية مقاومة للعوامل الجوية وتعمل حتى حرارة 48 درجة مئوية.',
            'معالجة سحابية فورية لخرائط إجهاد النبات (NDVI) خلال 30 دقيقة فقط من الإقلاع.',
          ],
        },
      ],
    },
    stats: {
      items: [
        {
          value: 10,
          suffix: 'x',
          label: 'أسرع في محاكاة المحاصيل وتطوير السلالات',
        },
        {
          display: 'صفر',
          label: 'هدر في شبكات الري الحديثة',
        },
        {
          display: '24/7',
          label: 'مراقبة روبوتية متواصلة دون توقف',
        },
        {
          value: 2030,
          label: 'مستهدف الوصول للحياد الكربوني التام',
        },
      ],
    },
    ctaBanner: {
      headline: 'توقف عن التخمين. وابدأ بالزراعة بثقة مطلقة.',
      subtitle: 'ارتقِ بمحصولك ووفر المياه بأعلى مستويات التحكم الرقمي المتكامل.',
      button: 'طلب تدقيق تقني لمزرعتك',
    },
    sustainability: {
      title: 'عهد الاستدامة الصارم',
      subtitle: 'تعزيز الأمن الغذائي في البيئات الجافة دون استنزاف ثروات الأرض الطبيعية.',
      pillars: [
        {
          title: 'بصمة كربونية شبه منعدمة',
          description: 'سلاسل لوجستية محسّنة وأتمتة حقلية شمسية 100٪ تستغني تماماً عن مولدات الديزل.',
        },
        {
          title: 'الحفاظ الصارم على الموارد',
          description: 'توفير حتى 90٪ من مياه الري والأسمدة',
          note: '(مستهدف معتمد على نتائج التجارب النموذجية)',
          detail: 'أنظمة ري تحت سطحي مغلقة تضخ الرطوبة لجذور النبات مباشرة دون أي تبخر سطحي.',
        },
        {
          title: 'المرونة المناخية الفائقة',
          description: 'أنظمة ومحاصيل مهيأة ومطورة للصمود في وجه حرارة الصيف الشديدة وتربة الخليج الملحية.',
        },
      ],
    },
    roi: {
      title: 'حاسبة العائد الاستثماري والتوفير',
      subtitle: 'احسب حجم التوفير المائي وزيادة الإنتاج التي تحققها منظومة إيه جي فيرس لمساحتك.',
      farmSize: 'مساحة المزرعة (هكتار)',
      cropType: 'نوع المحصول',
      waterCost: 'التكلفة السنوية الحالية للمياه (درهم/سنة)',
      crops: {
        dates: 'مزارع النخيل وأشجار الفاكهة',
        greenhouse: 'البيوت المحمية والزراعة المائية',
        citrus: 'الحمضيات والمحاصيل الشجرية',
        fodder: 'الأعلاف والبرسيم المفتوح',
      },
      results: {
        waterSaved: 'المياه الموفرة سنوياً',
        laborSaved: 'ساعات العمل المؤتمتة',
        yieldGain: 'نسبة زيادة الإنتاج المتوقعة',
        payback: 'فترة استرداد الاستثمار المقدرة',
      },
      cta: 'احجز هذا التوفير لمزرعتك — اطلب التدقيق',
    },
    ndviDemo: {
      title: 'محاكاة المسح الطيفي الجوي',
      subtitle: 'جرّب فحص الحقول من الجو. بدّل بين الكاميرا الضوئية العادية ومؤشر صحة النبات الطيفي (NDVI).',
      modeRgb: 'الصورة الجوية الطبيعية (RGB)',
      modeNdvi: 'خريطة صحة المحصول الطيفية (NDVI)',
      hotspots: [
        { label: 'كثافة المجموع الخضري: 94%', status: 'نمو مثالي' },
        { label: 'تدرج الرطوبة: معتدل', status: 'توازن النتح التام' },
        { label: 'صمام الري A-3', status: 'تم تصحيح التسريب الميكروي ذاتياً' },
      ],
    },
    caseStudies: {
      title: 'نتائج المشاريع الميدانية في الإمارات',
      subtitle: 'بيانات موثوقة من مزارع تجريبية وتجارية في دولة الإمارات العربية المتحدة.',
      items: [
        {
          farm: 'مشروع مزارع نخيل العين الصحراوية',
          metric: '-84% هدر مائي',
          detail: 'تحويل 320 هكتاراً من زراعة النخيل إلى الري الذاتي المغلق.',
        },
        {
          farm: 'مشروع البيوت المحمية برأس الخيمة',
          metric: '+28% زيادة إنتاج',
          detail: 'المسح المستمر بالدرونز والإزالة الميكانيكية للأعشاب منعا أي تسرب كيميائي للمياه الجوفية.',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة',
      subtitle: 'إجابات واضحة حول تطبيق منظومة إيه جي فيرس في حقولكم.',
      items: [
        {
          q: 'ما الذي يتضمنه التدقيق التقني المجاني؟',
          a: 'يقوم مهندسونا الزراعيون بفحص ملوحة التربة، ونفقات الري التاريخية، وصور الأقمار الصناعية لتقديم خطة أتمتة مخصصة وعائد استثماري مفصل خلال 5 أيام عمل.',
        },
        {
          q: 'كيف تتحمل معدات إيه جي فيرس حرارة الصيف الشديدة (أكثر من 50 درجة مئوية)؟',
          a: 'صُممت جميع روبوتات الحقل وخلايا الطائرات وفق معايير IP67 مع تبريد سائل نشط وعوازل للرمال مخصصة لبيئة صحراء الخليج العربي.',
        },
        {
          q: 'هل يمكن ربط المنظومة مع الجرارات ومضخات الري الحالية؟',
          a: 'نعم بالتأكيد، يتم تركيب وحدات التحكم الذكية (IoT) الخاصة بنا على شبكات الري الحالية والجرارات لتوصيلها مباشرة بمركز الذكاء الاصطناعي.',
        },
        {
          q: 'ما هو الحد الأدنى لمساحة المزرعة المؤهلة؟',
          a: 'تخدم المنظومة مساحات واسعة تصل لآلاف الهكتارات، وتبدأ حزم التدشين الأولية من 10 هكتارات (أو 2.5 هكتار للبيوت المحمية عالية الكثافة).',
        },
      ],
    },
    contact: {
      title: 'تواصل مع فريق الهندسة الزراعية',
      pitch: 'هل أنت مستعد لنقل مزرعتك إلى عصر الإنتاج المستقل الخالي من الهدر؟ تحدث مباشرة مع مهندسينا في دبي.',
      location: 'دبي، الإمارات العربية المتحدة',
      locationDetail: 'واحة دبي للسيليكون ومركز دبي المالي العالمي',
      email: 'hello@agverse.ae',
      phone: '+971 4 800 AGVERSE',
      responseTime: 'شكراً لك، سنرد عليك خلال يومي عمل.',
      form: {
        fullName: 'الاسم الكامل *',
        fullNamePlaceholder: 'مثال: طارق المنصوري',
        email: 'البريد الإلكتروني *',
        emailPlaceholder: 'tariq@farmgroup.ae',
        phone: 'رقم الهاتف',
        phonePlaceholder: '+971 50 123 4567',
        company: 'اسم الشركة أو المزرعة',
        companyPlaceholder: 'مثال: مزارع الواحة الخضراء',
        interest: 'مجال الاهتمام الرئيسي',
        interests: {
          audit: 'تدقيق تقني',
          partnership: 'شراكة تجارية',
          investment: 'فرص الاستثمار',
          other: 'أخرى',
        },
        message: 'تفاصيل الاستفسار أو المزرعة *',
        messagePlaceholder: 'أخبرنا عن مساحة مزرعتك، التحديات المائية، أو أهدافك الإنتاجية...',
        submit: 'إرسال الاستفسار',
        submitting: 'جاري الإرسال...',
        successTitle: 'تم استلام استفسارك بنجاح',
        scheduleMeeting: 'أو احجز موعد تدقيق مباشر عبر الإنترنت',
      },
    },
    footer: {
      tagline: 'ذكاء الأرض المستدام.',
      location: 'دبي، الإمارات العربية المتحدة',
      copyright: '© 2026 إيه جي فيرس (AGverse). جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      cookies: 'إعدادات ملفات تعريف الارتباط',
    },
  },
};
