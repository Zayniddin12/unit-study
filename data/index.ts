import { useI18n } from 'vue-i18n'

export const whyUzbekistanData = [
  {
    title: 'Преимущества',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны, включая ее язык, музыку, кухню и искусство.',
    link: 'https://www.google.com/',
    image: '/images/fake/image-fake.png',
  },
  {
    title: 'Преимущества',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны, включая ее язык, музыку, кухню и искусство.',
    link: 'https://www.google.com/',
    image: '/images/fake/image-fake.png',
  },
  {
    title: 'Преимущества',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны, включая ее язык, музыку, кухню и искусство.',
    link: 'https://www.google.com/',
    image: '/images/fake/image-fake.png',
  },
]

export const inNumbers = (number: any) => {
  const { t } = useI18n()
  return [
    {
      title: number?.universities_count_title,
      description: number?.universities_count_description,
      count: number?.universities_count ?? 0,
      icon: 'icon-building-2',
    },
    {
      title: number?.migrant_students_title,
      description: number?.migrant_students_description,
      count: number?.migrant_students_count ?? 0,
      isK: number?.migrant_students_count ?? 0 > 1000,
      icon: 'icon-users-group',
    },
    {
      title: number?.universities_programs_count_title,
      description: number?.universities_programs_count_description,
      count: number?.universities_program ?? 0,
      icon: 'icon-ranking',
    },
  ]
}

export const reviews = [
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      '20 мая в Венеции открылась 18-я Венецианская архитектурная биеннале, на которой национальный‌ павильон Узбекистана',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста. 20 мая в Венеции открылась 18-я Венецианская архитектурная биеннале, на которой национальный‌ павильон Узбекистана',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. 20 мая в Венеции открылась 18-я Венецианская архитектурная биеннале, на которой национальный‌ павильон Узбекистана 20 мая в Венеции открылась 18-я Венецианская архитектурная биеннале, на которой национальный‌ павильон Узбекистана Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
]

export const studyInUzbekistanData = [
  {
    title: 'Олимпиады',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/olympics',
  },
  {
    title: 'Зимние и летние школы',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/winter-summer-colleges',
  },
  {
    title: 'Подготовительные отделения',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/winter-summer-colleges',
  },
  {
    title: 'Бакалавриат или специалитет',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/news/1',
  },
  {
    title: 'Магистратура',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/news/1',
  },
  {
    title: 'Аспирантура',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/news/1',
  },
]
export const NumbersOfServices = [
  {
    title: '200',
    description: 'Обучение открывает широкие карьерные возможности.',
    service: 'Университеты',
  },
  {
    title: '140',
    description: 'Обучение открывает широкие карьерные возможности.',
    service: 'Студенты за границы',
  },
  {
    title: '100',
    description: 'Обучение открывает широкие карьерные возможности.',
    service: 'Ведущие университеты',
  },
  {
    title: '260',
    description: 'Обучение открывает широкие карьерные возможности.',
    service: 'Успешные выпускники',
  },
]
export const Universities = [
  {
    image: '/images/qatar-university.svg',
    title: 'Международный университет Катара',
    location: 'Катарский университет, 2713 Доха',
    site_url: 'www.qu.edu.qa',
    id: 1,
  },
  {
    image: '/images/qatar-university.svg',
    title: 'Международный университет Катара',
    location: 'Катарский университет, 2713 Доха',
    site_url: 'www.qu.edu.qa',
    id: 2,
  },
  {
    image: '/images/qatar-university.svg',
    title: 'Международный университет Катара',
    location: 'Катарский университет, 2713 Доха',
    site_url: 'www.qu.edu.qa',
    id: 3,
  },
  {
    image: '/images/qatar-university.svg',
    title: 'Международный университет Катара',
    location: 'Катарский университет, 2713 Доха',
    site_url: 'www.qu.edu.qa',
    id: 4,
  },
  {
    image: '/images/qatar-university.svg',
    title: 'Международный университет Катара',
    location: 'Катарский университет, 2713 Доха',
    site_url: 'www.qu.edu.qa',
    id: 5,
  },
  {
    image: '/images/qatar-university.svg',
    title: 'Международный университет Катара',
    location: 'Катарский университет, 2713 Доха',
    site_url: 'www.qu.edu.qa',
    id: 6,
  },
]
export const WayOfStudents = [
  {
    id: 1,
    title: 'Сбор данных о студенте',
    subtitle:
      'Сначала собираем данные о студенте и узнаём об интересах и желаниях',
  },
  {
    id: 2,
    title: 'Сбор данных о студенте',
    subtitle:
      'Сначала собираем данные о студенте и узнаём об интересах и желаниях',
  },
  {
    id: 3,
    title: 'Сбор данных о студенте',
    subtitle:
      'Сначала собираем данные о студенте и узнаём об интересах и желаниях',
  },
  {
    id: 4,
    title: 'Сбор данных о студенте',
    subtitle:
      'Сначала собираем данные о студенте и узнаём об интересах и желаниях',
  },
  {
    id: 5,
    title: 'Сбор данных о студенте',
    subtitle:
      'Сначала собираем данные о студенте и узнаём об интересах и желаниях',
  },
  {
    id: 6,
    title: 'Сбор данных о студенте',
    subtitle:
      'Сначала собираем данные о студенте и узнаём об интересах и желаниях',
  },
  {
    id: 1,
    title: 'Сбор данных о студенте',
    subtitle:
      'Сначала собираем данные о студенте и узнаём об интересах и желаниях',
  },
  {
    id: 1,
    title: 'Сбор данных о студенте',
    subtitle:
      'Сначала собираем данные о студенте и узнаём об интересах и желаниях',
  },
]
export const OurServices = [
  {
    icon: 'detail',
    title: 'Визовая поддержка',
    description: 'Обучение зарубежом открывает широкие карьерные возможности',
  },
  {
    icon: 'briefcase',
    title: 'Работа для студентов',
    description: 'Обучение зарубежом открывает широкие карьерные возможности',
  },
  {
    icon: 'shield-check',
    title: 'Легализация документов',
    description: 'Обучение зарубежом открывает широкие карьерные возможности',
  },
]

