import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { IApplication } from '~/types/application'
import type { IInfo } from '~/types/components/info'

export const personalInfo = (user: any): IInfo[] => {
  const { t } = useI18n()
  const genderColorClass = user?.gender === 'male' ? 'blue' : 'pink'

  const genderInfo = user?.gender
    ? {
        label: 'gender',
        value: t(user.gender),
        valueClass: 'gap-2',
        prefixValue: `<i class="text-xl leading-5 ${`icon-user-${user?.gender}`} text-${genderColorClass}" />`,
      }
    : {
        label: 'gender',
        value: '-',
      }
  return [
    {
      label: 'birth_date',
      value: user?.birth_date
        ? dayjs(user?.birth_date).format('DD.MM.YYYY')
        : '-',
    },
    genderInfo,
    {
      label: 'citizenship',
      value: user?.country_name ?? '-',
    },
    {
      label: 'family_status',
      value: user?.marital_status_id
        ? t(`marital_status.${user?.marital_status_id}`)
        : '-',
    },
    {
      label: 'passport_series_number',
      value: user?.passport_number ?? '-',
    },
    {
      label: 'address',
      value: user?.address ?? '-',
    },
  ]
}

export const contactInfo = (user: any): IInfo[] => {
  return [
    {
      label: 'phone',
      suffixLabel: `<i class="text-base leading-4 text-red" />`,
      value: user?.phone ? phoneNumberFormatter(user.phone) : '-',
    },
    {
      label: 'email',
      labelClass: 'gap-1',
      suffixLabel: `<i class="icon-info text-base leading-4 text-red" />`,
      value:
        user?.email ?? user.user_email ? user?.email ?? user.user_email : '-',
      valueClass: 'gap-1 !items-end',
    },
    {
      label: 'telegram',
      value: user?.telegram ?? '-',
      prefixValue: `<span class="icon-telegramm text-2xl leading-5 text-blue" />`,
    },
    {
      label: 'whatsapp',
      value: user?.whatsapp ?? '-',
      valueClass: 'gap-2',
      prefixValue: `<span class="icon-whatsapp text-2xl leading-5 text-green" />`,
    },
    {
      label: 'Instagram',
      value: user?.instagram ?? '-',
      valueClass: 'gap-2',
      prefixValue: `<span class="icon-instagramm text-2xl leading-5 text-primary" />`,
    },
    {
      label: 'Facebook',
      value: user?.facebook ?? '-',
      prefixValue: `<span class="icon-facebook text-2xl leading-5 text-blue" />`,
    },
  ]
}

export const eduSkills = (skills: any): IInfo[][] => {
  const { t } = useI18n()
  return skills?.map((skill: any) => [
    {
      label: t('level_education_available'),
      value: skill?.education_level_id ? skill?.education_level_id?.name : '-',
    },
    {
      label: t('country_graduated_education'),
      value: skill?.end_university_country_id?.name ?? 0,
    },
    {
      label: t('name_education_block'),
      value:
        skill?.extra_university === 'empty'
          ? skill?.end_university_id?.name ?? '-'
          : skill?.extra_university ?? '-',
    },
    {
      label: t('start_of_end'),
      value: skill?.start_year ?? '-',
    },
    {
      label: t('date_of_end'),
      value: skill?.end_year ?? '-',
    },
    {
      label: t('mother_language'),
      value: skill?.native_language_id?.name ?? '-',
    },
    {
      label: t('another_languages'),
      value: skill?.other_language_ids?.length
        ? skill?.other_language_ids?.map((l) => l.name)?.join(', ')
        : '-',
    },
  ])
}

export const ENGLISH_LEVELS = () => {
  const { t } = useI18n()
  return [
    {
      id: 1,
      name: t('english_levels.basic'),
    },
    {
      id: 2,
      name: t('english_levels.intermediate'),
    },
    {
      id: 3,
      name: t('english_levels.advanced'),
    },
  ]
}

export const whereStudy = (user: any): IInfo[] => {
  return [
    {
      label: 'country_study',
      value: user?.study_plan_degree?.name ?? '-',
    },
    {
      label: 'level_education',
      value: user?.study_plan_year ?? '-',
    },
    {
      label: 'training_program',
      value: user?.study_plan_year ?? '-',
    },
    {
      label: 'planned_year_admission',
      value: user?.study_plan_year ?? '-',
    },
    {
      label: 'item',
      value: user?.study_plan_year ?? '-',
    },
    // {
    //     label: 'program',
    //     value: 'Подготовительные отделения',
    // },
  ]
}

export const formEducation = (user: any): IInfo[] => {
  return [
    {
      label: 'serial_number',
      value: user?.study_plan_form_display ?? '-',
    },
    {
      label: 'diplomas',
      value: user?.study_plan_univer_direction?.name ?? '-',
    },
    {
      label: 'language_certificates',
      value: user?.study_plan_univer_direction?.name ?? '-',
    },
    {
      label: 'links',
      value: user?.study_plan_univer_direction?.name ?? '-',
    },
    {
      label: 'other_certificates',
      value: user?.study_plan_univer_direction?.name ?? '-',
    },
    {
      label: 'letter_of_intent',
      value: user?.letter_of_intent ?? '-',
      class: 'col-span-2',
    },
  ]
}
//
// const formLabel = (() => {
//     switch (studyPlanForm) {
//         case 1:
//             return 'Full time';
//         case 2:
//             return 'Part time';
//         case 3:
//             return 'EXtraumal';
//         case 4:
//             return 'Remote';
//         default:
//             return '-';
//     }
// }

export const motiveLetter = (user: any): IInfo => {
  return {
    label: 'letter',
    value: user?.motivational_letter ?? '-',
  }
}

export const applicationList: IApplication[] = [
  {
    title:
      'Ташкентский университет информационных технологий имени Мухаммада Аль-Хорезми',
    id: 160254,
    date: new Date().toDateString(),
    status: 'in_moderation',
    avatar: 'https://picsum.photos/200/200',
  },
  {
    title: 'Самаркандская институт экономики и сервиса ',
    id: 12332,
    date: new Date().toDateString(),
    status: 'accepted',
    avatar: 'https://picsum.photos/200/200',
  },
]

export const englishLevelsEnum = ['basic', 'intermediate', 'advanced']
