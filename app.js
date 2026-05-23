const POINTS_PER_BOTTLE = 10
const CERTIFICATE_POINTS = 500
const LANGUAGE_KEY = 'plastic_awareness_language'
const USER_KEY = 'plastic_awareness_registered_user'
const ENTRIES_KEY = 'plastic_awareness_bottle_entries'
const CERTIFICATE_KEY = 'plastic_awareness_certificate'
const IMPACT_KEY = 'plastic_awareness_impact_seen'
const SHEET_QUEUE_KEY = 'plastic_awareness_sheet_queue'
// Paste the deployed Google Apps Script Web App URL here after deploying google-sheet-web-app.gs.
const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw7yGuG-G-VOQelsv0U2pmDmv3dcSC8llJPAuKLwWvaEJnEk0kwPkJZ5FjrV42n497nvQ/exec'

const state = {
  lang: localStorage.getItem(LANGUAGE_KEY) || 'en',
  profile: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  entries: JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]'),
  certificate: JSON.parse(localStorage.getItem(CERTIFICATE_KEY) || 'null'),
  impactSeen: localStorage.getItem(IMPACT_KEY) === 'true',
  sheetQueue: JSON.parse(localStorage.getItem(SHEET_QUEUE_KEY) || '[]'),
}

const el = {
  loginView: document.querySelector('#loginView'),
  profileView: document.querySelector('#profileView'),
  dashboardView: document.querySelector('#dashboardView'),
  startRegistrationButton: document.querySelector('#startRegistrationButton'),
  signOutButton: document.querySelector('#signOutButton'),
  languageToggle: document.querySelector('#languageToggle'),
  profileForm: document.querySelector('#profileForm'),
  fullNameInput: document.querySelector('#fullNameInput'),
  phoneInput: document.querySelector('#phoneInput'),
  emailInput: document.querySelector('#emailInput'),
  bottleForm: document.querySelector('#bottleForm'),
  bottleInput: document.querySelector('#bottleInput'),
  profileAvatar: document.querySelector('#profileAvatar'),
  profileName: document.querySelector('#profileName'),
  profileEmail: document.querySelector('#profileEmail'),
  welcomeTitle: document.querySelector('#welcomeTitle'),
  bottleCount: document.querySelector('#bottleCount'),
  pointCount: document.querySelector('#pointCount'),
  remainingCount: document.querySelector('#remainingCount'),
  heroProgressFill: document.querySelector('#heroProgressFill'),
  certificateProgress: document.querySelector('#certificateProgress'),
  congratsPopup: document.querySelector('#congratsPopup'),
  congratsText: document.querySelector('#congratsText'),
  seaScene: document.querySelector('#seaScene'),
  sceneTitle: document.querySelector('#sceneTitle'),
  sceneText: document.querySelector('#sceneText'),
  viewCertificateButton: document.querySelector('#viewCertificateButton'),
  cleanupCompare: document.querySelector('#cleanupCompare'),
  achievementCard: document.querySelector('#achievementCard'),
  achievementTitle: document.querySelector('#achievementTitle'),
  achievementText: document.querySelector('#achievementText'),
  certificateSection: document.querySelector('#certificateSection'),
  certificatePreview: document.querySelector('#certificatePreview'),
  certificateName: document.querySelector('#certificateName'),
  certificateText: document.querySelector('#certificateText'),
  certificateBottles: document.querySelector('#certificateBottles'),
  certificatePoints: document.querySelector('#certificatePoints'),
  certificateDate: document.querySelector('#certificateDate'),
  certificateNumber: document.querySelector('#certificateNumber'),
  downloadCertificateButton: document.querySelector('#downloadCertificateButton'),
  celebrationOverlay: document.querySelector('#celebrationOverlay'),
  celebrationTitle: document.querySelector('#celebrationTitle'),
  celebrationText: document.querySelector('#celebrationText'),
  celebrationBottleCount: document.querySelector('#celebrationBottleCount'),
  celebrationPoints: document.querySelector('#celebrationPoints'),
  confettiBurst: document.querySelector('#confettiBurst'),
  toast: document.querySelector('#toast'),
}