export const Events = [
  {
    image: '/images/serviceBanner.webp',
    title: 'Образование с лучших вузах США: “Лайфхаки”',
    description:
      'Студенты поделятся своим опытом о поступлении в лучшие ВУЗы мира',
    location: 'Г. Ташкент, Узбекистан',
    time: '2024.10.11 10:30',
    id: 378,
  },
  {
    image: '/images/serviceBanner.webp',
    title: 'Образование с лучших вузах США: “Лайфхаки”',
    description:
      'Студенты поделятся своим опытом о поступлении в лучшие ВУЗы мира',
    location: 'Г. Ташкент, Узбекистан',
    time: '2024.10.09 10:30',
    id: 378,
  },
  {
    image: '/images/serviceBanner.webp',
    title: 'Образование с лучших вузах США: “Лайфхаки”',
    description:
      'Студенты поделятся своим опытом о поступлении в лучшие ВУЗы мира',
    location: 'Г. Ташкент, Узбекистан',
    time: '2024.10.11 10:30',
    id: 378,
  },
  {
    image: '/images/serviceBanner.webp',
    title: 'Образование с лучших вузах США: “Лайфхаки”',
    description:
      'Студенты поделятся своим опытом о поступлении в лучшие ВУЗы мира',
    location: 'Г. Ташкент, Узбекистан',
    time: '2024.10.11 10:30',
    id: 378,
  },
  {
    image: '/images/serviceBanner.webp',
    title: 'Образование с лучших вузах США: “Лайфхаки”',
    description:
      'Студенты поделятся своим опытом о поступлении в лучшие ВУЗы мира',
    location: 'Г. Ташкент, Узбекистан',
    time: '2024.10.11 10:30',
    id: 378,
  },
]
export const Grands = [
  {
    sum: 80000000000,
    name: 'UEA Colfuturo Partner Award (Masters)',
    time: '2024.10.11 10:30',
    university: 'University of East Anglia',
    degree: 'PHD, Master’s Degree',
  },
  {
    sum: 80000000000,
    name: 'UEA Colfuturo Partner Award (Masters)',
    time: '2024.10.11 10:30',
    university: 'University of East Anglia',
    degree: 'PHD, Master’s Degree',
  },
  {
    sum: 80000000000,
    name: 'UEA Colfuturo Partner Award (Masters)',
    time: '2024.10.11 10:30',
    university: 'University of East Anglia',
    degree: 'PHD, Master’s Degree',
  },
  {
    sum: 80000000000,
    name: 'UEA Colfuturo Partner Award (Masters)',
    time: '2024.10.11 10:30',
    university: 'University of East Anglia',
    degree: 'PHD, Master’s Degree',
  },
]
export const news = [
  {
    image: '/images/serviceBanner.webp',
    time: '2024.10.11 10:30',
    title: 'Катарский университет на северной окраине Дохи',
    description:
      'Курсы преподаются на арабском и английском языках. Студентов, поступающих в университет, иногда помещают в “Базовую программу”',
  },
  {
    image: '/images/serviceBanner.webp',
    time: '2024.10.11 10:30',
    title: 'Катарский университет на северной окраине Дохи',
    description:
      'Курсы преподаются на арабском и английском языках. Студентов, поступающих в университет, иногда помещают в “Базовую программу”',
  },
  {
    image: '/images/serviceBanner.webp',
    time: '2024.10.11 10:30',
    title: 'Катарский университет на северной окраине Дохи',
    description:
      'Курсы преподаются на арабском и английском языках. Студентов, поступающих в университет, иногда помещают в “Базовую программу”',
  },
  {
    image: '/images/serviceBanner.webp',
    time: '2024.10.11 10:30',
    title: 'Катарский университет на северной окраине Дохи',
    description:
      'Курсы преподаются на арабском и английском языках. Студентов, поступающих в университет, иногда помещают в “Базовую программу”',
  },
]

