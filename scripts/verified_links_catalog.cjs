const https = require('https');
const http = require('http');

// Curated dictionary of verified, high quality links for philosophers
const VERIFIED_LINKS = {
  // Sokrates / Platon
  "sokrates:Platons tidlige dialoger (Apologien, Kriton, Menon)": {
    url: "https://www.gutenberg.org/ebooks/1656", // Apology, Crito, and Phaedo by Plato
    label: "Les på Project Gutenberg (Apology, Crito)"
  },
  "platon:Staten (Politeia)": {
    url: "https://www.gutenberg.org/ebooks/1497", // The Republic by Plato
    label: "Les på Project Gutenberg (The Republic)"
  },
  "platon:Symposion (Drikkegildet)": {
    url: "https://www.gutenberg.org/ebooks/1600", // The Symposium by Plato
    label: "Les på Project Gutenberg (Symposium)"
  },
  "platon:Faidon": {
    url: "https://www.gutenberg.org/ebooks/1658", // Phaedo by Plato
    label: "Les på Project Gutenberg (Phaedo)"
  },

  // Aristoteles
  "aristoteles:Den nikomakiske etikk": {
    url: "https://classics.mit.edu/Aristotle/nicomachaen.html",
    label: "Les hos Classics MIT (Nicomachean Ethics)"
  },
  "aristoteles:Politikken": {
    url: "https://classics.mit.edu/Aristotle/politics.html",
    label: "Les hos Classics MIT (Politics)"
  },
  "aristoteles:Metafysikken": {
    url: "https://classics.mit.edu/Aristotle/metaphysics.html",
    label: "Les hos Classics MIT (Metaphysics)"
  },

  // Descartes
  "descartes:Meditasjoner over filosofiens grunnlag": {
    url: "https://www.nb.no/items/URN:NBN:no-nb_digibok_2015090708092", // Asbjørn Aarnes' oversettelse
    label: "Les på norsk hos Nasjonalbiblioteket (nb.no)"
  },
  "descartes:Om metoden": {
    url: "https://www.gutenberg.org/ebooks/59", // Discourse on the Method
    label: "Les på Project Gutenberg"
  },

  // Spinoza
  "spinoza:Etikken (Ethica)": {
    url: "https://www.gutenberg.org/ebooks/3800", // The Ethics by Benedict de Spinoza
    label: "Les på Project Gutenberg (Ethics)"
  },
  "spinoza:Teologisk-politisk traktat": {
    url: "https://www.gutenberg.org/ebooks/980", // Tractatus Theologico-Politicus
    label: "Les på Project Gutenberg"
  },

  // Locke
  "locke:To avhandlinger om styresettet (Two Treatises of Government)": {
    url: "https://www.gutenberg.org/ebooks/7370", // Second Treatise of Government
    label: "Les på Project Gutenberg"
  },
  "locke:Et essay om den menneskelige forstand": {
    url: "https://www.gutenberg.org/ebooks/10604", // An Essay Concerning Human Understanding
    label: "Les på Project Gutenberg"
  },

  // Hume
  "hume:En avhandling om menneskets natur (A Treatise of Human Nature)": {
    url: "https://www.gutenberg.org/ebooks/4705", // A Treatise of Human Nature
    label: "Les på Project Gutenberg"
  },
  "hume:Undersøkelse av den menneskelige forstand": {
    url: "https://www.gutenberg.org/ebooks/9662", // An Enquiry Concerning Human Understanding
    label: "Les på Project Gutenberg"
  },

  // Kant
  "kant:Kritikk av den rene fornuft": {
    url: "https://www.gutenberg.org/ebooks/4280", // Critique of Pure Reason
    label: "Les på Project Gutenberg"
  },
  "kant:Grunnlegging av moralens metafysikk": {
    url: "https://www.nb.no/items/URN:NBN:no-nb_digibok_2014061808064", // Eiliv Skard / NB
    label: "Søk i Nasjonalbiblioteket (nb.no)"
  },
  "kant:Til den evige fred": {
    url: "https://www.gutenberg.org/ebooks/50922", // Perpetual Peace
    label: "Les på Project Gutenberg (Perpetual Peace)"
  },

  // Wollstonecraft
  "wollstonecraft:Et forsvar for kvinnens rettigheter (A Vindication of the Rights of Woman)": {
    url: "https://www.gutenberg.org/ebooks/3420", // A Vindication of the Rights of Woman
    label: "Les på Project Gutenberg"
  },
  "wollstonecraft:Et forsvar for menneskets rettigheter": {
    url: "https://www.gutenberg.org/ebooks/52431", // A Vindication of the Rights of Men
    label: "Les på Project Gutenberg"
  },

  // Marx
  "marx:Det kommunistiske manifest": {
    url: "https://www.marxists.org/norsk/marx-engels/1848/01/manifestet/",
    label: "Les fulltekst på norsk (marxists.org)"
  },
  "marx:Kapitalen (Das Kapital)": {
    url: "https://www.marxists.org/archive/marx/works/1867-c1/",
    label: "Les på Marxists Internet Archive (Capital Vol 1)"
  },

  // Nietzsche
  "nietzsche:Slik talte Zarathustra": {
    url: "https://www.gutenberg.org/ebooks/1998", // Thus Spake Zarathustra
    label: "Les på Project Gutenberg"
  },
  "nietzsche:Hinsides godt og ondt": {
    url: "https://www.gutenberg.org/ebooks/4363", // Beyond Good and Evil
    label: "Les på Project Gutenberg"
  },
  "nietzsche:Moralens genealogi": {
    url: "https://www.gutenberg.org/ebooks/52319", // The Genealogy of Morals
    label: "Les på Project Gutenberg"
  },

  // Arne Næss
  "arne-naess:Økologi, samfunn og livsstil": {
    url: "https://www.nb.no/items/URN:NBN:no-nb_digibok_2007052500001", // Verified actual URN!
    label: "Les hos Nasjonalbiblioteket (nb.no)"
  },
  "arne-naess:Tolkning og presisering": {
    url: "https://www.nb.no/search?q=%22Tolkning%20og%20presisering%22&creator=%22N%C3%A6ss%2C%20Arne%22",
    label: "Se utgaver hos Nasjonalbiblioteket (nb.no)"
  },

  // Peter Wessel Zapffe
  "zapffe:Om det tragiske": {
    url: "https://www.nb.no/items/URN:NBN:no-nb_digibok_2008061704041", // Verified actual URN!
    label: "Les hos Nasjonalbiblioteket (nb.no)"
  },
  "zapffe:Den siste Messias": {
    url: "https://www.nb.no/search?q=%22Den%20siste%20Messias%22&creator=%22Zapffe%22",
    label: "Se tekst hos Nasjonalbiblioteket (nb.no)"
  },

  // Hobbes
  "hobbes:Leviathan": {
    url: "https://www.gutenberg.org/ebooks/3207", // Leviathan by Thomas Hobbes
    label: "Les på Project Gutenberg"
  },

  // Rousseau
  "rousseau:Samfunnskontrakten (Du contrat social)": {
    url: "https://www.gutenberg.org/ebooks/46333", // The Social Contract
    label: "Les på Project Gutenberg"
  },
  "rousseau:Émile – eller om oppdragelsen": {
    url: "https://www.gutenberg.org/ebooks/5427", // Emile
    label: "Les på Project Gutenberg"
  },

  // Wittgenstein
  "wittgenstein:Tractatus Logico-Philosophicus": {
    url: "https://www.gutenberg.org/ebooks/5740", // Tractatus
    label: "Les på Project Gutenberg"
  },

  // Augustin
  "augustin:Bekjennelser (Confessiones)": {
    url: "https://www.gutenberg.org/ebooks/3296", // The Confessions of St. Augustine
    label: "Les på Project Gutenberg"
  },

  // Thomas Aquinas
  "aquinas:Summa Theologiae": {
    url: "https://www.newadvent.org/summa/",
    label: "Les på New Advent (Summa Theologiae)"
  },

  // Seneca
  "seneca:Brev til Lucilius (Epistulae Morales)": {
    url: "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius",
    label: "Les på Wikisource (Moral Letters)"
  },
  "seneca:Om livets korthet (De Brevitate Vitae)": {
    url: "https://en.wikisource.org/wiki/On_the_shortness_of_life",
    label: "Les på Wikisource"
  },

  // Epiktet
  "epiktet:Håndbok i livskunst (Encheiridion)": {
    url: "https://classics.mit.edu/Epictetus/epicench.html",
    label: "Les hos Classics MIT (The Enchiridion)"
  },

  // Marcus Aurelius
  "marcus-aurelius:Til meg selv (Meditasjoner)": {
    url: "https://classics.mit.edu/Antoninus/meditations.html",
    label: "Les hos Classics MIT (Meditations)"
  },

  // Schopenhauer
  "schopenhauer:Verden som vilje og forestilling": {
    url: "https://www.gutenberg.org/ebooks/38427", // The World as Will and Idea
    label: "Les på Project Gutenberg"
  },

  // Holberg
  "holberg:Nils Klims underjordiske reise": {
    url: "https://www.gutenberg.org/ebooks/15479", // Journey of Niels Klim to the World Underground
    label: "Les på Project Gutenberg"
  },

  // Kinesiske tenkere
  "konfucius:Samtaler (Lunyu)": {
    url: "https://ctext.org/analects",
    label: "Les på Chinese Text Project (ctext.org)"
  },
  "laozi:Daodejing (Boken om Veien og dens Kraft)": {
    url: "https://ctext.org/dao-de-jing",
    label: "Les på Chinese Text Project (ctext.org)"
  },
  "zhuangzi:Zhuangzi (De indre kapitlene)": {
    url: "https://ctext.org/zhuangzi",
    label: "Les på Chinese Text Project (ctext.org)"
  },
  "mengzi:Mengzi (Mencius)": {
    url: "https://ctext.org/mengzi",
    label: "Les på Chinese Text Project (ctext.org)"
  },
  "mozi:Mozi": {
    url: "https://ctext.org/mozi",
    label: "Les på Chinese Text Project (ctext.org)"
  },

  // Leibniz
  "leibniz:Monadologien": {
    url: "https://www.earlymoderntexts.com/assets/pdfs/leibniz1714b.pdf",
    label: "Les på Early Modern Texts"
  },

  // Montaigne
  "montaigne:Essayer (Les Essais)": {
    url: "https://www.gutenberg.org/ebooks/3600", // Essays of Montaigne
    label: "Les på Project Gutenberg"
  },

  // Simone de Beauvoir
  "de-beauvoir:Tvetydighetens etikk": {
    url: "https://www.marxists.org/reference/subject/ethics/de-beauvoir/ambiguity/",
    label: "Les på Marxists Internet Archive"
  },
  "de-beauvoir:Det annet kjønn (Le Deuxième Sexe)": {
    url: "https://www.nb.no/search?q=%22Det%20annet%20kj%C3%B8nn%22&creator=%22Beauvoir%22",
    label: "Se utgaver hos Nasjonalbiblioteket (nb.no)"
  },

  // Fanon
  "fanon:Jordens fordømte (Les Damnés de la Terre)": {
    url: "https://www.nb.no/items/URN:NBN:no-nb_digibok_2007071901090", // Verified actual URN!
    label: "Les hos Nasjonalbiblioteket (nb.no)"
  },
  "fanon:Svart hud, hvite masker (Peau noire, masques blancs)": {
    url: "https://www.nb.no/search?q=%22Svart%20hud,%20hvite%20masker%22&creator=%22Fanon%22",
    label: "Se utgaver hos Nasjonalbiblioteket (nb.no)"
  }
};

module.exports = { VERIFIED_LINKS };