const copy = {
  en: {
    brand: 'Namma Ooru Namma Poruppu',
    tagline: 'Namma Ooru Namma Poruppu',
    heroTitle: 'Namma Ooru. Namma Poruppu.',
    kural: 'Cleanliness is a public responsibility. A cleaner place begins with one responsible action.',
    articleTitle: 'Why this matters',
    articleBadge: 'Awareness article',
    articleBody:
      'Plastic thrown near beaches and water bodies can travel into the sea, where fish, turtles, birds, and other animals may eat it or become trapped in it. Using a dustbin and recording every bottle creates proof of participation and builds a cleaner public habit.',
    startRegister: 'Register now',
    scanAnimation: 'First scan animation: bottle verified.',
    firstLogin: 'First time only',
    profileTitle: 'Enter your details',
    username: 'Username',
    phone: 'Phone number',
    email: 'Email ID',
    saveContinue: 'Submit and continue',
    signOut: 'Reset user',
    verified: 'Registered volunteer',
    bottleInput: 'How many bottles did you put in the dustbin?',
    submitBottle: 'Submit bottles',
    bottles: 'Bottles collected',
    points: 'Total points',
    remaining: 'Points to 500',
    congrats: 'Congratulations!',
    achievement: 'Achievement',
    reward: 'Reward',
    certificateTitle: 'Plastic Awareness Certificate',
    certificateKicker: 'Certificate of Appreciation',
    downloadCertificate: 'Download Certificate',
    liveImpact: 'Live impact',
    viewCertificate: 'View certificate',
    certLocked: 'Certificate locked',
    certLockedBody: 'Collect 50 bottles to unlock your Plastic Awareness Certificate.',
    certUnlocked: 'Plastic Awareness Certificate achieved',
    certUnlockedBody: 'Your appraisal certificate is ready to preview and download.',
    scenePolluted: 'Plastic waste is hurting water life.',
    scenePollutedText: 'Submit your bottle action to clean the ocean scene.',
    sceneClean: 'You cleaned this place.',
    sceneCleanText: 'Sea animals are safe because of you.',
    bottleSubmitted: 'Bottle submitted',
    impactReady: 'See how your action changes the impact scene, then open your certificate progress.',
    profileSaved: 'Registration saved. Next time this website will open your dashboard directly.',
    submitSuccess: 'You saved this beach/place. You earned {points} points. Because of you, the environment is cleaner.',
    progressReady: 'Congratulations! You achieved the Plastic Awareness Certificate.',
    progressLeft: '{points} more points to unlock your certificate.',
    certNo: 'Certificate No: {number}',
    certUnlock: 'Certificate unlocks after 500 points',
    certPresented:
      'This certificate is proudly presented to {name} for protecting beaches, rivers, seas, and water animals from plastic pollution.',
  },
  ta: {
    brand: 'நம்ம ஊரு நம்ம பொறுப்பு',
    tagline: 'நம்ம ஊரு நம்ம பொறுப்பு',
    heroTitle: 'நம்ம ஊரு. நம்ம பொறுப்பு.',
    kural: 'தூய்மை ஒரு பொதுப் பொறுப்பு. ஒரு நல்ல செயலில் இருந்து சுத்தமான இடம் உருவாகும்.',
    articleTitle: 'ஏன் இது முக்கியம்',
    articleBadge: 'விழிப்புணர்வு கட்டுரை',
    articleBody:
      'கடற்கரை மற்றும் நீர்நிலைகளில் வீசப்படும் பிளாஸ்டிக் கடலுக்குச் சென்று மீன், ஆமை, பறவை போன்ற உயிரினங்களுக்கு ஆபத்தாகிறது. குப்பைத்தொட்டியை பயன்படுத்தி ஒவ்வொரு பாட்டிலையும் பதிவு செய்வது பங்கேற்பை நிரூபித்து சுத்தமான பழக்கத்தை உருவாக்கும்.',
    startRegister: 'பதிவு செய்யவும்',
    scanAnimation: 'முதல் ஸ்கேன் அனிமேஷன்: பாட்டில் உறுதிசெய்யப்பட்டது.',
    firstLogin: 'முதல் முறை மட்டும்',
    profileTitle: 'உங்கள் விவரங்களை உள்ளிடவும்',
    username: 'பயனர் பெயர்',
    phone: 'தொலைபேசி எண்',
    email: 'மின்னஞ்சல்',
    saveContinue: 'சமர்ப்பித்து தொடரவும்',
    signOut: 'பயனரை மீட்டமை',
    verified: 'பதிவு செய்த தன்னார்வலர்',
    bottleInput: 'குப்பைத்தொட்டியில் எத்தனை பாட்டில்கள் போட்டீர்கள்?',
    submitBottle: 'பாட்டில்களை சமர்ப்பிக்கவும்',
    bottles: 'சேகரிக்கப்பட்ட பாட்டில்கள்',
    points: 'மொத்த புள்ளிகள்',
    remaining: '500க்கு மீதமுள்ள புள்ளிகள்',
    congrats: 'வாழ்த்துகள்!',
    achievement: 'சாதனை',
    reward: 'வெகுமதி',
    certificateTitle: 'பிளாஸ்டிக் விழிப்புணர்வு சான்றிதழ்',
    certificateKicker: 'பாராட்டு சான்றிதழ்',
    downloadCertificate: 'சான்றிதழை பதிவிறக்கவும்',
    liveImpact: 'நேரடி தாக்கம்',
    certLocked: 'சான்றிதழ் பூட்டப்பட்டுள்ளது',
    certLockedBody: '50 பாட்டில்கள் சேகரித்து சான்றிதழை திறக்கவும்.',
    certUnlocked: 'பிளாஸ்டிக் விழிப்புணர்வு சான்றிதழ் பெற்றுவிட்டீர்கள்',
    certUnlockedBody: 'உங்கள் பாராட்டு சான்றிதழ் பதிவிறக்க தயாராக உள்ளது.',
    scenePolluted: 'பிளாஸ்டிக் கழிவு நீர்வாழ் உயிரினங்களை பாதிக்கிறது.',
    scenePollutedText: 'பாட்டில் எண்ணிக்கையை சமர்ப்பித்து கடல் காட்சியை சுத்தமாக்குங்கள்.',
    sceneClean: 'நீங்கள் இந்த இடத்தை சுத்தமாக்கினீர்கள்.',
    sceneCleanText: 'உங்களால் கடல் உயிரினங்கள் பாதுகாப்பாக உள்ளன.',
    profileSaved: 'பதிவு சேமிக்கப்பட்டது. அடுத்த முறை தளம் நேரடியாக dashboard திறக்கும்.',
    submitSuccess: 'நீங்கள் இந்த இடத்தை காப்பாற்றினீர்கள். {points} புள்ளிகள் பெற்றீர்கள். உங்களால் சூழல் சுத்தமாகிறது.',
    progressReady: 'வாழ்த்துகள்! பிளாஸ்டிக் விழிப்புணர்வு சான்றிதழை பெற்றுவிட்டீர்கள்.',
    progressLeft: 'சான்றிதழுக்கு இன்னும் {points} புள்ளிகள் தேவை.',
    certNo: 'சான்றிதழ் எண்: {number}',
    certUnlock: '500 புள்ளிகளுக்கு பிறகு சான்றிதழ் திறக்கும்',
    certPresented:
      'கடற்கரை, ஆறு, கடல் மற்றும் நீர்வாழ் உயிரினங்களை பிளாஸ்டிக் மாசிலிருந்து பாதுகாத்ததற்காக இந்த சான்றிதழ் {name} அவர்களுக்கு வழங்கப்படுகிறது.',
  },
}

