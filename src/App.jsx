import { useEffect, useState } from 'react'
import './App.css'

const rooms = [
  {
    name: 'Chambre Élégance',
    type: 'L’ESSENTIEL, EN MIEUX',
    price: '189',
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1100&q=85',
    description: 'Un cocon lumineux aux matières naturelles, pensé pour ralentir.',
    detail: '2 personnes · 28 m² · Lit king size',
  },
  {
    name: 'Suite Horizon',
    type: 'VOTRE ÉCHAPPÉE BELLE',
    price: '289',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1100&q=85',
    description: 'De l’espace, une belle lumière et une terrasse rien qu’à vous.',
    detail: '2 personnes · 42 m² · Terrasse privée',
  },
  {
    name: 'Suite Signature',
    type: 'LE GRAND ART DE VIVRE',
    price: '389',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85',
    description: 'Une adresse à part, où chaque détail invite à rester encore.',
    detail: '4 personnes · 64 m² · Salon & vue mer',
  },
]

const features = [
  { icon: 'sun', title: 'Un réveil tout doux', text: 'Petit-déjeuner local et de saison, servi jusqu’à 11 h.' },
  { icon: 'leaf', title: 'Le temps de souffler', text: 'Piscine chauffée, jardin méditerranéen et soins sur mesure.' },
  { icon: 'pin', title: 'Tout près, autrement', text: 'Les plus belles adresses du quartier, à pied ou à vélo.' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    leaf: <><path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 10-6 8-16Z" /><path d="M4 21c2-5 6-9 12-12" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    bed: <><path d="M3 19v-8m0 4h18v4M3 12V6h7v9m11 0v-4h-8" /><path d="M10 10h4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMobileBook, setShowMobileBook] = useState(false)
  const [bookingMessage, setBookingMessage] = useState('')
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const [guests, setGuests] = useState('2 voyageurs')

  useEffect(() => {
    const updateMobileBook = () => setShowMobileBook(window.scrollY > 320)
    window.addEventListener('scroll', updateMobileBook, { passive: true })
    updateMobileBook()
    return () => window.removeEventListener('scroll', updateMobileBook)
  }, [])

  const handleBooking = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const checkin = formData.get('arrival')
    const checkout = formData.get('departure')
    if (checkin && checkout && checkout <= checkin) {
      setBookingMessage('La date de départ doit être après la date d’arrivée.')
      return
    }
    setBookingMessage('Parfait ! Vos dates sont prêtes. Notre équipe vous accompagne pour choisir votre chambre.')
  }

  const handleNewsletter = (event) => {
    event.preventDefault()
    setNewsletterMessage('Merci, vous voilà dans le cercle des belles escapades.')
    event.currentTarget.reset()
  }

  return (
    <>
      <div className="announcement">Une parenthèse qui vous ressemble <span>·</span> Réservez en direct, le meilleur est ici</div>
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Hotel Strong, accueil">
          <span className="brand-mark">H<span>S</span></span>
          <span className="brand-name">HOTEL <b>STRONG</b><small>MAISON DE VOYAGEURS</small></span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} size={23} />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navigation principale">
          <a href="#maison" onClick={() => setMenuOpen(false)}>La maison</a>
          <a href="#chambres" onClick={() => setMenuOpen(false)}>Chambres & suites</a>
          <a href="#experiences" onClick={() => setMenuOpen(false)}>Expériences</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-book" href="#reservation">Réserver <Icon name="arrow" size={17} /></a>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-photo" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span /> BIENVENUE CHEZ VOUS, AILLEURS</p>
            <h1>Le luxe de<br />prendre <em>son temps.</em></h1>
            <p className="hero-copy">Une maison de caractère, des attentions sincères<br className="desktop-break" /> et cette douce sensation d’être exactement à sa place.</p>
            <a className="button button-light" href="#maison">Découvrir la maison <Icon name="arrow" size={18} /></a>
          </div>
          <div className="hero-caption"><span>43° 17' 24.0” N</span><i /> <span>5° 22' 12.0” E</span><span className="caption-place">CÔTE MÉDITERRANÉENNE</span></div>
          <div className="hero-note"><span className="note-stars">★★★★★</span><span>Un séjour inoubliable<br /><b>4,9 / 5 · 326 avis</b></span></div>
        </section>

        <section className="booking-wrap" id="reservation" aria-label="Réserver un séjour">
          <form className="booking-bar" onSubmit={handleBooking}>
            <label className="booking-field"><span className="field-label">ARRIVÉE</span><input aria-label="Date d’arrivée" name="arrival" type="date" required /></label>
            <label className="booking-field"><span className="field-label">DÉPART</span><input aria-label="Date de départ" name="departure" type="date" required /></label>
            <label className="booking-field guest-field"><span className="field-label">VOYAGEURS</span><select aria-label="Nombre de voyageurs" value={guests} onChange={(event) => setGuests(event.target.value)}><option>1 voyageur</option><option>2 voyageurs</option><option>3 voyageurs</option><option>4 voyageurs</option></select></label>
            <button type="submit" className="button button-dark">Voir les disponibilités <Icon name="arrow" size={18} /></button>
          </form>
          {bookingMessage && <p className="form-message" role="status">{bookingMessage}</p>}
          <p className="booking-footnote"><Icon name="clock" size={14} /> Meilleur tarif garanti en réservant en direct</p>
        </section>

        <section className="intro section-pad" id="maison">
          <div className="intro-side"><span className="eyebrow">L’ESPRIT STRONG</span><span className="vertical-note">SIMPLEMENT BIEN, ENSEMBLE</span></div>
          <div className="intro-copy">
            <p className="eyebrow">UNE MAISON QUI A UNE ÂME</p>
            <h2>On vient pour<br />la lumière. On reste<br />pour <em>l’atmosphère.</em></h2>
            <p className="body-copy">À Hotel Strong, l’élégance n’en fait jamais trop. La pierre blonde, le linge frais, les volets ouverts sur le soleil… Tout est pensé pour que vous n’ayez plus qu’une chose à faire : profiter.</p>
            <a className="text-link" href="#experiences">Notre façon de recevoir <Icon name="arrow" size={17} /></a>
          </div>
          <div className="intro-visual">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85" alt="Salon lumineux aux matières naturelles dans une maison de vacances" />
            <div className="photo-stamp"><span>DEPUIS</span><strong>1998</strong><span>LE GOÛT DES<br />BELLES CHOSES</span></div>
          </div>
        </section>

        <section className="rooms-section section-pad" id="chambres">
          <div className="section-heading">
            <div><p className="eyebrow">LE PLAISIR DE BIEN DORMIR</p><h2>À chacun son <em>refuge.</em></h2></div>
            <a className="text-link rooms-link" href="#reservation">Toutes nos chambres <Icon name="arrow" size={17} /></a>
          </div>
          <div className="room-grid">
            {rooms.map((room, index) => (
              <article className="room-card" key={room.name}>
                <a className="room-image" href="#reservation" aria-label={`Réserver ${room.name}`}>
                  <img src={room.image} alt={room.name} loading="lazy" />
                  <span className="room-number">0{index + 1} / 03</span>
                  <span className="room-arrow"><Icon name="arrow" size={18} /></span>
                </a>
                <div className="room-info"><p className="eyebrow">{room.type}</p><div className="room-title-line"><h3>{room.name}</h3><span>À partir de <b>{room.price} €</b><small> / nuit</small></span></div><p className="room-description">{room.description}</p><div className="room-detail"><Icon name="bed" size={17} /> {room.detail}</div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experiences">
          <div className="experience-image"><img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=85" alt="Piscine paisible entourée de transats et de verdure" loading="lazy" /></div>
          <div className="experience-content">
            <p className="eyebrow">LE TEMPS DE VIVRE</p>
            <h2>Les vacances<br />commencent quand<br /><em>vous le décidez.</em></h2>
            <p className="experience-lead">Et si vous ne faisiez rien ? Ou presque.</p>
            <div className="feature-list">{features.map((feature) => <div className="feature" key={feature.title}><span className="feature-icon"><Icon name={feature.icon} size={21} /></span><div><h3>{feature.title}</h3><p>{feature.text}</p></div></div>)}</div>
            <a className="button button-dark" href="#contact">Tout ce qu’on peut faire <Icon name="arrow" size={18} /></a>
          </div>
        </section>

        <section className="quote-section">
          <p className="eyebrow">ILS EN PARLENT MIEUX QUE NOUS</p>
          <div className="quote-stars" aria-label="5 étoiles">★★★★★</div>
          <blockquote>“Un lieu rare où l’on se sent attendu, jamais simplement accueilli. Nous sommes repartis avec l’envie de revenir.”</blockquote>
          <div className="quote-author"><span className="author-line" /> <b>Camille & Thomas</b><span>· Séjour en juin 2025</span></div>
          <div className="quote-rating"><strong>4,9</strong><span>/ 5<br />326 avis vérifiés</span></div>
        </section>

        <section className="newsletter-section" id="contact">
          <div><p className="eyebrow">UNE LETTRE QUI SENT LES VACANCES</p><h2>Quelques nouvelles<br />du <em>soleil.</em></h2><p>Nos belles adresses, des idées d’escapades et de petites attentions réservées à nos abonnés.</p></div>
          <form className="newsletter-form" onSubmit={handleNewsletter}><label className="sr-only" htmlFor="newsletter-email">Votre adresse e-mail</label><input id="newsletter-email" type="email" placeholder="Votre adresse e-mail" required /><button type="submit" aria-label="S’inscrire à la newsletter"><Icon name="arrow" size={20} /></button><small>En vous inscrivant, vous acceptez de recevoir nos nouvelles. Promis, pas trop souvent.</small>{newsletterMessage && <span className="newsletter-message" role="status">{newsletterMessage}</span>}</form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#accueil"><span className="brand-mark">H<span>S</span></span><span className="brand-name">HOTEL <b>STRONG</b><small>MAISON DE VOYAGEURS</small></span></a>
        <p>Une maison de caractère<br />au bord de la Méditerranée.</p>
        <div className="footer-contact"><a href="tel:+33491000000">+33 (0)4 91 00 00 00</a><a href="mailto:bonjour@hotelstrong.fr">bonjour@hotelstrong.fr</a></div>
        <div className="footer-links"><a href="#maison">Instagram</a><a href="#contact">Mentions légales</a><span>© Hotel Strong 2025</span></div>
      </footer>
      {showMobileBook && <a className="mobile-book" href="#reservation">Réserver mon séjour <Icon name="arrow" size={18} /></a>}
    </>
  )
}

export default App
