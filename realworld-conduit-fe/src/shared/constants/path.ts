const path = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  logout: '/logout',
  article: '/article',
  profile: '/profile',
  editProfile: '/profile/:id',
  details: '/article-detail/:slug',
  setting: '/setting'
} as const
export default path