Object.assign(copy.ta, {
  viewCertificate: 'சான்றிதழை பார்க்கவும்',
  bottleSubmitted: 'பாட்டில் சமர்ப்பிக்கப்பட்டது',
  impactReady: 'உங்கள் செயல் தாக்கக் காட்சியை மாற்றுகிறது. பிறகு சான்றிதழ் முன்னேற்றத்தை பார்க்கவும்.',
})

function t(key, values = {}) {
  let value = copy[state.lang][key] || copy.en[key] || key
  Object.entries(values).forEach(([name, replacement]) => {
    value = value.replace(`{${name}}`, replacement)
  })
  return value
}

function applyLanguage() {
  document.documentElement.lang = state.lang === 'ta' ? 'ta' : 'en'
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n)
  })
  el.languageToggle.textContent = state.lang === 'en' ? 'தமிழ்' : 'English'
  renderDashboard()
}

function showToast(message) {
  el.toast.textContent = message
  el.toast.classList.remove('hidden')
  window.setTimeout(() => el.toast.classList.add('hidden'), 3600)
}

function showView(view) {
  el.loginView.classList.toggle('hidden', view !== 'login')
  el.profileView.classList.toggle('hidden', view !== 'profile')
  el.dashboardView.classList.toggle('hidden', view !== 'dashboard')
  el.signOutButton.classList.toggle('hidden', !state.profile)
}