export const ContactData = [
  {
    longitude: 69.267581,
    latitude: 41.341129,
    address: 'г.Ташкент, Мирабадский район, ул. Ойбек 49',
    phone_number: '+998712007007',
    email: 'MaryamMahmudova@gmail.com',
  },
]

export const footerMenu = [
  {
    id: 1,
    title: 'company',
    type: [
      {
        id: 1,
        name: 'item',
        slug: '/universities',
      },
      {
        id: 1,
        name: 'programs',
        slug: '/programs',
      },
      {
        id: 1,
        name: 'grants',
        slug: '/grants',
      },
      {
        id: 1,
        name: 'services',
        slug: '/services',
      },
      {
        id: 1,
        name: 'news',
        slug: '/news',
      },
    ],
  },
  {
    id: 1,
    title: 'support',
    type: [
      {
        id: 1,
        name: 'contact_us_btn',
        slug: '/contact',
      },
      {
        id: 2,
        name: 'doc',
        slug: '/pages/documentation',
      },
      {
        id: 3,
        name: 'terms_of_use',
        slug: '/pages/termsofuse',
      },
      {
        id: 4,
        name: 'privacy_policy',
        slug: '/pages/privacy',
      },
    ],
  },
]

export const headerMenu = [
  {
    id: 1,
    title: 'item',
    slug: 'universities',
  },
  {
    id: 2,
    title: 'programs',
    slug: 'programs',
  },
  {
    id: 3,
    title: 'grants',
    slug: 'grants?content=4&page=1',
  },
  {
    id: 3,
    title: 'services',
    slug: 'services',
  },
  {
    id: 3,
    title: 'news',
    slug: 'news',
  },
  {
    id: 3,
    title: 'contact',
    slug: 'contact',
  },
]

export const useMaritalStatuses = () => {
  const { t } = useI18n()

  return [
    {
      id: 1,
      name: t('marital_status.Single'),
    },
    {
      id: 2,
      name: t('marital_status.Married'),
    },
    {
      id: 3,
      name: t('marital_status.Widowed'),
    },
    {
      id: 4,
      name: t('marital_status.Divorced'),
    },
    {
      id: 5,
      name: t('marital_status.Separated'),
    },
    {
      id: 6,
      name: t('marital_status.Registered'),
    },
  ]
}
