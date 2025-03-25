import type {
  EducationDegrees,
  IEducationDirections,
  ImageUploader,
  IProfileFeatures,
  IUser,
  ProfileInfos,
  ProfileUpdate,
} from '~/types/profile'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    newUniversIndex: [],
    DelUniversIndex: [],
    update: [],
    add: [],
    isHaveAvatar: false,
    avatar: '',
    edulevels: [],
    lastStep: true,
    loadingProfile: false,
    profileLoader: true,
    thirdStepBtn: true,
    profileInfos: {} as ProfileInfos[],
    stepsBool: true,
    steps2Bool: false,
    all_University: [],
    profileUpdate: [] as ProfileUpdate[],
    educationDegrees: [] as EducationDegrees[],
    educationDirections: [] as IEducationDirections[],
    educationDegreesLoading: true,
    imageId: '',
    countriesCount: 0,
    educationSearch: '',
    directions: {
      list: [] as EducationDegrees[],
      pagination: {
        next: null as string | null,
        count: 0,
      },
      params: {
        limit: 10,
        offset: 0,
        search: undefined as string | undefined,
      },
      loading: {
        list: true,
        more: false,
      },
    },
  }),

  actions: {
    moreDirections() {
      this.directions.params.offset =
        this.directions.params.limit + this.directions.params.offset
    },

    saveProfile(profile: IProfileFeatures): Promise<IUser> {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IUser>('/cabinet/profile/save/', { body: profile })
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      })
    },

    async submitProfile(profileFeatures: IProfileFeatures) {
      return await useApi().$post('/cabinet/applications/submit/', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileFeatures),
      })
    },

    uploadProfileImage(image: File | string): Promise<ImageUploader> {
      const formData = new FormData()
      formData.append('file', image)

      return new Promise((resolve, reject) => {
        useApi()
          .$post<ImageUploader>('/common/file-upload/', {
            body: formData,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      })
    },
  },
})