function displayName() {
  const name = state.profile?.username?.trim()
  return name || 'Your Name'
}

function totals() {
  const bottles = state.entries.reduce((sum, entry) => sum + Number(entry.bottle_count || 0), 0)
  return { bottles, points: bottles * POINTS_PER_BOTTLE }
}

function initialize() {
  setupScrollReveal()
  applyLanguage()
  if (state.profile) {
    showView('dashboard')
    renderDashboard()
    syncSheetQueue()
  } else {
    showView('login')
  }
}

function setupScrollReveal() {
  const sections = document.querySelectorAll(
    '.hero-copy, .scanner-card, .dashboard-hero, .sea-scene, .cleanup-compare-section, .achievement-card, .certificate-section, .video-section'
  )
  sections.forEach((section) => section.classList.add('reveal-on-scroll'))

  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.16 }
  )

  sections.forEach((section) => observer.observe(section))
}

function openRegistration() {
  showView('profile')
}

function resetUser() {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(ENTRIES_KEY)
  localStorage.removeItem(CERTIFICATE_KEY)
  localStorage.removeItem(IMPACT_KEY)
  localStorage.removeItem(SHEET_QUEUE_KEY)
  state.profile = null
  state.entries = []
  state.certificate = null
  state.impactSeen = false
  state.sheetQueue = []
  showView('login')
}

function saveProfile(event) {
  event.preventDefault()
  state.profile = {
    username: el.fullNameInput.value.trim(),
    phone: el.phoneInput.value.trim(),
    email: el.emailInput.value.trim(),
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(USER_KEY, JSON.stringify(state.profile))
  showToast(t('profileSaved'))
  showView('dashboard')
  renderDashboard()
}

function submitBottleCount(event) {
  event.preventDefault()
  const bottleCount = Math.max(1, Number.parseInt(el.bottleInput.value || '1', 10))
  const points = bottleCount * POINTS_PER_BOTTLE
  state.entries.unshift({
    bottle_count: bottleCount,
    points,
    createdAt: new Date().toISOString(),
  })
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(state.entries))
  queueSheetSubmission(bottleCount, points)
  maybeCreateCertificate()
  renderDashboard()
  playCleanAnimation(points, bottleCount)
}

function sheetEndpointConfigured() {
  return GOOGLE_SHEET_WEB_APP_URL.startsWith('https://script.google.com/')
}

function queueSheetSubmission(bottleCount, points) {
  const row = {
    timestamp: new Date().toISOString(),
    name: state.profile?.username || '',
    phone: state.profile?.phone || '',
    email: state.profile?.email || '',
    bottleCount,
    points,
  }

  state.sheetQueue.push(row)
  localStorage.setItem(SHEET_QUEUE_KEY, JSON.stringify(state.sheetQueue))
  syncSheetQueue()
}

async function syncSheetQueue() {
  if (!sheetEndpointConfigured() || state.sheetQueue.length === 0) return

  const pending = [...state.sheetQueue]
  const unsent = []

  for (const row of pending) {
    try {
      await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(row),
      })
    } catch (error) {
      unsent.push(row)
    }
  }

  state.sheetQueue = unsent
  localStorage.setItem(SHEET_QUEUE_KEY, JSON.stringify(state.sheetQueue))
}

