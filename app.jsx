const { useState, useCallback } = React;

const FROMAGES_AOP = [
  { nom: "Beaufort", lait: "Vache", croute: "Frottée", pate: "Pressée cuite", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Reblochon", lait: "Vache", croute: "Lavée", pate: "Pressée non cuite", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Abondance", lait: "Vache", croute: "Frottée", pate: "Pressée non cuite", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Chevrotin", lait: "Chèvre", croute: "Lavée", pate: "Pressée non cuite", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Saint-Marcellin", lait: "Vache", croute: "Fleurie", pate: "Molle à croûte fleurie", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Bleu du Vercors-Sassenage", lait: "Vache", croute: "Naturelle", pate: "Persillée", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Picodon", lait: "Chèvre", croute: "Naturelle", pate: "Molle", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Rigotte de Condrieu", lait: "Chèvre", croute: "Fleurie", pate: "Molle", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Fourme d'Ambert", lait: "Vache", croute: "Fleurie grise", pate: "Persillée", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Bleu d'Auvergne", lait: "Vache", croute: "Fleurie", pate: "Persillée", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Cantal", lait: "Vache", croute: "Naturelle sèche", pate: "Pressée non cuite", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Salers", lait: "Vache", croute: "Naturelle sèche", pate: "Pressée non cuite", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Saint-Nectaire", lait: "Vache", croute: "Fleurie grise", pate: "Pressée non cuite", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Fourme de Montbrison", lait: "Vache", croute: "Orangée", pate: "Persillée", region: "Auvergne-Rhône-Alpes", emoji: "🏔️" },
  { nom: "Comté", lait: "Vache", croute: "Frottée", pate: "Pressée cuite", region: "Bourgogne-Franche-Comté", emoji: "🌿" },
  { nom: "Morbier", lait: "Vache", croute: "Naturelle", pate: "Pressée non cuite", region: "Bourgogne-Franche-Comté", emoji: "🌿" },
  { nom: "Mont d'Or", lait: "Vache", croute: "Lavée", pate: "Molle", region: "Bourgogne-Franche-Comté", emoji: "🌿" },
  { nom: "Bleu de Gex Haut-Jura", lait: "Vache", croute: "Naturelle", pate: "Persillée", region: "Bourgogne-Franche-Comté", emoji: "🌿" },
  { nom: "Époisses", lait: "Vache", croute: "Lavée (marc de Bourgogne)", pate: "Molle", region: "Bourgogne-Franche-Comté", emoji: "🌿" },
  { nom: "Langres", lait: "Vache", croute: "Lavée", pate: "Molle", region: "Grand Est", emoji: "⚜️" },
  { nom: "Chaource", lait: "Vache", croute: "Fleurie", pate: "Molle à croûte fleurie", region: "Grand Est", emoji: "⚜️" },
  { nom: "Munster", lait: "Vache", croute: "Lavée", pate: "Molle", region: "Grand Est", emoji: "⚜️" },
  { nom: "Brie de Meaux", lait: "Vache", croute: "Fleurie", pate: "Molle à croûte fleurie", region: "Île-de-France", emoji: "🗼" },
  { nom: "Brie de Melun", lait: "Vache", croute: "Fleurie", pate: "Molle à croûte fleurie", region: "Île-de-France", emoji: "🗼" },
  { nom: "Coulommiers", lait: "Vache", croute: "Fleurie", pate: "Molle à croûte fleurie", region: "Île-de-France", emoji: "🗼" },
  { nom: "Camembert de Normandie", lait: "Vache (cru)", croute: "Fleurie", pate: "Molle à croûte fleurie", region: "Normandie", emoji: "🍎" },
  { nom: "Livarot", lait: "Vache", croute: "Lavée", pate: "Molle", region: "Normandie", emoji: "🍎" },
  { nom: "Pont-l'Évêque", lait: "Vache", croute: "Lavée", pate: "Molle", region: "Normandie", emoji: "🍎" },
  { nom: "Neufchâtel", lait: "Vache", croute: "Fleurie", pate: "Molle à croûte fleurie", region: "Normandie", emoji: "🍎" },
  { nom: "Roquefort", lait: "Brebis", croute: "Naturelle (grotte)", pate: "Persillée", region: "Occitanie", emoji: "🌞" },
  { nom: "Pélardon", lait: "Chèvre", croute: "Naturelle", pate: "Molle", region: "Occitanie", emoji: "🌞" },
  { nom: "Rocamadour", lait: "Chèvre", croute: "Naturelle", pate: "Molle", region: "Occitanie", emoji: "🌞" },
  { nom: "Laguiole", lait: "Vache", croute: "Naturelle sèche", pate: "Pressée non cuite", region: "Occitanie", emoji: "🌞" },
  { nom: "Bleu des Causses", lait: "Vache", croute: "Naturelle", pate: "Persillée", region: "Occitanie", emoji: "🌞" },
  { nom: "Ossau-Iraty", lait: "Brebis", croute: "Frottée naturelle", pate: "Pressée non cuite", region: "Nouvelle-Aquitaine", emoji: "🏖️" },
  { nom: "Mothais-sur-Feuille", lait: "Chèvre", croute: "Naturelle", pate: "Molle", region: "Nouvelle-Aquitaine", emoji: "🏖️" },
  { nom: "Chabichou du Poitou", lait: "Chèvre", croute: "Naturelle fleurie", pate: "Molle", region: "Nouvelle-Aquitaine", emoji: "🏖️" },
  { nom: "Pouligny-Saint-Pierre", lait: "Chèvre", croute: "Naturelle fleurie", pate: "Molle", region: "Centre-Val de Loire", emoji: "🏰" },
  { nom: "Valençay", lait: "Chèvre", croute: "Naturelle cendrée", pate: "Molle", region: "Centre-Val de Loire", emoji: "🏰" },
  { nom: "Selles-sur-Cher", lait: "Chèvre", croute: "Naturelle cendrée", pate: "Molle", region: "Centre-Val de Loire", emoji: "🏰" },
  { nom: "Sainte-Maure de Touraine", lait: "Chèvre", croute: "Naturelle cendrée", pate: "Molle", region: "Centre-Val de Loire", emoji: "🏰" },
  { nom: "Crottin de Chavignol", lait: "Chèvre", croute: "Naturelle", pate: "Molle", region: "Centre-Val de Loire", emoji: "🏰" },
  { nom: "Brocciu", lait: "Brebis/Chèvre", croute: "Sans croûte", pate: "Fraîche", region: "Corse", emoji: "🌴" },
];

const LAIT_COLORS = {
  "Vache": { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  "Vache (cru)": { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  "Brebis": { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD" },
  "Chèvre": { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
  "Brebis/Chèvre": { bg: "#FCE7F3", text: "#9D174D", border: "#F9A8D4" },
};

const PATE_ICONS = {
  "Pressée cuite": "🔥",
  "Pressée non cuite": "⚙️",
  "Molle à croûte fleurie": "🌸",
  "Molle": "💧",
  "Persillée": "🟢",
  "Fraîche": "❄️",
};

const REGIONS = ["Toutes", ...Array.from(new Set(FROMAGES_AOP.map(f => f.region))).sort()];
const LAITS = ["Tous", "Vache", "Brebis", "Chèvre", "Brebis/Chèvre"];
const PATES = ["Toutes", ...Array.from(new Set(FROMAGES_AOP.map(f => f.pate))).sort()];

function App() {
  const [view, setView] = useState("catalogue");
  const [selectedFromage, setSelectedFromage] = useState(null);
  const [filterRegion, setFilterRegion] = useState("Toutes");
  const [filterLait, setFilterLait] = useState("Tous");
  const [filterPate, setFilterPate] = useState("Toutes");
  const [search, setSearch] = useState("");

  const [quizFromages, setQuizFromages] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizField, setQuizField] = useState("region");
  const [quizDone, setQuizDone] = useState(false);

  const [aiDetail, setAiDetail] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const filteredFromages = FROMAGES_AOP.filter(f => {
    const matchRegion = filterRegion === "Toutes" || f.region === filterRegion;
    const matchLait = filterLait === "Tous" || f.lait.startsWith(filterLait);
    const matchPate = filterPate === "Toutes" || f.pate === filterPate;
    const matchSearch = f.nom.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchLait && matchPate && matchSearch;
  });

  const generateOptions = useCallback((fromage, field) => {
    const correct = fromage[field];
    const pool = Array.from(new Set(FROMAGES_AOP.map(f => f[field]))).filter(v => v !== correct);
    const wrong = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [...wrong, correct].sort(() => Math.random() - 0.5);
    setQuizOptions(opts);
    setQuizField(field);
  }, []);

  const startQuiz = () => {
    const shuffled = [...FROMAGES_AOP].sort(() => Math.random() - 0.5).slice(0, 15);
    const fields = ["region", "lait", "pate", "croute"];
    const firstField = fields[Math.floor(Math.random() * fields.length)];
    setQuizFromages(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswer(null);
    setQuizDone(false);
    setView("quiz");
    generateOptions(shuffled[0], firstField);
  };

  const handleQuizAnswer = (option) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(option);
    if (option === quizFromages[quizIndex][quizField]) setQuizScore(s => s + 1);
  };

  const nextQuestion = () => {
    const next = quizIndex + 1;
    if (next >= quizFromages.length) { setQuizDone(true); return; }
    const fields = ["region", "lait", "pate", "croute"];
    const newField = fields[Math.floor(Math.random() * fields.length)];
    setQuizIndex(next);
    setQuizAnswer(null);
    generateOptions(quizFromages[next], newField);
  };

  const openDetail = async (fromage) => {
    setSelectedFromage(fromage);
    setAiDetail("");
    setView("detail");
    setAiLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Donne-moi une fiche de révision concise sur le fromage AOP "${fromage.nom}" en français. Structure : 1. Histoire & origine (2-3 phrases) 2. Caractéristiques organoleptiques : goût, odeur, texture (2-3 phrases) 3. Anecdote ou curiosité mémorable (1-2 phrases) 4. Astuce mnémotechnique pour retenir ses caractéristiques. Sois précis et dense. Pas de markdown.`
          }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "Impossible de charger la fiche.";
      setAiDetail(text);
    } catch {
      setAiDetail("Erreur lors du chargement de la fiche.");
    }
    setAiLoading(false);
  };

  const fieldLabels = { region: "la région", lait: "le lait", pate: "la pâte", croute: "la croûte" };

  const s = {
    page: { minHeight: "100vh", background: "#F9F5EE", fontFamily: "'Inter', sans-serif", color: "#2C1A0E" },
    header: { background: "#2C1A0E", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(44,26,14,0.18)" },
    logoWrap: { display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 0" },
    logoTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", color: "#F5DFA0", fontWeight: 700 },
    logoSub: { fontSize: "0.7rem", color: "#C9A96A", letterSpacing: "0.12em", textTransform: "uppercase" },
    nav: { display: "flex", gap: "0.5rem" },
    main: { maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" },
    heroNum: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "3rem", color: "#2C1A0E", lineHeight: 1 },
    heroLabel: { fontSize: "0.8rem", color: "#8B6347", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.2rem" },
    filterBox: { background: "#fff", borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "1.75rem", boxShadow: "0 1px 6px rgba(44,26,14,0.08)", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" },
    filterLabel: { display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#8B6347", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" },
    input: { width: "100%", padding: "0.5rem 0.75rem", border: "1.5px solid #E8D9C0", borderRadius: "6px", fontSize: "0.9rem", background: "#FEFCF8", boxSizing: "border-box", outline: "none", fontFamily: "'Inter', sans-serif" },
    select: { width: "100%", padding: "0.5rem 0.75rem", border: "1.5px solid #E8D9C0", borderRadius: "6px", fontSize: "0.85rem", background: "#FEFCF8", cursor: "pointer", outline: "none", fontFamily: "'Inter', sans-serif" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" },
    card: { background: "#fff", borderRadius: "10px", padding: "1.25rem", boxShadow: "0 1px 4px rgba(44,26,14,0.07)", cursor: "pointer", border: "1.5px solid #EFE4D0", position: "relative", overflow: "hidden", transition: "all 0.2s" },
    cardBar: { position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #C9A96A, #8B6347)" },
    cardTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.05rem", fontWeight: 700, color: "#2C1A0E", lineHeight: 1.3 },
    cardRegion: { fontSize: "0.72rem", color: "#8B6347", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 },
    tags: { display: "flex", flexWrap: "wrap", gap: "0.4rem" },
    tag: (bg, text, border) => ({ background: bg, color: text, border: `1px solid ${border}`, borderRadius: "99px", padding: "0.2rem 0.6rem", fontSize: "0.72rem", fontWeight: 600 }),
  };

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.logoWrap}>
          <span style={{ fontSize: "1.8rem" }}>🧀</span>
          <div>
            <div style={s.logoTitle}>Fromages AOP</div>
            <div style={s.logoSub}>{FROMAGES_AOP.length} appellations · France</div>
          </div>
        </div>
        <nav style={s.nav}>
          {[["catalogue", "📚 Catalogue"], ["quiz", "🎯 Quiz"]].map(([v, label]) => (
            <button key={v} onClick={() => v === "quiz" ? startQuiz() : setView("catalogue")}
              style={{ background: view === v ? "#C9A96A" : "transparent", color: view === v ? "#2C1A0E" : "#F5DFA0", border: "1.5px solid", borderColor: view === v ? "#C9A96A" : "#6B4C2A", borderRadius: "6px", padding: "0.45rem 1rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      {view === "catalogue" && (
        <main style={s.main}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={s.heroNum}>{filteredFromages.length}</div>
            <div style={s.heroLabel}>fromages affichés</div>
          </div>
          <div style={s.filterBox}>
            <div style={{ flex: "1 1 180px" }}>
              <label style={s.filterLabel}>🔍 Recherche</label>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Comté, Brie..." style={s.input} />
            </div>
            {[["🗺️ Région", REGIONS, filterRegion, setFilterRegion], ["🐄 Lait", LAITS, filterLait, setFilterLait], ["🧩 Pâte", PATES, filterPate, setFilterPate]].map(([label, opts, val, setVal]) => (
              <div key={label} style={{ flex: "1 1 150px" }}>
                <label style={s.filterLabel}>{label}</label>
                <select value={val} onChange={e => setVal(e.target.value)} style={s.select}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={s.grid}>
            {filteredFromages.map(fromage => {
              const lc = LAIT_COLORS[fromage.lait] || LAIT_COLORS["Vache"];
              return (
                <div key={fromage.nom} onClick={() => openDetail(fromage)} style={s.card}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(44,26,14,0.13)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(44,26,14,0.07)"; }}>
                  <div style={s.cardBar} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div style={s.cardTitle}>{fromage.nom}</div>
                    <span style={{ fontSize: "1.4rem", marginLeft: "0.5rem" }}>{fromage.emoji}</span>
                  </div>
                  <div style={s.cardRegion}>{fromage.region}</div>
                  <div style={s.tags}>
                    <span style={s.tag(lc.bg, lc.text, lc.border)}>🥛 {fromage.lait}</span>
                    <span style={s.tag("#FEF9EE", "#6B4C2A", "#EFD9A5")}>{PATE_ICONS[fromage.pate] || "🧀"} {fromage.pate}</span>
                    <span style={s.tag("#F3F0EB", "#5C4A35", "#DDD4C5")}>🏷️ {fromage.croute}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredFromages.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", color: "#8B6347" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.2rem" }}>Aucun fromage trouvé</div>
            </div>
          )}
        </main>
      )}

      {view === "quiz" && (
        <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2.5rem 1rem" }}>
          {quizDone ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏆</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Quiz terminé !</div>
              <div style={{ fontSize: "3.5rem", fontWeight: 700, color: "#C9A96A", margin: "1rem 0" }}>{quizScore}<span style={{ fontSize: "1.5rem", color: "#8B6347" }}> / {quizFromages.length}</span></div>
              <div style={{ color: "#8B6347", marginBottom: "2rem" }}>{quizScore >= 12 ? "Excellent ! 🧀" : quizScore >= 8 ? "Bon score, continuez !" : "Plus de révision nécessaire !"}</div>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button onClick={startQuiz} style={{ background: "#C9A96A", color: "#2C1A0E", border: "none", borderRadius: "8px", padding: "0.75rem 1.5rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>🔁 Rejouer</button>
                <button onClick={() => setView("catalogue")} style={{ background: "transparent", color: "#8B6347", border: "2px solid #C9A96A", borderRadius: "8px", padding: "0.75rem 1.5rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>📚 Catalogue</button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#8B6347", fontWeight: 600 }}>Question {quizIndex + 1} / {quizFromages.length}</span>
                <span style={{ fontSize: "0.8rem", color: "#C9A96A", fontWeight: 700 }}>Score : {quizScore}</span>
              </div>
              <div style={{ background: "#EFE4D0", borderRadius: "99px", height: "6px", marginBottom: "2rem" }}>
                <div style={{ background: "#C9A96A", height: "6px", borderRadius: "99px", width: `${(quizIndex / quizFromages.length) * 100}%`, transition: "width 0.4s" }} />
              </div>
              <div style={{ background: "#fff", borderRadius: "14px", padding: "2rem", boxShadow: "0 2px 12px rgba(44,26,14,0.1)", marginBottom: "1.5rem", textAlign: "center", border: "1.5px solid #EFE4D0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{quizFromages[quizIndex]?.emoji}</div>
                <div style={{ fontSize: "0.75rem", color: "#8B6347", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.5rem" }}>Quelle est…</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", color: "#2C1A0E", fontWeight: 700, marginBottom: "0.5rem" }}>{fieldLabels[quizField]}</div>
                <div style={{ fontSize: "0.9rem", color: "#6B4C2A" }}>du <strong>{quizFromages[quizIndex]?.nom}</strong> ?</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {quizOptions.map(opt => {
                  const correct = quizFromages[quizIndex]?.[quizField];
                  const isChosen = quizAnswer === opt;
                  const isCorrect = opt === correct;
                  let bg = "#fff", border = "#EFE4D0", color = "#2C1A0E";
                  if (quizAnswer !== null) {
                    if (isCorrect) { bg = "#D1FAE5"; border = "#6EE7B7"; color = "#065F46"; }
                    else if (isChosen) { bg = "#FEE2E2"; border = "#FCA5A5"; color = "#991B1B"; }
                  }
                  return (
                    <button key={opt} onClick={() => handleQuizAnswer(opt)}
                      style={{ background: bg, border: `2px solid ${border}`, color, borderRadius: "10px", padding: "1rem 1.25rem", fontSize: "0.95rem", fontWeight: 600, cursor: quizAnswer ? "default" : "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Inter', sans-serif" }}>
                      {opt}
                      {quizAnswer !== null && isCorrect && <span>✅</span>}
                      {quizAnswer !== null && isChosen && !isCorrect && <span>❌</span>}
                    </button>
                  );
                })}
              </div>
              {quizAnswer !== null && (
                <button onClick={nextQuestion} style={{ marginTop: "1.5rem", width: "100%", background: "#2C1A0E", color: "#F5DFA0", border: "none", borderRadius: "10px", padding: "1rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                  {quizIndex + 1 < quizFromages.length ? "Question suivante →" : "Voir les résultats 🏆"}
                </button>
              )}
            </>
          )}
        </main>
      )}

      {view === "detail" && selectedFromage && (
        <main style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1rem" }}>
          <button onClick={() => setView("catalogue")} style={{ background: "none", border: "none", color: "#8B6347", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Inter', sans-serif" }}>← Retour</button>
          <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 2px 16px rgba(44,26,14,0.1)", border: "1.5px solid #EFE4D0" }}>
            <div style={{ background: "linear-gradient(135deg, #2C1A0E 0%, #5C3A1E 100%)", padding: "2rem", color: "#F5DFA0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{selectedFromage.nom}</div>
                <div style={{ fontSize: "0.8rem", color: "#C9A96A", letterSpacing: "0.1em", textTransform: "uppercase" }}>{selectedFromage.region}</div>
              </div>
              <span style={{ fontSize: "3.5rem" }}>{selectedFromage.emoji}</span>
            </div>
            <div style={{ padding: "1.75rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                {[["🥛 Lait", selectedFromage.lait], ["🧀 Pâte", selectedFromage.pate], ["🏷️ Croûte", selectedFromage.croute], ["📍 Région", selectedFromage.region]].map(([label, val]) => (
                  <div key={label} style={{ background: "#FAF6F0", borderRadius: "8px", padding: "0.9rem", border: "1px solid #EFE4D0" }}>
                    <div style={{ fontSize: "0.7rem", color: "#8B6347", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{label}</div>
                    <div style={{ fontWeight: 700, color: "#2C1A0E", fontSize: "0.95rem" }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #EFE4D0", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                  <span>✨</span>
                  <span style={{ fontWeight: 700, color: "#2C1A0E", fontSize: "0.9rem" }}>Fiche de révision — IA</span>
                </div>
                {aiLoading
                  ? <div style={{ textAlign: "center", padding: "2rem", color: "#8B6347" }}><div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🧀</div>Génération en cours…</div>
                  : <div style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#3D2810", whiteSpace: "pre-wrap" }}>{aiDetail}</div>
                }
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
