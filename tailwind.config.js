export default {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/composables/**/*.{js,ts}',
    './src/assets/**/*.css',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/app.vue',
    './src/error.vue',
  ],

  theme: {
    extend: {
      mixBlendMode: {
        'plus-lighter': 'plus-lighter',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
        screens: ['1224px'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(0deg, #e84487 0%, #eb1c70 100%)',
        'university-single':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), lightgray 50% / cover no-repeat',
      },
      colors: {
        white: '#fff',
        gray: {
          DEFAULT: '#F2F3F7',
          100: '#697583',
          200: '#E1E8F0',
          300: '#EBF0EB',
          400: '#ADADAD',
          500: '#9FAFC2',
          600: '#DEDFE3',
          700: '#CFD4D8',
        },
        red: {
          DEFAULT: 'red',
        },
        primary: {
          DEFAULT: '#D62F75',
          100: '#F24E91',
        },

        warning: {
          DEFAULT: '#F2A33A',
          100: '#FEAF46',
        },

        dark: {
          DEFAULT: '#2B2B2B',
          100: '#181818',
          200: '#1D1D1D',
        },
        orange: {
          DEFAULT: '#E94720',
        },
        blue: {
          DEFAULT: '#027BFF',
          100: '#0067FF',
        },
        'dark-blue': {
          DEFAULT: '#001C3C',
          100: '#2B2F8A',
          200: '#0D0E29',
          300: '#03151A',
          400: '#001B3B',
        },
        green: {
          DEFAULT: '#4FBD64',
          100: '#25BA39',
          200: '#31C645',
          300: '#042C3C',
          400: '#39AE41',
        },
      },

      lineHeight: {
        112: '112%',
        116: '116%',
        120: '120%',
        130: '130%',
        136: '136%',
        140: '140%',
      },
      fontSize: {
        10: '10px',
        20: '20px',
        28: '28px',
        22: '22px',
        32: '32px',
        40: '40px',
        48: '48px',
        52: '52px',
        64: '64px',
      },
      boxShadow: {
        sm: '0px 12px 32px 0px rgba(23, 31, 24, 0.04)',
        md: '0px 12px 60px 0px rgba(0, 0, 0, 0.12)',
        lg: '0px 10px 48px 0px rgba(16, 16, 16, 0.10)',
        'content-hover': '0px 12px 60px 0px rgba(0, 0, 0, 0.12)',
        'custom-select':
          '0px 268px 75px 0px rgba(50, 57, 82, 0.00), 0px 172px 69px 0px rgba(50, 57, 82, 0.01), 0px 97px 58px 0px rgba(50, 57, 82, 0.03), 0px 43px 43px 0px rgba(50, 57, 82, 0.05), 0px 11px 24px 0px rgba(50, 57, 82, 0.06)',
        'university-content':
          '0px 73px 56px 0px rgba(242, 78, 145, 0.04), 0px 33.75px 25.89px 0px rgba(242, 78, 145, 0.06), 0px 19.311px 14.814px 0px rgba(242, 78, 145, 0.07), 0px 11.722px 8.992px 0px rgba(242, 78, 145, 0.09), 0px 7.063px 5.418px 0px rgba(242, 78, 145, 0.10), 0px 3.933px 3.017px 0px rgba(242, 78, 145, 0.12), 0px 1.692px 1.298px 0px rgba(242, 78, 145, 0.16)',
        'service-card':
          '0px 560px 157px 0px rgba(162, 169, 195, 0.00), 0px 358px 143px 0px rgba(162, 169, 195, 0.01), 0px 202px 121px 0px rgba(162, 169, 195, 0.03), 0px 90px 90px 0px rgba(162, 169, 195, 0.04), 0px 22px 49px 0px rgba(162, 169, 195, 0.05)',
        tab: '0px 4px 12px -4px #9EA1AD',
        icon: '0px 73px 56px 0px rgba(242, 78, 145, 0.04), 0px 33.75px 25.89px 0px rgba(242, 78, 145, 0.06), 0px 19.311px 14.814px 0px rgba(242, 78, 145, 0.07), 0px 11.722px 8.992px 0px rgba(242, 78, 145, 0.09), 0px 7.063px 5.418px 0px rgba(242, 78, 145, 0.10), 0px 3.933px 3.017px 0px rgba(242, 78, 145, 0.12), 0px 1.692px 1.298px 0px rgba(242, 78, 145, 0.16);',
        'main-section-dropdown':
          '18px 381px 107px 0px rgba(50, 57, 82, 0.00), 11px 244px 98px 0px rgba(50, 57, 82, 0.01), 6px 137px 82px 0px rgba(50, 57, 82, 0.03), 3px 61px 61px 0px rgba(50, 57, 82, 0.05), 1px 15px 34px 0px rgba(50, 57, 82, 0.06)',
        'main-card-hover': '0px 12px 60px 0px rgba(0, 0, 0, 0.12);',
      },

      borderRadius: {
        10: '10px',
        20: '20px',
        28: '28px',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
        26: '26',
        27: '27',
        28: '28',
        29: '29',
        40: '40',
      },
    },
  },

  plugins: [],
}