function maybeCreateCertificate() {
  const { points } = totals()
  if (points < CERTIFICATE_POINTS || state.certificate) return
  state.certificate = {
    certificate_no: `ECO-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`,
    total_points: points,
    awardedAt: new Date().toISOString(),
  }
  localStorage.setItem(CERTIFICATE_KEY, JSON.stringify(state.certificate))
}

function playCleanAnimation(points, bottleCount) {
  el.congratsText.textContent = t('submitSuccess', { points })
  el.congratsPopup.classList.remove('hidden')
  showCelebration(points, bottleCount)
  el.seaScene.classList.remove('is-clean')
  el.seaScene.classList.toggle('is-clean', state.impactSeen)
  el.sceneTitle.textContent = state.impactSeen ? t('sceneClean') : t('scenePolluted')
  el.sceneText.textContent = state.impactSeen ? t('impactReady') : t('scenePollutedText')
  el.viewCertificateButton.classList.add('hidden')
  el.achievementCard.classList.add('hidden')
  el.certificateSection.classList.add('hidden')

  window.setTimeout(() => {
    el.seaScene.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 1300)

  window.setTimeout(() => {
    el.seaScene.classList.add('is-clean')
    el.sceneTitle.textContent = t('sceneClean')
    el.sceneText.textContent = t('sceneCleanText')
  }, 700)

  window.setTimeout(() => {
    state.impactSeen = true
    localStorage.setItem(IMPACT_KEY, 'true')
    el.congratsPopup.classList.add('hidden')
    el.viewCertificateButton.classList.remove('hidden')
    el.sceneText.textContent = t('impactReady')
  }, 2600)
}

function showCelebration(points, bottleCount) {
  el.celebrationTitle.textContent = t('bottleSubmitted')
  el.celebrationText.textContent = t('submitSuccess', { points })
  el.celebrationBottleCount.textContent =
    state.lang === 'ta' ? `${bottleCount} à®ªà®¾à®Ÿà¯à®Ÿà®¿à®²à¯` : `${bottleCount} ${bottleCount === 1 ? 'bottle' : 'bottles'}`
  el.celebrationPoints.textContent = state.lang === 'ta' ? `${points} à®ªà¯à®³à¯à®³à®¿à®•à®³à¯` : `${points} points`
  el.confettiBurst.innerHTML = ''

  Array.from({ length: 54 }).forEach((_, index) => {
    const piece = document.createElement('span')
    piece.style.setProperty('--angle', `${(index * 31) % 360}deg`)
    piece.style.setProperty('--distance', `${110 + (index % 9) * 18}px`)
    piece.style.setProperty('--delay', `${(index % 5) * 36}ms`)
    piece.style.setProperty('--color', ['#facc15', '#14b8a6', '#ef4444', '#3b82f6', '#22c55e', '#f97316'][index % 6])
    el.confettiBurst.append(piece)
  })

  el.celebrationOverlay.classList.remove('hidden')
  el.celebrationOverlay.classList.remove('is-leaving')
  window.setTimeout(() => el.celebrationOverlay.classList.add('is-leaving'), 1150)
  window.setTimeout(() => el.celebrationOverlay.classList.add('hidden'), 1550)
}

function revealCertificate() {
  state.impactSeen = true
  localStorage.setItem(IMPACT_KEY, 'true')
  el.achievementCard.classList.remove('hidden')
  el.certificateSection.classList.remove('hidden')
  renderDashboard()
  el.achievementCard.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function updateCleanupCompare(event) {
  if (!el.cleanupCompare) return
  const rect = el.cleanupCompare.getBoundingClientRect()
  const point = event.touches?.[0] || event
  const progress = Math.min(Math.max(((point.clientX - rect.left) / rect.width) * 100, 0), 100)
  el.cleanupCompare.classList.toggle('is-clean', progress > 50)
}

function renderDashboard() {
  if (!state.profile || !el.dashboardView || el.dashboardView.classList.contains('hidden')) return

  const { bottles, points } = totals()
  const remaining = Math.max(CERTIFICATE_POINTS - points, 0)
  const progress = Math.min((points / CERTIFICATE_POINTS) * 100, 100)
  const name = displayName()

  el.profileName.textContent = name
  el.profileEmail.textContent = state.profile.email
  el.profileAvatar.removeAttribute('src')
  el.welcomeTitle.textContent = state.lang === 'ta' ? `வணக்கம், ${name}` : `Welcome, ${name}`

  el.bottleCount.textContent = bottles
  el.pointCount.textContent = points
  el.remainingCount.textContent = remaining
  el.heroProgressFill.style.width = `${progress}%`
  el.certificateProgress.textContent =
    remaining === 0 ? t('progressReady') : t('progressLeft', { points: remaining })

  el.achievementCard.classList.toggle('is-unlocked', remaining === 0)
  el.achievementTitle.textContent = remaining === 0 ? t('certUnlocked') : t('certLocked')
  el.achievementText.textContent = remaining === 0 ? t('certUnlockedBody') : t('certLockedBody')

  el.seaScene.classList.toggle('is-clean', state.impactSeen)
  el.sceneTitle.textContent = state.impactSeen ? t('sceneClean') : t('scenePolluted')
  el.sceneText.textContent = state.impactSeen ? t('impactReady') : t('scenePollutedText')
  el.viewCertificateButton.classList.toggle('hidden', !state.impactSeen)
  el.achievementCard.classList.toggle('hidden', !state.impactSeen)
  el.certificateSection.classList.toggle('hidden', !state.impactSeen)
  el.certificateName.textContent = name
  el.certificateName.style.fontSize = certificateNameSize(name)
  el.certificateText.textContent = t('certPresented', { name })
  el.certificateBottles.textContent =
    state.lang === 'ta' ? `${bottles} பாட்டில்கள் சேகரிப்பு` : `${bottles} bottles collected`
  el.certificatePoints.textContent = state.lang === 'ta' ? `${points} புள்ளிகள்` : `${points} points`
  el.certificateNumber.textContent = state.certificate
    ? t('certNo', { number: state.certificate.certificate_no })
    : t('certUnlock')
  el.certificateDate.textContent = new Date().toLocaleDateString(state.lang === 'ta' ? 'ta-IN' : 'en-IN')
  el.downloadCertificateButton.disabled = !state.certificate
}

function certificateNameSize(name) {
  const length = name.length
  if (length > 32) return 'clamp(0.46rem, 1.9vw, 1.45rem)'
  if (length > 26) return 'clamp(0.5rem, 2.15vw, 1.65rem)'
  if (length > 20) return 'clamp(0.55rem, 2.45vw, 1.9rem)'
  if (length > 14) return 'clamp(0.62rem, 2.75vw, 2.15rem)'
  return 'clamp(0.7rem, 3.1vw, 2.45rem)'
}

async function downloadCertificate() {
  if (document.fonts?.ready) await document.fonts.ready
  const canvas = await window.html2canvas(el.certificatePreview, {
    backgroundColor: '#ffffff',
    scale: 2,
  })
  const image = canvas.toDataURL('image/png')
  const pdf = new window.jspdf.jsPDF('landscape', 'mm', 'a4')
  pdf.addImage(image, 'PNG', 0, 0, 297, 210)
  pdf.save(`${displayName().replace(/\s+/g, '-')}-plastic-awareness-certificate.pdf`)
}

function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'ta' : 'en'
  localStorage.setItem(LANGUAGE_KEY, state.lang)
  applyLanguage()
}

el.startRegistrationButton.addEventListener('click', openRegistration)
el.signOutButton.addEventListener('click', resetUser)
el.languageToggle.addEventListener('click', toggleLanguage)
el.profileForm.addEventListener('submit', saveProfile)
el.bottleForm.addEventListener('submit', submitBottleCount)
el.viewCertificateButton.addEventListener('click', revealCertificate)
el.cleanupCompare.addEventListener('pointermove', updateCleanupCompare)
el.cleanupCompare.addEventListener('pointerdown', updateCleanupCompare)
el.cleanupCompare.addEventListener('touchmove', updateCleanupCompare, { passive: true })
el.downloadCertificateButton.addEventListener('click', downloadCertificate)

initialize()
